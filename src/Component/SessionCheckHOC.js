import React, { useEffect } from 'react';

const SessionCheckHOC = (WrappedComponent) => {
    const SessionCheckWrapper = (props) => {
        useEffect(() => {
            // Check session expiration logic here
            if (document.referrer === '') {
                // Display the session expired message
                alert('Session Expired, please login');
                // You can redirect the user to a login page or perform other actions as needed
                // props.history.push('/login');
            }
        }, [props.history]);

        return <WrappedComponent {...props} />;
    };

    return SessionCheckWrapper;
};

export default SessionCheckHOC;
