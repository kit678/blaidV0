
const BASE_URL = 'http://localhost:3000';

async function testEmailFunctionality() {
    console.log('Testing Email Functionality...');

    // 1. Test Research Contact Form
    console.log('\n--- Testing Research Contact Form ---');
    try {
        const res = await fetch(`${BASE_URL}/api/research-contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                message: 'This is a test message from the email functionality test script.',
                contactType: 'academic',
                academicInquiry: 'General',
                cf_turnstile_response: 'test-token'
            })
        });

        const data = await res.json();
        if (res.ok) {
            console.log('✅ Research Contact Form Email Sent Successfully:', data);
        } else {
            console.error('❌ Research Contact Form Failed:', res.status, data);
        }
    } catch (e) {
        console.error('Error testing research contact form:', e);
    }

    // 2. Test General Contact Form
    console.log('\n--- Testing General Contact Form ---');
    try {
        const res = await fetch(`${BASE_URL}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test General User',
                email: 'test_general@example.com',
                message: 'This is a test message for the general contact form.',
                intent: 'general',
                cf_turnstile_response: 'test-token'
            })
        });

        const data = await res.json();
        if (res.ok) {
            console.log('✅ General Contact Form Email Sent Successfully:', data);
        } else {
            console.error('❌ General Contact Form Failed:', res.status, data);
        }
    } catch (e) {
        console.error('Error testing general contact form:', e);
    }
}

testEmailFunctionality();
