import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN,
  },
});

// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const statusCode = error.response.status;
//     }
//   }
// );

export default httpClient;
