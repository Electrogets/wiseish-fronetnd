// axiosInterceptor.js
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../Store/LoginLogout/LoginLogoutAction'; // Replace with the actual path
import { actionCreators } from '../Store/LoginLogout/LoginLogoutAction';

const useAxiosInterceptor = () => {
    const dispatch = useDispatch();

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // Dispatch a logout action to reset the user state
                dispatch(actionCreators.setLogoutUser());

                // Redirect to the login page or show a notification
                // You can use a state management library (like Redux) to manage the login state
                // or use local state to show a notification

                // Example using local state
                // setSessionExpired(true);

                // Example redirecting to login page
                // history.push('/login');

                // Example showing a notification (you can use your preferred notification library)
                // notify('Session expired. Please login again.');

                // You can choose the approach that fits your application's structure
            }
            return Promise.reject(error);
        }
    );
};

export default useAxiosInterceptor;
