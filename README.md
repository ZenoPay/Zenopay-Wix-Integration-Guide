# Zenopay Mobile Money Tanzania - Wix Integration

![Zenopay Logo](https://zenopay.net/assets/logo.png) ![Wix Logo](https://www.wix.com/favicon.ico)

A step-by-step guide to integrating Zenopay's Mobile Money Tanzania API with Wix for processing secure mobile payments (M-Pesa, Airtel Money, Tigo Pesa).

## Table of Contents
- [Prerequisites](#prerequisites)
- [API Overview](#api-overview)
- [Integration Steps](#integration-steps)
  - [Backend Setup](#backend-setup)
  - [Frontend Integration](#frontend-integration)
  - [Webhook Setup](#webhook-setup)
- [Testing & Deployment](#testing--deployment)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

## Prerequisites
- ✅ Zenopay Merchant Account (with API access)
- ✅ Wix Premium Plan (for Velo/Corvid)
- ✅ Tanzanian Mobile Money account for testing
- ✅ Zenopay API Key

## API Overview

| Feature           | Details                                  |
|-------------------|-----------------------------------------|
| Endpoint          | `POST https://zenoapi.com/api/payments/mobile_money_tanzania` |
| Authentication    | `x-api-key: YOUR_API_KEY`               |
| Currency          | TZS (Tanzanian Shillings)               |
| Webhook Support   | Yes                                     |

## Integration Steps

### Backend Setup

1. Enable Wix Dev Mode
2. Create a new web module `zenopay.jsw`:

```javascript
import { fetch } from 'wix-fetch';

const ZENOPAY_API_URL = 'https://zenoapi.com/api/payments/mobile_money_tanzania';
const API_KEY = 'YOUR_API_KEY'; // Replace with your key

export async function initiatePayment(orderId, email, name, phone, amount, webhookUrl = null) {
    const payload = {
        order_id: orderId,
        buyer_email: email,
        buyer_name: name,
        buyer_phone: phone,
        amount: amount,
        ...(webhookUrl && { webhook_url: webhookUrl })
    };

    const response = await fetch(ZENOPAY_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
}
```

### Frontend Integration

1. Create a payment form with inputs for:
   - Email (#emailInput)
   - Name (#nameInput)
   - Phone (#phoneInput)
   - Amount (#amountInput)

2. Add payment handler:

```javascript
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
```

### Webhook Setup

Create a webhook endpoint in `http-functions.js`:

```javascript
export async function post_webhook(request) {
    if (request.headers['x-api-key'] !== 'YOUR_API_KEY') {
        return { status: 401, body: 'Unauthorized' };
    }
    
    // Process completed payment
    return { status: 200, body: 'OK' };
}
```

## Testing & Deployment

**Sandbox Testing:**
- Use test number: `0744963858`
- Test amount: `100 TZS`

**Production:**
1. Replace API keys
2. Verify webhook URL is HTTPS
3. Test with real transactions

## Troubleshooting

| Issue                | Solution                          |
|----------------------|-----------------------------------|
| 403 Invalid API Key  | Verify API key in headers         |
| 400 Bad Request      | Check phone/amount format         |
| Webhook not firing   | Ensure endpoint returns 200 OK    |

## Support

- Zenopay: [support@zenoapi.com](mailto:support@zenoapi.com)
- Wix Velo: [Documentation](https://www.wix.com/velo)

```

Key improvements:
1. Added proper Markdown formatting for better readability
2. Included table of contents for easy navigation
3. Added logo placeholders (replace with actual logos if available)
4. Organized code blocks with proper syntax highlighting
5. Simplified troubleshooting table
6. Made the structure more scannable with clear section headers
7. Maintained all technical details while improving presentation

To use this:
1. Copy the entire content
2. Save as `README.md` in your project
3. Replace placeholder values with your actual information
4. Add any additional sections as needed