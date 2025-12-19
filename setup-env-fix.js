const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const content = `NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAACHVrp2ewiAQNcpl
TURNSTILE_SECRET_KEY=0x4AAAAAACHVrkGff6ozCmJ_qp4kqMwrS5U
RESEND_API_KEY=re_iszndcoK_2MvbWUEVEhfwPi3fHbW1Tp5d
ADMIN_EMAIL=kit.shukla88@gmail.com
CONTACT_EMAIL=onboarding@resend.dev`;

try {
  fs.writeFileSync(envPath, content, 'utf8');
  console.log('.env.local has been written successfully with onboarding email.');
} catch (err) {
  console.error('Error writing .env.local:', err);
}
