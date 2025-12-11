
const axios = require('axios');

async function testGetPhotos() {
    console.log('Attempting to fetch photos API...');
    try {
        const response = await axios.get('http://localhost:3000/api/photos');
        console.log('Status:', response.status);
        console.log('Photos Count:', response.data.length);
        if (response.data.length > 0) {
            console.log('First Photo:', response.data[0].title);
        }
    } catch (error) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
        } else {
            console.error('Network Error:', error.message);
        }
    }
}

testGetPhotos();
