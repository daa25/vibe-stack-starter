const appId = "REPLACE_WITH_YOUR_SQUARE_APP_ID";
const locationId = "REPLACE_WITH_YOUR_LOCATION_ID";

async function initializeCard(payments) {
    const card = await payments.card();
    await card.attach('#card-container');
    return card;
}

async function createPayment(token) {
    const body = {
        locationId,
        sourceId: token,
        idempotencyKey: crypto.randomUUID()
    };

    const resp = await fetch('/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return resp.json();
}

document.addEventListener('DOMContentLoaded', async () => {
    const payments = window.Square.payments(appId, locationId);
    const card = await initializeCard(payments);
    document.getElementById('card-button').addEventListener('click', async () => {
        const result = await card.tokenize();
        if (result.status === 'OK') {
            const paymentResult = await createPayment(result.token);
            document.getElementById('payment-status-container').innerText =
                paymentResult.error ? paymentResult.error : Success! ;
        }
    });
});
