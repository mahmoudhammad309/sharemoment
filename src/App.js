import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Home />,
  },
]);
function App() {
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY_TOKEN}`}
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
