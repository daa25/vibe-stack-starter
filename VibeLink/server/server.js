const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5102;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure leads.csv exists
const leadsPath = path.join(__dirname, 'leads.csv');
const csvWriter = createCsvWriter({
  path: leadsPath,
  header: [
    { id: 'timestamp', title: 'Timestamp' },
    { id: 'name', title: 'Name' },
    { id: 'phone', title: 'Phone' },
    { id: 'zip', title: 'ZIP' },
    { id: 'project', title: 'Project' },
    { id: 'details', title: 'Details' }
  ],
  append: fs.existsSync(leadsPath)
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'VibeLink API' });
});

// Lead submission endpoint
app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, zip, project, details } = req.body;

    // Validate required fields
    if (!name || !phone || !zip || !project) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, phone, zip, project' 
      });
    }

    const lead = {
      timestamp: new Date().toISOString(),
      name,
      phone,
      zip,
      project,
      details: details || ''
    };

    // Append to CSV
    await csvWriter.writeRecords([lead]);
    console.log('Lead saved:', lead);

    // Send to webhook if configured
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const fetch = (await import('node-fetch')).default;
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead)
        });
        console.log('Webhook sent:', webhookResponse.status);
      } catch (webhookError) {
        console.error('Webhook failed:', webhookError.message);
        // Don't fail the request if webhook fails
      }
    }

    res.json({ 
      success: true, 
      message: 'Lead captured successfully',
      lead: { ...lead, details: details ? '(provided)' : '(none)' }
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    res.status(500).json({ 
      error: 'Failed to process lead',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ VibeLink API running on http://localhost:${PORT}`);
  console.log(`📋 Leads file: ${leadsPath}`);
  console.log(`🔗 Webhook: ${process.env.WEBHOOK_URL || 'Not configured'}`);
});
