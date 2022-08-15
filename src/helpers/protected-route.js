import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { BrowserRouter, useNavigate  } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import Dashboard from '../pages/dashboard';

export default function ProtectedRoute({ user }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            console.log('Dashboard-jogando para Dashboard')
            return (<Dashboard />)
        }
        if(!user) {
            console.log('Dashboard-jogando para login')
            return navigate(ROUTES.LOGIN);
        }
    }, [])
    
    return null;
}

ProtectedRoute.propTypes = {
    user: PropTypes.object,
}