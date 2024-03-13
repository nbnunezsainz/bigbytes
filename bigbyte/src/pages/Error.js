import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ErrorPage = () => {
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRedirect(true);
    }, 5000); // Timeout after 5 seconds

    return () => clearTimeout(timeout); // Clean up the timeout on unmount

  }, []);

  useEffect(() => {
    if (redirect) {
      history.push('/Home'); // Redirect to the home page
    }
  }, [redirect, history]);

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>Redirecting back to the home page...</p>
    </div>
  );
};

export default ErrorPage;