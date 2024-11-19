import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Space, Table, notification } from "antd";
import { useUser } from "@context/userContext";
import { getAssesmentsByClass } from "@services/assesment";
import { validateTeachersAdmins } from "@services/userService";
import { getClassesById } from "@services/ClassService";
import CreateModal from "@modal/Assesments/createAssesmentModal";
import EditModal from "@modal/Assesments/editAssesmentModal";
import DeleteModal from "@modal/Assesments/deleteAssesmentModal";
import { MESSAGES_ERROR, MESSAGES_SUCCESS } from "@config/constants";

const AssesmentTable = ({ classes, modal, attendanceModal, attendanceShowModal }) => {
  const searchInput = useRef(null);
  const { assesmentData, setAssesmentData } = useUser();
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); //CAMBIAR A FALSE
  const [classesData] = useState(classes);
  const [loading, setLoading] = useState(true);
  
  const fetchAssesment = useCallback(async ( id) => {
    setLoading(true);
    try {
      const Assesments = await getAssesmentsByClass( id);
      const usersWithKeys = Assesments.map((Assesment) => ({
        ...Assesment,
        key: Assesment.id, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
      setAssesmentData(Assesments);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING,error);
    } finally {
      setLoading(false);
    }
  },[]);

  // CREATE
  const [notificationCreate, setNotificationCreate] = useState(false);
  const [isClass, setClass] = useState(null);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const openModalCreate = () => {
    setIsModalCreateOpen(true);
  };
  const showNotificationCreate = useCallback(() => {
    fetchAssesment(classesData.id);
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.ASSESMENT_CREATED);
    setData(null);
  },[fetchAssesment]);
  
  // EDIT
  const [notificationEdit, setNotificationEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const openModalEdit = (record) => {
    setIsModalEditOpen(true);
    setEditData(record);
  };
  const showNotificationEdit = useCallback(() => {
    fetchAssesment( classesData.id);
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.ASSESMENT_UPDATED);
    setData(null);
  },[fetchAssesment]);
  
  //DELETE
  const [notificationDelete, setNotificationDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const openModalDelete = (record) => {
    setIsModalDeleteOpen(true);
    setDeleteData(record);
  };
  const showNotificationDelete = useCallback(() => {
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.ASSESMENT_DELETED);
    fetchAssesment( classesData.id);
    setData(null);
  },[fetchAssesment]);
  
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

  

  const fetchClasses = useCallback(async (id) => {
    try {
      const Classe = await getClassesById( id);
      setClass(Classe);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error fetching class data: " + error.message,
      });
    }
  },[]);

  const fetchAdminValidation = useCallback(async () => {
    try {
      const validation = await validateTeachersAdmins();
      setIsAdmin(validation);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error fetching admin validation: " + error.message,
      });
    }
  },[]);

  useEffect(() => {
    fetchAssesment(classesData.id),
    fetchAdminValidation(),
    fetchClasses(classesData.id)
  }, [fetchAdminValidation, fetchAssesment, fetchClasses, classesData.id]);

  const columns = useMemo(() => [
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
  ], [isAdmin]);

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
        loading={loading}
        pagination={{ pageSize: "7", position: ["topCenter"] }}
        scroll={{ x: "max-content" }}
        size="middle"
        bordered
      />
      <EditModal
        isModalOpen={isModalEditOpen}
        closeModal={() => setIsModalEditOpen(false)}
        notification={setNotificationEdit}
        data={editData}
      />
      <CreateModal
        isModalOpen={isModalCreateOpen}
        closeModal={() => setIsModalCreateOpen(false)}
        data={isClass}
        notification={setNotificationCreate}
      />
      <DeleteModal
        isModalOpen={isModalDeleteOpen}
        closeModal={() => setIsModalDeleteOpen(false)}
        notification={setNotificationDelete}
        data={deleteData}
      />
    </div>
  );
};

export default React.memo(AssesmentTable);