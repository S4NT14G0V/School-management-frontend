import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getRoles } from "../../services/rolService"; // Tu servicio para obtener roles
import { editRolByEmail } from "../../services/userService"; // Servicio para editar rol
import { Button, notification as notification2 } from "antd";
import { MESSAGES_ERROR } from "../../config/constants";

const EditRolUserForm = ({ email, closeModal, notification }) => {
  const [roleOptions, setRoleOptions] = useState([]); // Lista de roles
  const [formData, setFormData] = useState({ rol: "" }); // Formulario para manejar los datos
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

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, rol: e.target.value });
    },
    [formData]
  );

  const handleEdit = useCallback(async (email, rol) => {
    try {
      closeModal( ); // Cierra el modal
      const result = await editRolByEmail(email, rol);
      if (result){
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
  }, [closeModal, notification]);

  const roleOptionsMemo = useMemo(() => {
    return roleOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }, [roleOptions]);

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
          {roleOptionsMemo}
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
          style={{ backgroundColor: "#2f1b41", color: "white" }}
          onClick={()=>handleEdit(emailReceived, formData.rol)}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};

export default React.memo(EditRolUserForm);
