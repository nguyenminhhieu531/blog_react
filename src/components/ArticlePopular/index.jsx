import { useSelector } from "react-redux";
import ArticleItem from "../ArticleItem";
import "./popular-news-list.css";

function ArticlePopular() {
  const posts = useSelector((state) => state.POST.postsPopular);
  console.log(posts);

  return (
    <div className="popular-news section bg-white-blue">
      <div className="tcl-container">
        {/* Main Title */}
        <div className="main-title spacing d-flex tcl-jc-between tcl-ais-center">
          <h2>Bài viết phổ biến</h2>
          <a href="/" className="btn btn-default">
            Xem thêm
          </a>
        </div>
        {/* End Main Title */}
        <div className="popular-news__list spacing">
          <div className="popular-news__list--left">
            <div className="popular-news__list--row">
              {/* Popular news card */}
              <div className="popular-news__list--card">
                <ArticleItem data={posts[0]} isStyleCard isShowCategoies isShowDesc />
              </div>
              {/* End Popular news card */}
              {/* Popular news card */}
              <div className="popular-news__list--card">
                <ArticleItem data={posts[1]} isStyleCard isShowCategoies isShowDesc />
              </div>
              {/* End Popular news card */}
            </div>
          </div>
          <div className="popular-news__list--right">
            <div className="popular-news__list--row">
              {/* Popular news card */}
              <div className="popular-news__list--card">
                <ArticleItem data={posts[2]} isStyleCard isStyleRow isShowDesc />
              </div>
              {/* End Popular news card */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePopular;
