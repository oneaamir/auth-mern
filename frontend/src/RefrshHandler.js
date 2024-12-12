import  { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      if (['/', '/login','/Login', '/signup'].includes(location.pathname)) {
        navigate('/home', { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null; // No UI needed if it's purely a logic handler
}

export default RefreshHandler;

// Sure! Here's a simpler explanation:

// When you use navigate('/home', { replace: true }), 
// it replaces the current page in the browser's history with /home. This means:
// The user cannot go back to the previous page (like /login or /signup) by clicking the Back button.
// It’s like saying, "Forget this page ever existed, just go to /home."
// ...............
//................
//............

// If you don’t use { replace: true }, the previous page stays in the history, and the user can go back to it using the Back button.

// The { replace: true } option in the navigate function from React Router determines how the navigation affects the browser's history stack.

// What is the History Stack?
// The browser maintains a history stack of all the navigated pages. When you navigate to a new page, by default, React Router pushes the new location to the history stack. This allows the user to go back to the previous page using the browser's Back button.

// What Does replace: true Do?
// By setting { replace: true }, the navigate function replaces the current entry in the history stack instead of adding a new entry. This means:

// The new navigation overwrites the current location in the stack.
// The user cannot go "back" to the previous page using the browser's Back button because the current page has been replaced.
