import React, { useState, useEffect, useCallback } from "react";
import { Select, Button, Input, notification as notification2 } from "antd";
import { sendCustomMessage } from "@services/userService";
import { MESSAGES_ERROR } from "@config/constants";

export default function SendMessageForm({ notification, closeModal, userData }) {
    const [usersOptions, setUsersOptions] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        title: "",
        message: "",
    });

    useEffect(() => {
        fetchOptions();
    }, [userData]);

    const fetchOptions = useCallback(async () => {
        try {
            setUsersOptions(userData);
        } catch (error) {
            console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
        }
    }, [userData]);

    const handleUserChange = useCallback(
        (value) => {
            setFormData((prevData) => ({
                ...prevData,
                email: value,
            }));
        },
        []
    );

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            closeModal();
            const result = await sendCustomMessage(formData.email, formData.title, formData.message);
            if (result) {
                notification(true);
            } else {
                notification2.error({
                    message: MESSAGES_ERROR.TITLE,
                    description: MESSAGES_ERROR.MESSAGE_SENT,
                    placement: "bottom",
                    showProgress: true,
                    style: { backgroundColor: "#ffd9d9" },
                    pauseOnHover: false,
                });
            }
            setFormData({
                email: "",
                title: "",
                message: "",
            });
        } catch (error) {
            console.error(MESSAGES_ERROR.FAMILY_CREATED, error);
        }
    }, [formData, notification, closeModal]);

    return (
        <div className="form-group">
            <label>Email del Usuario</label>
            <Select
                showSearch
                placeholder="Seleccione un usuario"
                optionFilterProp="children"
                value={formData.email}
                onChange={handleUserChange}
                filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                }
                style={{ width: "100%" }}
            >
                {usersOptions.map((email) => (
                    <Select.Option key={email} value={email}>
                        {email}
                    </Select.Option>
                ))}
            </Select>

            <label>Título</label>
            <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ingrese el título"
                style={{ width: "100%", marginTop: "10px" }}
            />

            <label>Mensaje</label>
            <Input.TextArea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Ingrese el mensaje"
                style={{ width: "100%", marginTop: "10px", height: "100px" }}
            />

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
                    type="primary"
                    onClick={() => {
                        if (
                            !formData.email ||
                            !formData.title ||
                            !formData.message
                        ) {
                            notification2.warning({
                                message: "Información",
                                description: "Todos los campos son obligatorios",
                                placement: "bottom",
                                style: { backgroundColor: "#fff7dd" },
                                pauseOnHover: false,
                            });
                            return;
                        }
                        handleSubmit();
                    }}
                    style={{ backgroundColor: "#11538C" }}
                >
                    Guardar Cambios
                </Button>
            </div>
        </div>
    );
}
