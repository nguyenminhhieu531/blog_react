import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import Notfound from "./pages/Notfound";
import PostDetailPage from "./pages/PostDetailPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import { actCategoriesListAsync } from "./store/category/action";
import { actMainMenuAsync } from "./store/menu/action";
import { actUserFetchMeAsync } from "./store/user/action";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actCategoriesListAsync());
    dispatch(actMainMenuAsync());
    dispatch(actUserFetchMeAsync());
  }, []);

  return (
    <div className="wrapper-content">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
        <Route path="/change-password" element={<ChangePasswordPage></ChangePasswordPage>}></Route>
        <Route path="/post/:slug" element={<PostDetailPage></PostDetailPage>}></Route>
        <Route path="/search" element={<SearchPage></SearchPage>}></Route>
        <Route path="/category/:slug" element={<CategoryPage></CategoryPage>}></Route>
        <Route path="/error" element={<Notfound></Notfound>}></Route>
        <Route path="*" element={<Navigate replace to="/error" />} />
      </Routes>
      <div className="spacing" />
      <Footer />
    </div>
  );
}

export default App;
