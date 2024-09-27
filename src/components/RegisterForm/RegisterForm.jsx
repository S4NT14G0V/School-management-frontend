import React, { useState, useEffect } from "react";
import "./RegisterForm.css";
import { apiUrls } from "../../routes/ApiUrls";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthday: "",
    gender: "",
    lastname: "",
    address: "",
    phone: "",
    document_type: "",
    document_number: "",
    rol: null, // Inicialmente null
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || "",
        email: user.email || "",
        lastname: user.lastname || "",
      }));
    }
  }, []);

  const typeDocumentOptions = [
    { value: "CC", label: "Cédula de Ciudadanía" },
    { value: "TI", label: "Tarjeta de Identidad" },
    { value: "PP", label: "Pasaporte" },
  ];

  const genderOptions = [
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
    { value: "Otros", label: "Otros" },
  ];

  const roleOptions = [
    { value: { id: 1, name: "Student" }, label: "Estudiante" },
    { value: { id: 2, name: "Parent" }, label: "Padre / Acudiente" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    const selectedRole = JSON.parse(e.target.value); // Parsea la cadena a objeto
    setFormData({
      ...formData,
      rol: selectedRole, // Almacena el objeto real
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);

    try {
      const response = await fetch(apiUrls.user.create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      const result = await response.json();
      console.log("Usuario registrado con éxito:", result);
      alert("Usuario registrado con éxito");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            placeholder="Dirección"
            required
          />
        </div>

        <div className="form-group">
          <label>Género</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccione...
            </option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Dirección"
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de Documento</label>
          <select
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccione...
            </option>
            {typeDocumentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Número de Documento</label>
          <input
            type="text"
            name="document_number"
            value={formData.document_number}
            onChange={handleChange}
            placeholder="Número de Documento"
            required
          />
        </div>

        <div className="form-group">
          <label>Rol</label>
          <select
            name="rol"
            value={formData.rol ? JSON.stringify(formData.rol) : ""} // Evita error si formData.rol es null
            onChange={handleRoleChange}
            required
          >
            <option value="" disabled>
              Seleccione...
            </option>
            {roleOptions.map((option) => (
              <option
                key={option.value.id_role}
                value={JSON.stringify(option.value)}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
