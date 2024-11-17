import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useUser } from "../../../context/userContext";
import EditModal from "../../Modal/family/EditFamilyModal";
import { notification } from "antd";
import CreateModal from "../../Modal/Family/CreateFamilyModal";
import DeleteModal from "../../Modal/Family/DeleteFamilyModal";
import { getFamilies } from "../../../services/family";
import { MESSAGES_SUCCESS, MESSAGES_ERROR } from "../../../config/constants";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { admin } = useUser();
  const [data, setData] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      const StudentXParent = await getFamilies();
      const usersWithKeys = StudentXParent.map((StudentXParent) => ({
        ...StudentXParent,
        key: StudentXParent.id, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    } finally {
      setLoading(false);
    }
  },[]);

  // CREATE
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [notificationCreate, setNotificationCreate] = useState(false);
  const openModalCreate = () => {
    setIsModalCreateOpen(true);
  };
  const showNotificationCreate = useCallback(() => {
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.FAMILY_CREATED);
    fetchGroups();
  },[fetchGroups]);
  const closeModalCreate = useCallback(() => {
    setIsModalCreateOpen(false);
  },[]);
  
  // EDIT
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationEdit, setNotificationEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const openModal = (dataEdit) => {
    setEditData(dataEdit);
    setIsModalOpen(true); // Abre el modal
  };
  const showNotificationEdit = useCallback(() => {
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.FAMILY_UPDATED);
    fetchGroups();
    setEditData(null);
  },[fetchGroups]);
  const closeModal = useCallback(() => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedEmail(null); // Limpia el email seleccionado
  },[]);
  
  // DELETE
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [notificationDelete, setNotificationDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const openModalDelete = (dataDelete) => {
    setIsModalDeleteOpen(true);
    setDeleteData(dataDelete);
  };
  const showNotificationDelete = useCallback(() => {
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.FAMILY_DELETED);
    fetchGroups();
    setDeleteData(null);
  },[fetchGroups]);
  const closeModalDelete = useCallback(() => {
    setIsModalDeleteOpen(false);
    setSelectedEmail(null); // Limpia el email seleccionado
  },[]);
 
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

  useEffect(() => {
    if (notificationEdit) {
      showNotificationEdit();
      setNotificationEdit(false);
    }
    if (notificationCreate) {
      showNotificationCreate();
      setNotificationCreate(false);
    }
    if (notificationDelete) {
      showNotificationDelete();
      setNotificationDelete(false);
    }
  }, [notificationEdit, notificationDelete, notificationCreate]);

  // Efecto para cargar usuarios solo al montar el componente
  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  },[]);

  const handleReset = useCallback((clearFilters) => {
    clearFilters();
    setSearchText("");
  },[]);

  const getColumnSearchProps = useMemo(()=>(dataIndex) => ({
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
  }),[handleReset, handleSearch, searchedColumn]);

  const columns = useMemo(() => [
    {
      title: "Student",
      dataIndex: "student.name", // Accessing the student object
      key: "student.name",
      width: "60%",
      ...getColumnSearchProps("student.name"),
      onFilter: (value, record) =>
        record.student?.name?.toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => {
        const studentName = record.student?.name;
        const studentLastName = record.student?.lastname;
        return studentName && studentLastName
          ? `${studentName} ${studentLastName}`
          : "Student not found";
      },
    },
    {
      title: "Parent",
      dataIndex: "parent.name", // Accessing the student object
      key: "parent.name",
      width: "60%",
      ...getColumnSearchProps("parent.name"),
      onFilter: (value, record) =>
        record.parent?.name?.toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => {
        const studentName = record.parent?.name;
        const studentLastName = record.parent?.lastname;
        return studentName && studentLastName
          ? `${studentName} ${studentLastName}`
          : "Parent not found";
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
  ],[admin, getColumnSearchProps]);

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
            background: "rgb(81, 0, 225)",
          }}
        >
          Create
        </button>
        <button
          className="reload"
          onClick={() => fetchGroups()}
          style={{
            width: "120px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgb(81, 0, 225)",
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
          FamilyData={editData}
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
          FamilyData={deleteData}
        />
        <Table
          columns={columns}
          loading={loading}
          dataSource={data}
          pagination={{ pageSize: "7", position: ["topCenter"] }} // Usamos el pageSize dinámico
          scroll={{ x: "max-content" }} // Habilita el scroll horizontal si es necesario
        />
      </div>
    </>
  );
};

export default App;