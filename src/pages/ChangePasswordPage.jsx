import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import { actUserChangePasswordAsync } from "../store/user/action";
import { notification } from "antd";

const schema = yup
  .object({
    password: yup.string().required("Mật khẩu cũ bắt buộc nhập").min(6, "Mật khẩu cũ phải có tối thiếu 6 ký tự"),
    new_password: yup.string().required("Mật khẩu mới bắt buộc nhập").min(6, "Mật khẩu mới phải có tối thiếu 6 ký tự"),
    confirm_new_password: yup
      .string()
      .required("Xác nhận mật khẩu bắt buộc nhập")
      .min(6, "Xác nhận mật khẩu phải có tối thiếu 6 ký tự"),
  })
  .required();

function ChangePasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const form = useForm({ resolver: yupResolver(schema) });

  const { register, handleSubmit, watch, formState } = form;
  const { errors } = formState;
  // console.log(errors);

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

  function onSubmit(data) {
    console.log(data);
    dispatch(actUserChangePasswordAsync(data)).then((res) => {
      if (res.ok) {
        // navigate("/");
        openNotification();
      } else {
        // setFormData("Cập nhập mật khẩu thất bại!");
        openNotificationError();
      }
    });
  }

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Thay đổi mật khẩu</h1>

            {/* Hiển thị errors */}
            {Object.keys(errors).length > 0 &&
              Object.values(errors).map((item, index) => (
                <p key={index} className="form-error">
                  {item.message}
                </p>
              ))}

            {formData && <p className="form-error">{formData}</p>}

            <div className="form-login-register">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="password" placeholder="Mật khẩu cũ ..." register={register("password")} />

                <Input type="password" placeholder="Mật khẩu mới ..." register={register("new_password")} />

                <Input
                  type="password"
                  placeholder="Nhập lại mật khẩu mới ..."
                  register={register("confirm_new_password")}
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large" htmlType="submit">
                    Xác nhận
                  </Button>
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

export default ChangePasswordPage;
