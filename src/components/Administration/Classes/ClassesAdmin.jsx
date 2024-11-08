import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal } from "antd";
import { useUser } from "../../../context/userContext";
import { getListUserInfo, deleteUser } from "../../../services/userService";
import EditModal from "../../Modal/Classes/EditClassesModal";
import DeleteModal from "../../Modal/Classes/DeleteClassesModal";
import { notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createClass, getClasses } from "../../../services/ClassService";
import CreateModal from "../../Modal/Classes/CreateClassesModal";

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
  // create function
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [notificationCreate, setNotificationCreate] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const fetchClasses = async (token) => {
    try {
      const classes = await getClasses(token);
      const usersWithKeys = classes.map((clase) => ({
        ...clase,
        key: clase.id, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    }
  };

  // Efecto para cargar usuarios solo al montar el componente
  useEffect(() => {
    if (authToken) {
      fetchClasses(authToken);
    }
  }, [authToken]);

  useEffect(() => {
    if (notificationEdit) {
      showNotificationEdit();
      setNotificationEdit(false);
    }
    if (notificationDelete) {
      showNotificationDelete();
      setNotificationDelete(false);
    }
    if (notificationCreate) {
      showNotificationCreate();
      setNotificationCreate(false);
    }
  }, [notificationEdit, notificationDelete, notificationCreate]);

  // REVISAR A DETALLE
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    setTokenVar(token);

    if (!isTokenProcessed && token) {
      auth(token); // Guardar el token en el contexto
      setIsTokenProcessed(true); // Marcar como procesado
    }
  }, [isModalOpen, isModalDeleteOpen, isModalCreateOpen]);

  const showNotification = (message, description) => {
    notification.success({
      message: message,
      description: description,
      placement: "bottom",
      showProgress: true,
      style: { backgroundColor: "#f4fcf2" },
      pauseOnHover: false,
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

  const openModal = (dataEdit) => {
    setEditData(dataEdit);
    setIsModalOpen(true); // Abre el modal
  };

  const openModalDelete = (dataDelete) => {
    setDeleteData(dataDelete);
    setIsModalDeleteOpen(true); // Abre el modal
  };

  const openModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const showNotificationDelete = () => {
    showNotification("Success", "User deleted successfully");
    fetchClasses(authToken);
  };

  const showNotificationEdit = () => {
    showNotification("Success", "User edited successfully");
    fetchClasses(authToken);
    setEditData(null);
  };

  const showNotificationCreate = () => {
    showNotification("Success", "User created successfully");
    fetchClasses(authToken);
    setDeleteData(null);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedEmail(null); // Limpia el email seleccionado
  };

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
    setSelectedEmail(null); // Limpia el email seleccionado
  };

  const closeModalCreate = () => {
    setIsModalCreateOpen(false);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) setTimeout(() => searchInput.current?.select(), 100);
    },
    render: (text) => (searchedColumn === dataIndex ? text || "" : text),
  });
  
  

  const columns = [
    {
      title: "Subject",
      dataIndex: ["subject", "name"],
      key: "subject.name",
      width: "20%",
      ...getColumnSearchProps("subject.name"),
      onFilter: (value, record) =>
        record.subject?.name?.toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => record.subject?.name || "Subject not Found",
    },
    {
      title: "Teacher",
      dataIndex: ["teacher", "name"],
      key: "teacher.name",
      width: "20%",
      ...getColumnSearchProps("teacher.name"),
      onFilter: (value, record) =>
        record.teacher?.name?.toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => record.teacher
        ? `${record.teacher.name} ${record.teacher.lastname}`
        : "Teacher not Found",
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
      width: "20%",
      ...getColumnSearchProps("schedule"),
      onFilter: (value, record) =>
        record.schedule?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      width: "20%",
      ...getColumnSearchProps("group"),
      onFilter: (value, record) =>
        record.group?.variant?.toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => {
        if (record.group?.grade === undefined || record.group?.variant === undefined) {
          const groupName = "Sin Grupo";
          return groupName;
        } else {
          const groupName = record.group?.grade + " - " + record.group?.variant;
          return groupName ? groupName : "Group not found";
        }
        
      },
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="table-edit"
            disabled={record.email === admin}
            onClick={() => openModal(record)}
          >
            Editar
          </a>
          <a
            className="table-delete"
            disabled={record.email === admin}
            onClick={() => openModalDelete(record)}
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
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: "1rem",
        }}
      >
        <button
          className="reload"
          onClick={() => openModalCreate()}
          style={{
            width: "120px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Create
        </button>
        <button
          className="reload"
          onClick={() => fetchClasses(authToken)}
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
        <EditModal
          email={selectedEmail}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          notification={setNotificationEdit}
          classesData={editData}
        />
        <CreateModal
          isModalOpen={isModalCreateOpen}
          closeModal={closeModalCreate}
          notification={setNotificationCreate}
        />
        <DeleteModal
          email={selectedEmail}
          isModalOpen={isModalDeleteOpen}
          closeModal={closeModalDelete}
          notification={setNotificationDelete}
          classesData={deleteData}
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
