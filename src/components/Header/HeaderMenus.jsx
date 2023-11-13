import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actUserLogout } from "../../store/user/action";

function renderMenu(item) {
  return (
    <li key={item.id}>
      <Link to={`/category/${item.title}`}>{item.title}</Link>
      {item.childItems.length > 0 && <ul>{item.childItems.map(renderMenu)}</ul>}
    </li>
  );
}

function HeaderMenus() {
  const menus = useSelector((state) => state.MENU.mainMenu);
  const token = useSelector((state) => state.USER.token);
  const currenUser = useSelector((state) => state.USER.currenUser);
  // console.log(currenUser);
  // console.log(token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout
  function handleLogout(e) {
    e.preventDefault();

    dispatch(actUserLogout(token));
    navigate("/");
  }

  return (
    <div className="tcl-col-6">
      {/* Nav */}
      <div className="header-nav">
        <ul className="header-nav__lists">{menus.map(renderMenu)}</ul>
        <ul className="header-nav__lists">
          {!token && (
            <li className="user">
              <a href="#">
                <i className="icons ion-person" /> Tài khoản
              </a>
              <ul>
                <li className="user">
                  <Link to="/login">Đăng nhập</Link>
                </li>
                <li className="user">
                  <Link to="/register">Đăng ký</Link>
                </li>
              </ul>
            </li>
          )}

          {token && (
            <li className="user">
              <a href="#">
                <i className="icons ion-person" />
                {currenUser?.name}
              </a>
              <ul>
                <li className="user">
                  <Link to="/profile">Trang cá nhân</Link>
                </li>
                <li className="user">
                  <Link to="/change-password">Thay đổi mật khẩu</Link>
                </li>
                <li className="user">
                  <Link to="/logout" onClick={handleLogout}>
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenus;
