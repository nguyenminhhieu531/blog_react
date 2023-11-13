import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Notfound() {
  return (
    <>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <strong className="title-404">Không tìm thấy đường dẫn này</strong>
      </section>
      <div className="link-container">
        <Link to="/" className="more-link">
          Trở về trang chủ
        </Link>
      </div>
    </>
  );
}

export default Notfound;
