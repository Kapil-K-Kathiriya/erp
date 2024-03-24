// Layout.tsx
import React, { ReactNode } from "react";
import { Layout } from "antd";
import Sidebar from "./sidebar";
import Header from "./header";

const { Content } = Layout;

interface MainLayoutProps {
  children: ReactNode; // Define children prop as ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ padding: "20px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
