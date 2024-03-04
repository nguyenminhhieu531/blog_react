import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
// import { actUserLoginAsync } from "../store/user/action";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { actUserRegisterAsync } from "../store/user/action";
import { notification } from "antd";

const schema = yup
  .object({
    email: yup.string().required("Email không được để trống").email("Email phải đúng định dạng"),
    username: yup
      .string()
      .required("Username không được để trống")
      .matches(/^([a-z][a-zA-Z0-9_]*)$/g, "Username chỉ cho phép ký tự nhập vào thuộc a-z, 0-9, dấu gạch chân '_' "),
    password: yup.string().required("Password không được để trống").min(6, "Password phải tối thiểu 6 ký tự"),
  })
  .required();

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const form = useForm({ resolver: yupResolver(schema) });

  const { register, handleSubmit, watch, formState } = form;
  const { errors } = formState;
  console.log(errors);

  // Thông báo
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.success({
      message: `Thay đổi mật khẩu thành công`,
    });
  };
  const openNotificationError = (values) => {
    api.error({
      message: values,
    });
  };

  function onSubmit(data) {
    dispatch(actUserRegisterAsync(data)).then((res) => {
      if (res.ok) {
        // navigate("/");
        openNotification();
      } else {
        // setFormData(res.message);
        openNotificationError(res.message);
      }
    });
  }

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng ký</h1>

            <div className="form-login-register">
              {/* Hiển thị errors */}
              {Object.keys(errors).length > 0 &&
                Object.values(errors).map((item, index) => (
                  <p key={index} className="form-error">
                    {item.message}
                  </p>
                ))}

              {formData && <p className="form-error">{formData}</p>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="Bí danh ..." register={register("nickname")} />

                <Input type="text" placeholder="Email đăng ký ..." register={register("email")} />

                <Input placeholder="Tên đăng ký ..." register={register("username")} />

                <Input
                  type="password"
                  placeholder="Mật khẩu đăng ký ..."
                  className="world"
                  register={register("password")}
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large" htmlType="submit">
                    Xác nhận
                  </Button>
                  <Link to="/login">Đăng nhập</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="spacing" />
      {contextHolder}
    </main>
  );
}

export default RegisterPage;
