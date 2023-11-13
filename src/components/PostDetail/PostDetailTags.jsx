import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { actPostsTagAsync } from "../../store/post/action";

function PostDetailTags({ data }) {
  if (!data) {
    return <></>;
  }
  // const categories = useSelector((state) => state.CATEGORY.categories);
  // let filterCategory = null;
  // filterCategory = categories.filter((item) => item.name !== "Chưa được phân loại");
  // filterCategory = filterCategory.filter((item) => item.name !== "Thời trang");

  let params = useParams();
  const { slug } = params;

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.POST.postsTag.list);

  useEffect(() => {
    dispatch(actPostsTagAsync(slug));
  }, [slug]);

  return (
    <div className="post-detail__tags">
      <h2>Tags</h2>
      <ul>
        {posts.map((item) => {
          return (
            <li className="item" key={item.id}>
              <Link to={`/category/${item.slug}`} className="btn btn-default">
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PostDetailTags;
