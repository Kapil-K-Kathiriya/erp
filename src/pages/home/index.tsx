import { Link } from "react-router-dom";
import { Card, Statistic, Button, Row, Col } from "antd";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";

export const Home: React.FC = () => {
  const totalProducts = 10;
  const totalOrders = 50;

  return (
    <div>
      <h1 style={{ color: "#000" }}>Dashboard</h1>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        {/* Card for displaying total number of products */}
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Products"
              value={totalProducts}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>

        {/* Card for displaying total number of orders */}
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Orders"
              value={totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        {/* Button for navigating to Products Management page */}
        <Col span={12}>
          <Link to="/product">
            <Button type="primary" block>
              Manage Products
            </Button>
          </Link>
        </Col>

        {/* Button for navigating to Orders Management page */}
        <Col span={12}>
          <Link to="/orders">
            <Button type="primary" block>
              Manage Orders
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
