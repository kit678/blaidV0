
const BASE_URL = 'http://localhost:3002'; // Make sure your app is running

async function testSpamProtection() {
    console.log('Testing Spam Protection...');

    const endpoints = ['/api/send-email', '/api/research-contact'];

    for (const endpoint of endpoints) {
        console.log(`\n--- Testing ${endpoint} ---`);
        const url = `${BASE_URL}${endpoint}`;

        // 1. Test Honeypot
        console.log('1. Honeypot Test: Sending request with website_url field...');
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Bot',
                    email: 'bot@example.com',
                    message: 'Spam',
                    website_url: 'http://spam.com', // Honeypot filled
                    cf_turnstile_response: 'dummy_token'
                })
            });
            const data = await res.json();
            if (data.id === 'honeypot') {
                console.log('✅ Honeypot Caught: Request silently rejected (success).');
            } else {
                console.log('❌ Honeypot Failed: Response:', data);
            }
        } catch (e) {
            console.error('Error testing honeypot:', e);
        }

        // 2. Test Invalid Phone
        console.log('2. Phone Validation Test: Sending phone with letters...');
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Valid Name',
                    email: 'valid@example.com',
                    message: 'Hello',
                    phone: '123abc456', // Invalid phone
                    cf_turnstile_response: 'dummy_token'
                })
            });

            if (res.status === 400) {
                const data = await res.json();
                if (data.error && (data.error.includes('phone') || data.message === 'Invalid phone number')) {
                    console.log('✅ Phone Validation Caught: Request rejected (success).');
                } else {
                    console.log('❌ Phone Validation Failed (Wrong Error?):', data);
                }
            } else {
                const data = await res.json();
                console.log(`❌ Phone Validation Failed: Status ${res.status}`, data);
            }
        } catch (e) {
            console.error('Error testing phone validation:', e);
        }

        // 3. Test Missing Captcha
        console.log('3. Captcha Check Test: Sending request without captcha token...');
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Valid Name',
                    email: 'valid@example.com',
                    message: 'Hello',
                    phone: '1234567890'
                })
            });

            if (res.status === 400 || res.status === 500) { // 500 if server misconfig (missing secret key in env)
                const data = await res.json();
                if (data.error && (data.error.includes('Security') || data.message === 'Security check required')) {
                    console.log('✅ Captcha Check Caught: Request rejected (success).');
                } else {
                    console.log('❌ Captcha Check Failed (Wrong Error?):', data);
                }
            } else {
                const data = await res.json();
                console.log(`❌ Captcha Check Failed: Status ${res.status}`, data);
            }
        } catch (e) {
            console.error('Error testing captcha:', e);
        }
    }
}

testSpamProtection();
