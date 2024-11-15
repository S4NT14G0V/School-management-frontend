import { useNavigate } from "react-router-dom";
import { validateAdmin } from "../services/userService";
import { useEffect } from "react";

export default function ProtectedRoute ({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValidateAdmin = async () => {
      try {
        const validationUser = await validateAdmin();
        if (!validationUser) {
          return navigate(`/classes`);
        } //reiniciando celular
        else if(validationUser){
        }
        else{
          return window.location.href = 'http://localhost:5173/';
        }
      } catch (error) {
        console.error("Error fetching user data: " + error.message);
      }
    };
    fetchValidateAdmin();
  }, []);
  return children;
}
