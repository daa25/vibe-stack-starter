require('dotenv').config();
const express = require('express');
const path = require('path');
const { Client, Environment } = require('square');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const squareClient = new Client({
  environment: process.env.SQUARE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN
});

app.post('/process-payment', async (req, res) => {
  const { sourceId, locationId, idempotencyKey } = req.body;
  try {
    const result = await squareClient.paymentsApi.createPayment({
      sourceId,
      locationId,
      idempotencyKey
    });
    res.json({ payment: result.result.payment });
  } catch (error) {
    res.json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(\Server running on port \\));
