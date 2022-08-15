import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { BrowserRouter as Route, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import Login from '../pages/login';

export default function isUserLoggedIn({ user }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            console.log('Login-jogando para Dashboard')
            return navigate(ROUTES.DASHBOARD)
        }
        if(!user) {
            console.log('Login-jogando para login')
            return (<Login />)
        }
    }, [])


    return null;
}

isUserLoggedIn.propTypes = {
    user: PropTypes.object,
}