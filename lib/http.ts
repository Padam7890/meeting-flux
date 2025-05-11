import axios from "axios";
import Cookies from 'js-cookie'; 

const http = axios.create({
    baseURL:"",
    headers:{
        Authorization:"Bearer "
    }
})

http.interceptors.request.use(
    (config) => {
        // Add any custom logic before sending the request
        // Add a token to the headers if available
        const token = Cookies.get('accessToken'); // Get the token from cookies
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await http.post('/refresh-token', {
                    // Include any necessary data for refreshing the token
                });

                const { accessToken } = response.data; // Assuming the new token is returned in this format
                Cookies.set('accessToken', accessToken); // Store the new token in cookies

                // Update the Authorization header and retry the original request
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return http(originalRequest);
            } catch (refreshError) {
                // Handle refresh token error (e.g., redirect to login)
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
