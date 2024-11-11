import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, notification } from "antd";
import { useUser } from "../../context/userContext";
import { getAssesmentsByClass } from "../../services/assesment";
import { validateTeachersAdmins } from "../../services/userService";
import { getClassesById } from "../../services/ClassService";
import EditModal from "../Modal/Classes/EditClassesModal";
import DeleteModal from "../Modal/Classes/DeleteClassesModal";
import CreateModal from "../Modal/Assesments/createAssesmentModal";

const AssesmentTable = ({ classes, modal }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { authToken, auth, admin, assesmentData, setAssesmentData } = useUser();
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); //CAMBIAR A FALSE
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [isClass, setClass] = useState(null);
  const [pageSize, setPageSize] = useState(7);
  const [classesData, setClassesData] = useState(classes);

  const [notificationCreate, setNotificationCreate] = useState(false);

  const openModalCreate = () => {
    setIsModalCreateOpen(true);
  };

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
    if (notificationCreate) {
      showNotificationCreate();
      setNotificationCreate(false);
    }
  }, [notificationCreate]);

  const showNotificationCreate = () => {
    showNotification("Success", "User created successfully");
    fetchAssesment(authToken, classesData.id);
    setData(null);
  };
  const closeModalCreate = () => {
    setIsModalCreateOpen(false);
  };

  const fetchAssesment = async (token, id) => {
    try {
      console.log("id en el fetch 2", id);
      const Assesments = await getAssesmentsByClass(token, id);
      const usersWithKeys = Assesments.map((Assesment) => ({
        ...Assesment,
        key: Assesment.id, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
      setAssesmentData(Assesments);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error fetching class data: " + error.message,
      });
    }
  };

  const fetchClasses = async (token, id) => {
    console.log("id en el fetch", id);
    try {
      const Classe = await getClassesById(token, id);
      setClass(Classe);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error fetching class data: " + error.message,
      });
    }
  };

  const fetchAdminValidation = async (token) => {
    try {
      const validation = await validateTeachersAdmins(token);
      setIsAdmin(validation);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error fetching admin validation: " + error.message,
      });
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchAssesment(authToken, classesData.id);
      fetchAdminValidation(authToken);
      fetchClasses(authToken, classesData.id);
      console.log(classesData.id);
    }
  }, [authToken]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) setTimeout(() => searchInput.current?.select(), 100);
    },
  });

  const columns = [
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      width: "10%",
      render: (text) => `${text}%`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Date Posted",
      dataIndex: "date",
      key: "date",
      width: "20%",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Date Limit",
      dataIndex: "limit_date",
      key: "limit_date",
      width: "20%",
      render: (limitDate) => new Date(limitDate).toLocaleDateString(),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "1rem",
          width: "100%",
        }}
      >
        {isAdmin && (
          <>
            <button
              onClick={openModalCreate}
              style={{
                width: "80px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              Create
            </button>
            <button
              style={{
                width: "110px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "400",
              }}
              onClick={modal}
            >
              Calificaciones
            </button>
          </>
        )}

        <button
          onClick={() => fetchAssesment(authToken, classesData.id)}
          style={{
            width: "80px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          Refresh
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize, position: ["topCenter"] }}
        scroll={{ x: "max-content" }}
      />
      <EditModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        classesData={editData}
      />
      <CreateModal
        isModalOpen={isModalCreateOpen}
        closeModal={closeModalCreate}
        classes={isClass}
        notification={setNotificationCreate}
      />
      <DeleteModal
        isModalOpen={isModalDeleteOpen}
        closeModal={() => setIsModalDeleteOpen(false)}
        classesData={deleteData}
      />
    </div>
  );
};

export default AssesmentTable;
