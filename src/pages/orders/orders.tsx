import { useState } from "react";
import { Table, Button, Modal, Calendar, message } from "antd";

const OrdersManagement: React.FC = () => {
  const initialOrders: Order[] = [];
  for (let i = 1; i <= 50; i++) {
    initialOrders.push({
      id: i,
      customerId: 1000 + i,
      customerName: `Customer ${i}`,
      orderDate: `2024-03-${Math.floor(Math.random() * 30) + 1}`,
      status: ["Pending", "Shipped", "Delivered"][
        Math.floor(Math.random() * 3)
      ],
    });
  }

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "Order Date", dataIndex: "orderDate", key: "orderDate" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Order) => (
        <div>
          <Button type="primary" onClick={() => handleViewDetails(record)}>
            View Details
          </Button>
        </div>
      ),
    },
  ];
  const columns2 = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "Order Date", dataIndex: "orderDate", key: "orderDate" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Order) => (
        <div>
          <Button type="primary" onClick={() => handleViewDetailsDate(record)}>
            View Details
          </Button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (record: Order) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };
  const handleViewDetailsDate = (record: Order) => {
    Modal.info({
      title: "Order Details",
      content: (
        <div>
          <p>
            <strong>Order ID:</strong> {record?.id}
          </p>
          <p>
            <strong>Customer Name:</strong> {record?.customerName}
          </p>
          <p>
            <strong>Order Date:</strong> {record?.orderDate}
          </p>
          <p>
            <strong>Status:</strong> {record?.status}
          </p>
        </div>
      ),
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDateCellClick = (value: any) => {
    const selectedDate = value.format("YYYY-MM-DD");
    const ordersForDate = orders.filter(
      (order) => order.orderDate === selectedDate
    );
    if (ordersForDate.length > 0) {
      Modal.info({
        title: `Orders for ${selectedDate}`,
        content: (
          <div>
            <Table
              dataSource={ordersForDate}
              columns={columns2}
              rowKey="id"
              pagination={false}
            />
          </div>
        ),
        width: 800,
      });
    } else {
      message.info("No orders scheduled for this date.");
    }
  };

  // Function to render date cells in the calendar view
  const renderDateCell = (date: any) => {
    const selectedDate = date.format("YYYY-MM-DD");
    const ordersForDate = orders.filter(
      (order) => order.orderDate === selectedDate
    );
    if (ordersForDate.length > 0) {
      return (
        <div>
          <p style={{ margin: 0, fontSize: "12px" }}>{ordersForDate.length}</p>
          <p style={{ margin: 0, fontSize: "10px", color: "gray" }}>Orders</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          color: "#000",
          paddingBottom: "5px",
        }}
      >
        Orders Management
      </h1>
      <Calendar
        style={{ marginBottom: "20px" }}
        dateCellRender={(date) => renderDateCell(date)}
        onSelect={handleDateCellClick}
      />
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        style={{ marginTop: "20px" }}
      />

      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        style={{ zIndex: 1001 }}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Customer Name:</strong> {selectedOrder.customerName}
            </p>
            <p>
              <strong>Order Date:</strong> {selectedOrder.orderDate}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

interface Order {
  id: number;
  customerId: number;
  customerName: string;
  orderDate: string;
  status: string;
}

export default OrdersManagement;
