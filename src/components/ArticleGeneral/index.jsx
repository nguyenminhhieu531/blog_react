import { usePostPaging } from "../../hooks/usePostPaging";
import ArticleItem from "../ArticleItem";
import MainTitle from "../shared/MainTitle";

function ArticleGeneral() {
  const { posts, renderButtonLoadMore } = usePostPaging();

  let postsGeneral = posts.map((item) => {
    return (
      <div key={item.id} className="tcl-col-12 tcl-col-md-6">
        <ArticleItem data={item} isStyleCard isShowAvatar={false} />
      </div>
    );
  });

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle btnLabel="Xem thêm">Bài viết tổng hợp</MainTitle>

        <div className="tcl-row">{postsGeneral}</div>

        {renderButtonLoadMore()}
      </div>
    </div>
  );
}

export default ArticleGeneral;
