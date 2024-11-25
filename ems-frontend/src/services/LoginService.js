import axios from 'axios';

// const handleLogin = async (username, password) => {
//   try {
//     const response = await axios.post('http://localhost:8080/api/auth/login', {
//       username,
//       password
//     }, {
//       withCredentials: true, // This ensures cookies are sent with the request
//     });

//     console.log('Login successful', response);
//     // At this point, your session is authenticated, and the JSESSIONID cookie will be stored in the browser.
//   } catch (error) {
//     console.error('Login failed:', error);
//   }
// };
const handleLogin = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username,
      password
    }, {
      withCredentials: true, // Ensure credentials are included in the request
    });

    console.log('Login successful', response);
    return response; // Return response for further use in the frontend
  } catch (error) {
    if (error.response) {
      // Server responded with a status code different from 2xx
      console.error('Login failed:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened while setting up the request
      console.error('Error', error.message);
    }
  }
};

