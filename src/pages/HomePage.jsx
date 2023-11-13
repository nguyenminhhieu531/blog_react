import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ArticleGeneral from "../components/ArticleGeneral";
import ArticleLatest from "../components/ArticleLatest";
import ArticlePopular from "../components/ArticlePopular";
import {
  actPostsGeneralAsync,
  actPostsLatestAsync,
  actPostsPagingAsync,
  actPostsPopularAsync,
} from "../store/post/action";

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actPostsLatestAsync());
    dispatch(actPostsPopularAsync());
    dispatch(actPostsGeneralAsync());
    dispatch(actPostsPagingAsync());
  }, []);

  return (
    <>
      <ArticleLatest />
      <ArticlePopular />
      <ArticleGeneral />
    </>
  );
}

export default HomePage;
