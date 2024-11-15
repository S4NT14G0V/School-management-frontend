import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, notification } from "antd";
import { useUser } from "../../context/userContext";
import { getAssesmentsByClass } from "../../services/assesment";
import { validateTeachersAdmins } from "../../services/userService";
import { getClassesById } from "../../services/ClassService";
import EditModal from "../Modal/Assesments/EditAssesmentModal";
import DeleteModal from "../Modal/Assesments/deleteAssesmentModal";
import CreateModal from "../Modal/Assesments/createAssesmentModal";

const AssesmentTable = ({ classes, modal, attendanceModal, attendanceShowModal }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { setAssesmentData } = useUser();
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); //CAMBIAR A FALSE
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [isClass, setClass] = useState(null);
  const [classesData, setClassesData] = useState(classes);

  const [notificationCreate, setNotificationCreate] = useState(false);
  const [notificationDelete, setNotificationDelete] = useState(false);
  const [notificationEdit, setNotificationEdit] = useState(false);

  const openModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const openModalEdit = (record) => {
    setIsModalEditOpen(true);
    setEditData(record);
  };
  const openModalDelete = (record) => {
    setIsModalDeleteOpen(true);
    setDeleteData(record);
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
    if (notificationDelete){
      showNotificationDelete();
      setNotificationDelete(false);
    }
    if (notificationEdit) {
      showNotificationEdit();
      setNotificationEdit(false);
    }
  }, [notificationCreate, notificationDelete, notificationEdit]);

  const showNotificationCreate = () => {
    showNotification("Success", "User created successfully");
    fetchAssesment( classesData.id);
    setData(null);
  };

  const showNotificationDelete = () => {
    showNotification("Success", "Assesment deleted successfully");
    fetchAssesment( classesData.id);
    setData(null);
  };

  const showNotificationEdit = () => {
    showNotification("Success", "Assesment edited successfully");
    fetchAssesment( classesData.id);
    setData(null);
  };

  const closeModalCreate = () => {
    setIsModalCreateOpen(false);
  };

  const fetchAssesment = async ( id) => {
    try {
      console.log("id en el fetch 2", id);
      const Assesments = await getAssesmentsByClass( id);
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

  const fetchClasses = async ( id) => {
    console.log("id en el fetch", id);
    try {
      const Classe = await getClassesById( id);
      setClass(Classe);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error fetching class data: " + error.message,
      });
    }
  };

  const fetchAdminValidation = async () => {
    try {
      const validation = await validateTeachersAdmins();
      setIsAdmin(validation);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error fetching admin validation: " + error.message,
      });
    }
  };

  useEffect(() => {
    fetchAssesment(classesData.id);
    fetchAdminValidation();
    fetchClasses(classesData.id);
  }, []);

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
      render: (date) => date,
    },
    {
      title: "Date Limit",
      dataIndex: "limit_date",
      key: "limit_date",
      width: "20%",
      render: (limitDate) => limitDate,
    }, ...(isAdmin
      ? [
          {
            title: "Action",
            key: "action",
            width: "20%",
            render: (_, record) => (
              <Space size="middle">
                <a
                  className="table-edit"
                  onClick={() => openModalEdit(record)}
                >
                  Editar
                </a>
                <a
                  className="table-delete"
                  onClick={() => openModalDelete(record)}
                >
                  Eliminar
                </a>
              </Space>
            ),
          },
        ]
      : []),
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "1rem",
          width: "100%",
          marginBottom: "1.5rem",
        }}
      >
        {isAdmin && (
          <>
            <button
              onClick={openModalCreate}
              style={{
                width: "120px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "400",
              }}
            >
              Create Assesment
            </button>
            <button
              style={{
                width: "130px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "400",
              }}
              onClick={modal}
            >
              Modify Califications
            </button>
            <button
              style={{
                width: "120px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "400",
              }}
              onClick={attendanceModal}
            >
              Add Attendances
            </button>
            <button
              style={{
                width: "120px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "400",
              }}
              onClick={attendanceShowModal}
            >
              Show Attendances
            </button>
          </>
        )}

        <button
          onClick={() => fetchAssesment(classesData.id)}
          style={{
            width: "80px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            fontWeight: "400",
          }}
        >
          Refresh
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: "7", position: ["topCenter"] }}
        scroll={{ x: "max-content" }}
      />
      <EditModal
        isModalOpen={isModalEditOpen}
        closeModal={() => setIsModalEditOpen(false)}
        notification={setNotificationEdit}
        assesmentData={editData}
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
        notification={setNotificationDelete}
        assesment={deleteData}
      />
    </div>
  );
};

export default AssesmentTable;