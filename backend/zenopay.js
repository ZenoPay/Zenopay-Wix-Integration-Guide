import { initiatePayment } from 'backend/zenopay';

$w('#payButton').onClick(async () => {
    const orderId = generateUUID();
    try {
        const result = await initiatePayment(
            orderId,
            $w('#emailInput').value,
            $w('#nameInput').value,
            $w('#phoneInput').value,
            parseInt($w('#amountInput').value)
        );
        // Handle response
    } catch (error) {
        // Handle error
    }
});