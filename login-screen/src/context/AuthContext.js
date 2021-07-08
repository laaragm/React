import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export function AuthContextProvider(props) {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => { 
        const storedUserLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedIn == '1') {
            setIsLoggedIn(true);
        }
    }, []);

    function logoutHandler() {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    function loginHandler() {
        // We should of course check email and password but it's just a dummy demo
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return(
        <AuthContext.Provider value={ 
            {
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            } 
        }>
            { props.children }
        </AuthContext.Provider>
    );
}