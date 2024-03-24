// Sidebar.tsx
import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1">
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/product">Products</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/orders">Orders</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
