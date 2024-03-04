import {
  FileAddOutlined,
  HomeFilled,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadFilled,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { actUserLogout } from "../../store/user/action";
const { Header, Sider, Content } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Bạn có muốn đăng xuất?");
  const showModal = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout
  const { currentUser, token } = useSelector((state) => state.USER);
  const handleOk = () => {
    dispatch(actUserLogout(token));
    navigate("/");
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeFilled />,
              label: <Link to="/">Trang chủ</Link>,
            },
            {
              key: "2",
              icon: <ReadFilled />,
              label: <Link to="/dashboard/post">Bài viết</Link>,
            },
            {
              key: "3",
              icon: <FileAddOutlined />,
              label: <Link to="/dashboard/create-post">Tạo bài viết</Link>,
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: <Link to="/dashboard/profile">Thông tin tài khoản</Link>,
            },
            {
              key: "5",
              icon: <UserAddOutlined />,
              label: <Link to="/dashboard/change-password">Thay đổi mật khẩu</Link>,
            },
            {
              key: "6",
              icon: <LogoutOutlined />,
              label: (
                <>
                  <Link onClick={showModal}>Đăng xuất</Link>
                  <Modal
                    title="Thông báo"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                  >
                    <p>{modalText}</p>
                  </Modal>
                </>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
