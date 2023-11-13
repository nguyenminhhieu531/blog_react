import "./input.css";
import cls from "classnames";
import { useState } from "react";
import IconSearch from "../IconSearch";

function Input({ label, type = "text", className, icon = <IconSearch />, register = {}, ...restProps }) {
  const [localType, setLocalType] = useState(type);

  function handleToggleShowPwd() {
    if (localType === "password") {
      setLocalType("text");
    } else if (localType === "text") {
      setLocalType("password");
    }
  }

  const classesIconPwd = cls("toggle-password", {
    "ion-eye": localType === "password",
    "ion-eye-disabled": localType === "text",
  });
  const classesSearch = cls("input-search__input", className);

  if (type === "search") {
    return (
      <div className="input-search">
        {icon}
        <input className={classesSearch} type={localType} {...register} {...restProps} />
      </div>
    );
  }

  return (
    <div className="form-control">
      {label && <label>{label}</label>}
      {type === "password" && <i className={classesIconPwd} onClick={handleToggleShowPwd}></i>}
      <input type={localType} {...register} className={className} {...restProps} />
    </div>
  );
}

export default Input;
