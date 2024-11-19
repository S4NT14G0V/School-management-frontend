import { useNavigate } from "react-router-dom";
import { validateAdmin, validateUser } from "@services/userService";
import { useEffect, useState } from "react";
import { ROLES } from "@config/constants";
import "./ProtectedRoute.css";

export default function ProtectedRoute({ children, role }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isAuthorized, setIsAuthorized] = useState(false); // Estado de autorización

  useEffect(() => {
    const fetchValidate = async () => {
      try {
        const validationUser = await validateUser(); // Verifica si el usuario está autenticado
        const validationAdmin = await validateAdmin(); // Verifica si el usuario es administrador

        // Si es un usuario normal y el rol solicitado no es Admin
        if (validationUser && role !== ROLES.Admin) {
          setIsAuthorized(true);
        }

        // Si es un administrador y el rol solicitado es Admin
        if (validationAdmin && role === ROLES.Admin) {
          setIsAuthorized(true);
        }

        if (validationUser && role === ROLES.Admin && !validationAdmin) {
          navigate("/classes"); // Redirige al home si no es admin
        }

        // Si no hay validación o no coinciden los roles, redirige al home
        if (!validationUser && !validationAdmin) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data: " + error.message);
        navigate("/"); // Redirige en caso de error
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    fetchValidate();
  }, [role, navigate]); // Dependencias de efecto

  // Mientras se está validando el usuario, muestra un loader o algo similar
  if (isLoading) {
    return (
      <div className="loadingStyles">
        <div className="loadingContentStyles">
          <span className="magicTextStyles">
            Loading...
          </span>
          <p style={{ fontSize: "0.8em" }}>
            Please wait while we load your data.
          </p>

          <p
            style={{
              fontSize: "0.5em",
              width: "100%",
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            If you think this is an error,{" "}
            <span style={{ color: "#ffbb00" }}>contact the Administrator.</span>
          </p>
        </div>
      </div>
    );
  }

  // Si el usuario está autorizado, muestra los componentes hijos
  if (isAuthorized) {
    return children;
  }

  // En caso contrario, redirige a la página principal
  return null;
}
