import { notification } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import { actUserLoginAsync } from "../../store/user/action";
import "./login.css";

function LoginPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState("");
  const form = useForm();

  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState } = form;
  const { errors } = formState;
  // console.log(register);
  // console.log(handleSubmit);
  // console.log(watch("username")); // onChange value
  // console.log(watch("password")); // onChange value
  // console.log(errors);
  // console.log("Object.values(errors)", Object.values(errors));
  // console.log("Object.keys(errors)", Object.keys(errors));

  // Thông báo
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.success({
      message: `Đăng nhập thành công`,
    });
  };
  const openNotificationError = () => {
    api.error({
      message: `Đăng nhập thất bại`,
    });
  };

  function onSubmit(data) {
    dispatch(actUserLoginAsync(data)).then((res) => {
      if (res.ok) {
        // navigate("/");
        openNotification();
      } else {
        // setFormData("Thông tin đăng nhập không đúng, xin vui lòng nhập lại!");
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
            <h1 className="form-title text-center">Đăng nhập</h1>
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
                <div>
                  <Input
                    name="username"
                    placeholder="Tên đăng nhập ..."
                    register={register("username", {
                      required: "Tên đăng nhập không được để trống",
                      maxLength: {
                        value: 6,
                        message: "Tên đăng nhập tối đa 6 ký tự",
                      },
                    })}
                  />
                  {/* {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>} */}
                </div>

                <div>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Mật khẩu ..."
                    className="world"
                    register={register("password", {
                      required: "Mật khẩu không được để trống",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu tối thiểu 6 ký tự",
                      },
                    })}
                  />
                  {/* {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>} */}
                </div>

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large" htmlType="submit">
                    Xác nhận
                  </Button>
                  <Link to="/register">Đăng ký</Link>
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

export default LoginPage;
