import { useState } from "react";
import Input from "../shared/Input";
import { useNavigate } from "react-router-dom";

function HeaderSearch() {
  const [keyword, setKeyWord] = useState();
  const navigate = useNavigate();

  function handleChangeValue(e) {
    setKeyWord(e.target.value.trim());
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?keyword=${keyword}`);
  }

  return (
    <div className="tcl-col-4">
      {/* Header Search */}
      <form onSubmit={handleSubmit}>
        <Input
          type="search"
          value={keyword}
          onChange={handleChangeValue}
          placeholder="Nhập giá trị search ..."
          required
        />
      </form>
    </div>
  );
}

export default HeaderSearch;
