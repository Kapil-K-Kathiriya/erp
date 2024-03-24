// Header.tsx
import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <h2 style={{ color: "white", paddingLeft: "20px" }}>ERP System</h2>
    </Header>
  );
};

export default HeaderComponent;
