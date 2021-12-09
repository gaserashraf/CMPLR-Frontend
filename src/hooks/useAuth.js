import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext/UserContext';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const user = useContext(UserContext).user;
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);
};

export default useAuth;