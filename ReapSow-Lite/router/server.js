const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5201;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ReapSow-Lite API' });
});

// Margin simulation endpoint
app.post('/api/simulate', (req, res) => {
  try {
    const { orderAmount, supplierCost, email } = req.body;

    // Validate inputs
    if (!orderAmount || !supplierCost) {
      return res.status(400).json({ 
        error: 'Missing required fields: orderAmount, supplierCost' 
      });
    }

    const order = parseFloat(orderAmount);
    const cost = parseFloat(supplierCost);

    if (isNaN(order) || isNaN(cost) || order <= 0 || cost <= 0) {
      return res.status(400).json({ 
        error: 'Invalid amounts: must be positive numbers' 
      });
    }

    if (cost >= order) {
      return res.status(400).json({ 
        error: 'Supplier cost must be less than order amount' 
      });
    }

    // Calculate metrics
    const profit = order - cost;
    const margin = (profit / order) * 100;
    const holdDays = Math.ceil(cost / 100); // Simple formula

    const result = {
      orderAmount: order,
      supplierCost: cost,
      profit: Math.round(profit * 100) / 100,
      margin: Math.round(margin * 100) / 100,
      holdDays,
      timestamp: new Date().toISOString()
    };

    console.log('Simulation:', result);

    res.json({ 
      success: true,
      result 
    });

  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({ 
      error: 'Simulation failed',
      details: error.message 
    });
  }
});

// Listing optimization endpoint (stub for future LLM integration)
app.post('/api/optimize-listing', (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Simple rule-based optimization (TODO: integrate LLM)
    const optimizedTitle = title
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const suggestions = [
      'Add specific keywords for SEO',
      'Include brand name if applicable',
      'Highlight unique selling points',
      'Use power words (premium, exclusive, limited)'
    ];

    res.json({
      success: true,
      original: { title, description, price },
      optimized: {
        title: optimizedTitle,
        description: description || 'TODO: Generate with LLM',
        price: price || 'Market research recommended'
      },
      suggestions,
      note: 'Advanced optimization with LLM coming soon'
    });

  } catch (error) {
    console.error('Optimization error:', error);
    res.status(500).json({ 
      error: 'Optimization failed',
      details: error.message 
    });
  }
});

// Stripe Connect test mode endpoint (optional)
app.post('/api/stripe-connect-test', (req, res) => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!stripeSecretKey) {
    return res.json({
      success: false,
      message: 'Stripe not configured. Add STRIPE_SECRET_KEY to .env to enable.',
      mode: 'disabled'
    });
  }

  // TODO: Implement actual Stripe Connect integration
  res.json({
    success: true,
    message: 'Stripe Connect test mode',
    mode: 'test',
    note: 'Full implementation coming soon'
  });
});

app.listen(PORT, () => {
  console.log(`✅ ReapSow-Lite API running on http://localhost:${PORT}`);
  console.log(`💳 Stripe: ${process.env.STRIPE_SECRET_KEY ? 'Configured' : 'Not configured'}`);
});
