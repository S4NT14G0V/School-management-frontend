import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, notification } from "antd";
import { useUser } from "@context/userContext";
import { getListUserInfo } from "@services/userService";
import RoleModal from "@modal/Users/EditRolUserModal";
import DeleteModal from "@modal/Users/DeleteUserModal";
import SendMessageModal from "@modal/Message/sendMessageModal";
import { MESSAGES_SUCCESS, MESSAGES_ERROR, ROLES } from "@config/constants";
import useActiveUsersGeneral from "@hooks/useActiveUsersGeneral";
import "./UsersAdmin.css";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { admin } = useUser();
  const [data, setData] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleEdit, setRoleEdit] = useState(null);
  const { activeUsers } = useActiveUsersGeneral();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const users = await getListUserInfo();
      const usersWithKeys = users.map((user) => ({
        ...user,
        key: user.email, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    } finally {
      setLoading(false);
    }
  }, []);

  // EDIT
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationEdit, setNotificationEdit] = useState(false);
  const openModal = (email) => {
    const user = data.find((user) => user.email === email);
    setRoleEdit(user.rol.name);
    if (email === admin) return; // Si es el administrador, no abre el modal
    setSelectedEmail(email); // Establece el email del usuario seleccionado
    setIsModalOpen(true); // Abre el modal
  };
  const showNotificationEdit = useCallback(() => {
    showNotification(
      MESSAGES_SUCCESS.TITLE,
      MESSAGES_SUCCESS.USER_ROLE_UPDATED
    );
    fetchUsers();
  }, [fetchUsers]);
  const closeModal = useCallback(() => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedEmail(null); // Limpia el email seleccionado
  }, []);

  // DELETE
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [notificationDelete, setNotificationDelete] = useState(false);
  const openModalDelete = (email) => {
    if (email === admin) return; // Si es el administrador, no abre el modal
    setSelectedEmail(email); // Establece el email del usuario seleccionado
    setIsModalDeleteOpen(true); // Abre el modal
  };
  const showNotificationDelete = useCallback(() => {
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.USER_DELETED);
    fetchUsers();
  }, [fetchUsers]);
  const closeModalDelete = useCallback(() => {
    setIsModalDeleteOpen(false);
    setSelectedEmail(null); // Limpia el email seleccionado
  }, []);

  // NOTIFICATION
  const [isModalSendMessageOpen, setIsModalSendMessageOpen] = useState(false);
  const [notificationSendMessage, setNotificationSendMessage] = useState(false);
  const openSendMessageModal = () => {
    setIsModalSendMessageOpen(true);
  };
  const showNotificationSendMessage = useCallback(() => {
    showNotification(MESSAGES_SUCCESS.TITLE, MESSAGES_SUCCESS.MESSAGE_SENT);
  }, []);
  const closeSendMessageModal = useCallback(() => {
    setIsModalSendMessageOpen(false);
  }, []);

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
    if (notificationSendMessage) {
      showNotificationSendMessage();
      setNotificationSendMessage(false);
    }
  }, [notificationEdit, notificationDelete, notificationSendMessage]);

  // Efecto para cargar usuarios solo al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }, []);

  const handleReset = useCallback((clearFilters) => {
    clearFilters();
    setSearchText("");
  }, []);

  const getColumnSearchProps = useMemo(
    () => (dataIndex) => ({
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
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (text ? text : "") : text,
    }),
    [handleReset, handleSearch, searchedColumn]
  );

  const columns = useMemo(
    () => [
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
          } else if (rolName === ROLES.Student) {
            color = "blue";
          } else if (rolName === ROLES.Admin) {
            color = "red";
          } else if (rolName === ROLES.Teacher) {
            color = "purple";
          } else if (rolName === ROLES.Parent) {
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
    ],
    [admin, getColumnSearchProps, openModal, openModalDelete]
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          width: "100%",
          gap: "1rem",
        }}
      >
        <button
          className="reload"
          onClick={() => openSendMessageModal()}
          style={{
            width: "120px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "14px",
          }}
        >
          Send Message
        </button>
        <button
          className="reload"
          onClick={() => fetchUsers()}
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
          role={roleEdit}
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
        <SendMessageModal
          isModalOpen={isModalSendMessageOpen}
          closeModal={closeSendMessageModal}
          notification={setNotificationSendMessage}
          userData={activeUsers}
        />
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: "7", position: ["topCenter"] }} // Usamos el pageSize dinámico
          scroll={{ x: "max-content" }} // Habilita el scroll horizontal si es necesario
        />
      </div>
      <div
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              width: "275px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
              fontSize: "0.85rem",
              padding: "0 20px 2px 0",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#00ff00",
                marginRight: "5px",
              }}
            ></div>
            <p><span style={{fontWeight:"600"}}>Active Users:</span> {activeUsers.length}</p>
          </div>
    </>
  );
};

export default App;
