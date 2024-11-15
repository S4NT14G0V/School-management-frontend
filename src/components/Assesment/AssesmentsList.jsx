import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, notification } from "antd";
import { getMyAssesment } from "../../services/assesment";

const AssesmentTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [data, setData] = useState([]);

  const fetchAssesment = async () => {
    try {
      const Assesments = await getMyAssesment();
      const usersWithKeys = Assesments.map((Assesment) => ({
        ...Assesment,
        key: Assesment.id, // Usa una propiedad única como key
      }));
      setData(usersWithKeys);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error fetching class data: " + error.message,
      });
    }
  };

  useEffect(() => {
    fetchAssesment();
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
      title: "Subject",
      dataIndex: ["classes", "subject", "name"],
      key: "classes.subject.name",
      width: "20%",
      ...getColumnSearchProps(
        "classes.subject.name"
      ),
      onFilter: (value, record) => {
        const fullText = `${record.classes?.subject?.name || ""}`;
        return fullText.toLowerCase().includes(value.toLowerCase());
      },
      render: (text, record) => {
        const displayText = `${
          record.classes?.subject?.name || "Subject not Found"
        }`;
        return displayText;
      },
    },
    {
      title: "Group",
      dataIndex: ["classes", "group", "id"],
      key: "classes.group.id",
      width: "10%",
      ...getColumnSearchProps(
          "classes.group.grade" +
          "-" +
          "classes.group.variant"
      ),
      onFilter: (value, record) => {
        const fullText = `${record.classes?.group?.grade || ""
        } - ${record.classes?.group?.variant || ""}`;
        return fullText.toLowerCase().includes(value.toLowerCase());
      },
      render: (text, record) => {
        const displayText = `${record.classes?.group?.grade || ""} - ${
          record.classes?.group?.variant || ""
        }`;
        return displayText;
      },
    },
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
      width: "15%",
      render: (date) => date,
    },
    {
      title: "Date Limit",
      dataIndex: "limit_date",
      key: "limit_date",
      width: "15%",
      render: (limitDate) => limitDate,
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
        <button
          onClick={() => fetchAssesment()}
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
        pagination={{ pageSize: "7", position: ["topCenter"] }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default AssesmentTable;
