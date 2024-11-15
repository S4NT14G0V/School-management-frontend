import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useUser } from "../../../context/userContext";
import EditModal from "../../Modal/Groups/EditGroupsModal";
import { notification } from "antd";
import CreateModal from "../../Modal/Groups/CreateGroupsModal";
import { getStudentsWithGroup } from "../../../services/groupService";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { admin } = useUser();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [notificationEdit, setNotificationEdit] = useState(false);
  // create function
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [notificationCreate, setNotificationCreate] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchGroups = async () => {
    try {
      const GroupXstudent = await getStudentsWithGroup();
      const usersWithKeys = GroupXstudent.map((groupXstudent) => ({
        ...groupXstudent,
        key: groupXstudent.student.id, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  // Efecto para cargar usuarios solo al montar el componente
  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (notificationEdit) {
      showNotificationEdit();
      setNotificationEdit(false);
    }
    if (notificationCreate) {
      showNotificationCreate();
      setNotificationCreate(false);
    }
  }, [notificationEdit, notificationCreate]);

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

  const openModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const showNotificationEdit = () => {
    showNotification("Success", "User edited successfully");
    fetchGroups();
    setEditData(null);
  };

  const showNotificationCreate = () => {
    showNotification("Success", "User created successfully");
    fetchGroups();
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedEmail(null); // Limpia el email seleccionado
  };

  const closeModalCreate = () => {
    setIsModalCreateOpen(false);
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
      title: "Group",
      dataIndex: "group",
      key: "group",
      width: "20%",
      ...getColumnSearchProps("group"),
      onFilter: (value, record) =>
        record.group?.variant?.toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => {
        if (
          record.group?.grade === undefined ||
          record.group?.variant === undefined
        ) {
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
          groupsData={editData}
        />
        <CreateModal
          isModalOpen={isModalCreateOpen}
          closeModal={closeModalCreate}
          notification={setNotificationCreate}
        />
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: "7", position: ["topCenter"] }} // Usamos el pageSize dinámico
          scroll={{ x: "max-content" }} // Habilita el scroll horizontal si es necesario
        />
      </div>
    </>
  );
};

export default App;
