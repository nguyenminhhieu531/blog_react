import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CategoryPage from "./pages/CategoryPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Dashboard from "./pages/Dashboard";
import Changepassword from "./pages/Dashboard/ChangePassword";
import CreatePost from "./pages/Dashboard/CreatePosts";
import Post from "./pages/Dashboard/Post";
import Profile from "./pages/Dashboard/Profile";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import Notfound from "./pages/Notfound";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import { actCategoriesListAsync } from "./store/category/action";
import { actMainMenuAsync } from "./store/menu/action";
import { actUserFetchMeAsync } from "./store/user/action";
// import Logout from "./pages/Dashboard/Logout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actCategoriesListAsync());
    dispatch(actMainMenuAsync());
    dispatch(actUserFetchMeAsync());
  }, []);

  const location = useLocation();
  const {pathname} = location;
  const isDashboard = pathname.includes("/dashboard");
  console.log('isDashboard', isDashboard);

  // Nếu token tồn tại thì mới cho truy cập vào dashboard
  const token = useSelector((state) => state.USER.token);

  return (
    <div className="wrapper-content">
      {!isDashboard && <Header />}
      
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
        <Route path="/change-password" element={<ChangePasswordPage></ChangePasswordPage>}></Route>
        <Route path="/post/:slug" element={<PostDetailPage></PostDetailPage>}></Route>
        <Route path="/search" element={<SearchPage></SearchPage>}></Route>
        <Route path="/category/:slug" element={<CategoryPage></CategoryPage>}></Route>
        {token && 
          <Route element={<Dashboard></Dashboard>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/dashboard/post" element={<Post></Post>}></Route>
          <Route path="/dashboard/create-post" element={<CreatePost></CreatePost>}></Route>
          <Route path="/dashboard/profile" element={<Profile></Profile>}></Route>
          <Route path="/dashboard/change-password" element={<Changepassword></Changepassword>}></Route>
        </Route>}
        
        <Route path="/error" element={<Notfound></Notfound>}></Route>
        <Route path="*" element={<Navigate replace to="/error" />} />
      </Routes>
      {!isDashboard && <>
        <div className="spacing" />
        <Footer />
      </>}
    </div>
  );
}

export default App;
