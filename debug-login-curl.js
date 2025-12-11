
const axios = require('axios');

async function testLogin() {
    console.log('Attempting to contact local Login API...');
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email: 'admin@lumina.com',
            password: 'wrong-password-just-testing-connection'
        });
        console.log('Status:', response.status);
        console.log('Data:', response.data);
    } catch (error) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
        } else {
            console.error('Network Error:', error.message);
        }
    }
}

testLogin();
