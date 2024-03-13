// Add this new custom hook in a separate file, e.g., hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('storeAdminToken');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return { isLoggedIn };
};

export default useAuth;
