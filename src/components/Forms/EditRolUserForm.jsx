import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, notification as notification2 } from "antd";
import { getRoles } from "@services/rolService"; // Tu servicio para obtener roles
import { editRolByEmail } from "@services/userService"; // Servicio para editar rol
import { MESSAGES_ERROR } from "@config/constants";

const EditRolUserForm = ({ email, closeModal, notification, role }) => {
  const [roleOptions, setRoleOptions] = useState([]); // Lista de roles
  const [formData, setFormData] = useState({ rol: role || "" }); // Formulario para manejar los datos
  const [emailReceived, setEmailReceived] = useState(email); // Email recibido

  useEffect(() => {
    if (emailReceived) {
      const fetchRoles = async () => {
        try {
          const roles = await getRoles();
          const roleOptions = roles.map((role) => ({
            value: role.name, // El valor será el nombre del rol
            label: role.name,
          }));
          setRoleOptions(roleOptions);
        } catch (error) {
          console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
        }
      };
      fetchRoles();
    }
  }, [emailReceived]);

  useEffect(() => {
    setEmailReceived(email);
  }, [email]);

  // Actualiza el rol inicial cuando cambian las props
  useEffect(() => {
    setFormData({ rol: role || "" }); // Actualiza el estado con el nuevo rol
  }, [role]); // Escucha cambios en 'role'

  const handleChange = (e) => {
    setFormData({ ...formData, rol: e.target.value });
  };

  const handleEdit = async (email, rol) => {
    if (formData.rol === role) {
      notification2.warning({
        message: "Warning",
        description: "There are no changes to save",
        placement: "bottom",
        style: { backgroundColor: "#fff7dd" },
        pauseOnHover: false,
      });
      return;
    }
    try {
      closeModal(); // Cierra el modal
      const result = await editRolByEmail(email, rol);
      if (result) {
        notification(true); // Notificación de éxito
      } else {
        console.log(result);
        notification2.error({
          message: MESSAGES_ERROR.TITLE,
          description: MESSAGES_ERROR.USER_ROLE_UPDATED,
          placement: "bottom",
          showProgress: true,
          style: { backgroundColor: "#ffd9d9" },
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.USER_ROLE_UPDATED, error);
    }
  };

  return (
    <div>
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button key="back" onClick={closeModal} style={{ marginRight: "10px" }}>
          Cancelar
        </Button>
        <Button
          key="submit"
          style={{ backgroundColor: "#11538C", color: "white" }}
          onClick={() => handleEdit(emailReceived, formData.rol)}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};

export default React.memo(EditRolUserForm);
