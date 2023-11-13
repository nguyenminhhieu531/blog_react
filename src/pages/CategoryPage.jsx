import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleItem from "../components/ArticleItem";
import Button from "../components/shared/Button";
import { actPostsCategoryAsync } from "../store/post/action";

function CategoryPage() {
  let params = useParams();
  // console.log(params);
  const { slug } = params;
  // console.log(slug);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const posts = useSelector((state) => state.POST.postsCategory.list);
  console.log(posts);
  const currentPage = useSelector((state) => state.POST.postsCategory.currentPage);
  const totalPage = useSelector((state) => state.POST.postsCategory.totalPage);

  // ẩn hiện tải thêm
  const hasLoadMore = currentPage < totalPage;

  function handleClickLoadMore() {
    setLoading(true);
    dispatch(actPostsCategoryAsync(slug, currentPage + 1)).then(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    dispatch(actPostsCategoryAsync(slug));
  }, [slug]);

  let fetchPosts = posts.map((item) => {
    return (
      <div key={item.id} className="tcl-col-12 tcl-col-md-8">
        <ArticleItem data={item} isStyleCard isShowCategoies />
      </div>
    );
  });

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <div className="main-title main-title__search spacing">
          <h2>
            {totalPage} bài viết cho kết quả "{slug}"
          </h2>
        </div>
        <div className="tcl-row tcl-jc-center">{fetchPosts}</div>

        {hasLoadMore && (
          <div className="text-center">
            <Button type="primary" size="large" disabled={loading} loading={loading} onClick={handleClickLoadMore}>
              Tải thêm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
