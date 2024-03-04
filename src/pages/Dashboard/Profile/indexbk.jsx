import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actUserUpdateProfileAsync } from "../../../store/user/action";

const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function Profile() {
  const dispatch = useDispatch();

  const currenUser = useSelector((state) => state.USER.currenUser);
  console.log(currenUser);
  const [avtUrl, setAvtUrl] = useState(currenUser?.simple_local_avatar?.full);

  // form instance
  const [form] = Form.useForm();
  const initialValues = {
    first_name: currenUser?.first_name,
    last_name: currenUser?.last_name,
    nickname: currenUser?.nickname,
    description: currenUser?.description,
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(actUserUpdateProfileAsync(values)).then((res) => {
      if (res.ok) {
        alert("Cập nhập thông tin thành công");
      } else {
        alert("Cập nhập thông tin thất bại");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "http://wp-api.test:8080/wp-content/uploads/2020/08/avatar-96x96.jpg",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  function handleChangeImage() {
    const file = info.file;
    console.log(file);
    const imgUrl = URL.createObjectURL(file);
    setAvtUrl(imgUrl);
  }

  return (
    <>
      <Form
        form={form}
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
        initialValues={{ initialValues }}
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
            <Upload {...props} onChange={handleChangeImage}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Space>
        </Form.Item>

        <Form.Item
          label="Firstname"
          name="first_name"
          initialValue={form.first_name}
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
          <Button type="primary" htmlType="submit">
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Profile;
