import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd"; // Asegúrate de que tienes Ant Design instalado
import { getRoles } from "../../services/rolService"; // Tu servicio para obtener roles
import { useUser } from "../../context/userContext"; // Importa el contexto de usuario
import { editRolByEmail } from "../../services/userService";

export default function RoleModal({ email, isModalOpen, closeModal }) {
  const { authToken } = useUser(); // Obtén el token de autenticación del contexto
  const [roleOptions, setRoleOptions] = useState([]); // Lista de roles
  const [formData, setFormData] = useState({ rol: "" }); // Formulario para manejar los datos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      const fetchRoles = async () => {
        try {
          setLoading(true);
          const roles = await getRoles();
          const roleOptions = roles.map((role) => ({
            value: role.name, // El valor será el nombre del rol
            label: role.name,
          }));
          setRoleOptions(roleOptions);
        } catch (error) {
          setError("Error fetching roles.");
        } finally {
          setLoading(false);
        }
      };
      fetchRoles();
    }
  }, [isModalOpen]);

  // Manejar los cambios en el select
  const handleChange = (e) => {
    setFormData({ ...formData, rol: e.target.value });
  };

  // Enviar los cambios al backend
  const handleEdit = async () => {
    try {
      console.log("Rol:", formData.rol);
      console.log("email:", formData.rol);
      console.log("authToken:", formData.rol);
      editRolByEmail(authToken, email, formData.rol); // Ejemplo de servicio

      closeModal(); // Cerrar el modal después de actualizar
    } catch (error) {
      console.error("Error actualizando el rol", error);
    }
  };

  return (
    <div>
      <Modal
        title="Editar Rol"
        centered
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <div className="form-group">
          <label>Rol</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccione...
            </option>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {loading && <p>Cargando roles...</p>}
        {error && <p>{error}</p>}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            key="back"
            onClick={closeModal}
            style={{ marginRight: "10px" }}
          >
            Cancelar
          </Button>
          <Button key="submit" type="primary" onClick={handleEdit}>
            Guardar Cambios
          </Button>
        </div>
      </Modal>
    </div>
  );
}
