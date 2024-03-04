import { Button, Form, Input, notification } from "antd";
import React from "react";
import { actUserChangePasswordAsync } from "../../../store/user/action";
import { useDispatch } from "react-redux";

function Changepassword() {
  const dispatch = useDispatch();

  // thay đổi mật khẩu success
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(actUserChangePasswordAsync(values)).then((res) => {
      if (res.ok) {
        openNotification();
      } else {
        openNotificationError();
      }
    });
  };
  // thay đổi mật khẩu failed
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Thông báo
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.success({
      message: `Thay đổi mật khẩu thành công`,
    });
  };
  const openNotificationError = () => {
    api.error({
      message: `Thay đổi mật khẩu thất bại`,
    });
  };

  return (
    <>
      {contextHolder}

      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="new_password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm_new_password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Changepassword;
