import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, notification } from "antd";
import { useUser } from "@context/userContext";
import CreateModal from "@modal/Subjects/CreateSubjectModal";
import EditModal from "@modal/Subjects/EditSubjectModal";
import DeleteModal from "@modal/Subjects/DeleteSubjectModal";
import { getSubjects } from "@services/subjectService";
import { MESSAGES_ERROR, MESSAGES_SUCCESS } from "@config/constants";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { admin } = useUser();
  const [data, setData] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const subjects = await getSubjects();
      const usersWithKeys = subjects.map((subject) => ({
        ...subject,
        key: subject.name, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING,error);
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
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.SUBJECT_CREATED);
    fetchSubjects();
    setDeleteData(null);
  },[fetchSubjects]);
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
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.SUBJECT_UPDATED);
    fetchSubjects();
    setEditData(null);
  },[fetchSubjects]);
  const closeModal = useCallback(() => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedEmail(null); // Limpia el email seleccionado
  },[]);
  
  // DELETE
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [notificationDelete, setNotificationDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const openModalDelete = (dataDelete) => {
    setDeleteData(dataDelete);
    setIsModalDeleteOpen(true); // Abre el modal
  };
  const showNotificationDelete = useCallback(() => {
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.SUBJECT_DELETED);
    fetchSubjects();
  },[fetchSubjects]);
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
    if (notificationDelete) {
      showNotificationDelete();
      setNotificationDelete(false);
    }
    if (notificationCreate) {
      showNotificationCreate();
      setNotificationCreate(false);
    }
  }, [notificationEdit, notificationDelete, notificationCreate]);

  // Efecto para cargar usuarios solo al montar el componente
  useEffect(() => {
    fetchSubjects();
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

  const columns = useMemo(()=>[
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "60%",
      ...getColumnSearchProps("description"),
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
  ], [admin, getColumnSearchProps]);

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
          onClick={() => fetchSubjects()}
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
          subjectData={editData}
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
          subjectData={deleteData}
        />
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            pageSize: "7",
            position: ["topCenter"],
          }}
          scroll={{ x: "max-content" }} // Habilita el scroll horizontal si es necesario
        />
      </div>
    </>
  );
};

export default App;
