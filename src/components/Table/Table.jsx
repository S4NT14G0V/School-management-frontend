import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal } from "antd";
import { useUser } from "../../context/userContext";
import {
  getListUserInfo,
  deleteUser,
} from "../../services/userService";
import RoleModal from "../Modal/Modal";
import { editRolByEmail } from "../../services/userService";

import "./Table.css";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { authToken, auth } = useUser();
  const [data, setData] = useState([]);
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const fetchUsers = async (token) => {
    try {
      const users = await getListUserInfo(token);
      setData(users);
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (!isTokenProcessed && token) {
      auth(token); // Guardar el token en el contexto
      setIsTokenProcessed(true); // Marcar como procesado
    }

    fetchUsers(token);
  }, []);

  const handleDelete = async (email) => {
    console.log("email delete: ", email);
    try {
      const response = await deleteUser(authToken, email); // Ejemplo de servicio
      console.log("Response object:", response); // Verifica la respuesta del servidor
      if (response.success) {
        // Refresca los datos de la tabla si el borrado fue exitoso
        fetchUsers(authToken);
      } else {
        console.error("Error al eliminar usuario:", response.message);
      }
    } catch (error) {
      console.error("Error eliminando el usuario:", error);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // Función para abrir el modal
  const openModal = (email) => {
    setSelectedEmail(email); // Establece el email del usuario seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedEmail(null); // Limpia el email seleccionado
    fetchUsers(authToken);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (text ? text : "") : text,
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      ...getColumnSearchProps("lastname"),
    },
    {
      title: "Document",
      dataIndex: "document_number",
      key: "document_number",
      ...getColumnSearchProps("document_number"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Rol",
      dataIndex: "rol.name",
      key: "rol.name",
      filters: [
        {
          text: "Student",
          value: "Student",
        },
        {
          text: "Parent",
          value: "Parent",
        },
        {
          text: "Admin",
          value: "Admin",
        },
        {
          text: "Teacher",
          value: "Teacher",
        },
      ],
      onFilter: (value, record) => record.rol?.name === value,
      render: (text, record) => {
        const rolName = record.rol?.name;
        let color;
        if (!rolName) {
          color = "volcano";
        } else if (rolName === "Student") {
          color = "blue";
        } else if (rolName === "Admin") {
          color = "red";
        } else if (rolName === "Teacher") {
          color = "purple";
        } else if (rolName === "Parent") {
          color = "orange";
        }
        return (
          <>
            {rolName ? (
              <Tag color={color}>{rolName.toUpperCase()}</Tag>
            ) : (
              <Tag color="volcano">NO ROLE</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a className="table-edit" onClick={() => openModal(record.email)}>
            Editar
          </a>
          <a className="table-delete" onClick={() => handleDelete(record.email)}>
            Eliminar
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
       <RoleModal
        email={selectedEmail}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 7, position: ["topCenter"] }} // Configura la paginación con 10 elementos por página
        scroll={{ x: "max-content" }} // Habilita el scroll horizontal si es necesario
      />
    </div>
  );
};
export default App;
