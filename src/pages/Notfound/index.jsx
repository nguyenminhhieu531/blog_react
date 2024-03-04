import { ArrowLeftOutlined } from "@ant-design/icons";
import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, bạn không được phép truy cập trang này."
        extra={
          <Link to="/" type="primary">
            <ArrowLeftOutlined /> Trở về trang chủ
          </Link>
        }
      />
    </>
  );
}

export default Notfound;
