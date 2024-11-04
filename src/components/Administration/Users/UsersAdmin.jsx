import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal } from "antd";
import { useUser } from "../../../context/userContext";
import { getListUserInfo, deleteUser } from "../../../services/userService";
import RoleModal from "../../Modal/Users/EditUserModal";
import DeleteModal from "../../Modal/Users/DeleteUserModal";
import { notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./UsersAdmin.css";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { authToken, auth, email, admin } = useUser();
  const [data, setData] = useState([]);
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [tokenVar, setTokenVar] = useState(null);
  const [pageSize, setPageSize] = useState(7); // Tamaño de página por defecto
  const [isAdmin, setIsAdmin] = useState(false);
  const [notificationEdit, setNotificationEdit] = useState(false);
  const [notificationDelete, setNotificationDelete] = useState(false);

  const fetchUsers = async (token) => {
    try {
      const users = await getListUserInfo(token);
      const usersWithKeys = users.map((user) => ({
        ...user,
        key: user.email, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    }
  };

  useEffect(() => {
    if (notificationEdit) {
      showNotificationEdit();
      setNotificationEdit(false);
    }
    if (notificationDelete) {
      showNotificationDelete();
      setNotificationDelete(false);
    }
  }, [notificationEdit, notificationDelete]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    setTokenVar(token);

    if (!isTokenProcessed && token) {
      auth(token); // Guardar el token en el contexto
      setIsTokenProcessed(true); // Marcar como procesado
    }

    fetchUsers(token);
  }, [isModalOpen, isModalDeleteOpen]);

  const showNotification = (message, description) => {
      notification.success({
        message: message,
        description: description,
        placement: "bottom",
        showProgress: true,
        style: { backgroundColor: "#f4fcf2"},
        pauseOnHover: false
      });
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

  const openModal = (email) => {
    if (email === admin) return; // Si es el administrador, no abre el modal
    setSelectedEmail(email); // Establece el email del usuario seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  const openModalDelete = (email) => {
    if (email === admin) return; // Si es el administrador, no abre el modal
    setSelectedEmail(email); // Establece el email del usuario seleccionado
    setIsModalDeleteOpen(true); // Abre el modal
  };

  const showNotificationDelete = () => {
    showNotification("Success", "User deleted successfully");
    fetchUsers(authToken);
  };

  const showNotificationEdit = () => {
    showNotification("Success", "User edited successfully");
    fetchUsers(authToken);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedEmail(null); // Limpia el email seleccionado
  };

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
    setSelectedEmail(null); // Limpia el email seleccionado
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
          <a
            className="table-edit"
            disabled={record.email === admin}
            onClick={() => openModal(record.email)}
          >
            Editar
          </a>
          <a
            className="table-delete"
            disabled={record.email === admin}
            onClick={() => openModalDelete(record.email)}
          >
            Eliminar
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <button
          className="reload"
          onClick={() => fetchUsers(tokenVar)}
          style={{
            width: "120px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Refresh
        </button>
      </div>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <RoleModal
          email={selectedEmail}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          notification={setNotificationEdit}
        />
        <DeleteModal
          email={selectedEmail}
          isModalOpen={isModalDeleteOpen}
          closeModal={closeModalDelete}
          notification={setNotificationDelete}
        />
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize, position: ["topCenter"] }} // Usamos el pageSize dinámico
          scroll={{ x: "max-content" }} // Habilita el scroll horizontal si es necesario
        />
      </div>
    </>
  );
};

export default App;
