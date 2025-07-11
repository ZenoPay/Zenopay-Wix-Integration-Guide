export async function post_webhook(request) {
    if (request.headers['x-api-key'] !== 'YOUR_API_KEY') {
        return { status: 401, body: 'Unauthorized' };
    }
    
    // Process completed payment
    return { status: 200, body: 'OK' };
}