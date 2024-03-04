import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actUserUpdateProfileAsync } from "../../../store/user/action";

function Profile() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.success({
      message: `Cập nhật thông tin thành công`,
      placement: "topRight",
    });
  };

  const currenUser = useSelector((state) => state.USER.currenUser);
  const [loading, setLoading] = useState(false);
  const [avtUrl, setAvtUrl] = useState(currenUser?.simple_local_avatar?.full);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  // form instance
  const [form] = Form.useForm();
  const initialValues = {
    first_name: currenUser?.first_name,
    last_name: currenUser?.last_name,
    nickname: currenUser?.nickname,
    description: currenUser?.description,
  };

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   dispatch(actUserUpdateProfileAsync(values)).then((res) => {
  //     if (res.ok) {
  //       alert("Cập nhập thông tin thành công");
  //     } else {
  //       alert("Cập nhập thông tin thất bại");
  //     }
  //   });
  // };

  const onFinish = (values) => {
    setLoading(true);
    let formData = null;
    if (file) {
      formData = new FormData();
      formData.append("file", file);
      console.log(formData);
    }
    dispatch(actUserUpdateProfileAsync(values, formData)).then((res) => {
      setLoading(false);
      openNotification();
    });
  };

  const beforeUpload = () => {
    return false;
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeImage = (info) => {
    console.log(info);
    const file = info.file;
    console.log(file);
    const imgUrl = URL.createObjectURL(file);
    console.log(imgUrl);
    setAvtUrl(imgUrl);
    setFile(file);
  };

  useEffect(() => {
    console.log(currenUser);
    if (currenUser) {
      console.log("setFieldsValue");
      setAvtUrl(currenUser?.simple_local_avatar?.full);
      form.setFieldsValue({
        first_name: currenUser?.first_name,
        last_name: currenUser?.last_name,
        nickname: currenUser?.nickname,
        description: currenUser?.description,
      });
    }
  }, [currenUser]);

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="wrap"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
          <Space size={12}>
            <Image width={200} src={avtUrl} />
            <Upload name="file" beforeUpload={beforeUpload} onChange={handleChangeImage}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Space>
        </Form.Item>

        <Form.Item
          label="Firstname"
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Lastname"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nickname"
          name="nickname"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Profile;
