import { useUser } from '../context/userContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useUser();



  if (!user) {
    return <Navigate to="/" />;  // Redirige al login si el usuario no está logueado
  }

  return children;
}

export default ProtectedRoute;
