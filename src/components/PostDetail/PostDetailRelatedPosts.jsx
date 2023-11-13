import { useSelector } from "react-redux";
import ArticleRelated from "../ArticleItem/ArticleRelated";

function PostDetailRelatedPosts({ data }) {
  if (!data) {
    return <></>;
  }

  const posts = useSelector((state) => state.POST.postsAll);
  console.log(posts);

  let fetchPosts = posts.map((item, index) => {
    return <ArticleRelated key={index} data={item} />;
  });

  return (
    <div className="related-post">
      <h2 className="related-post__head">Related Posts</h2>
      {fetchPosts}
    </div>
  );
}

export default PostDetailRelatedPosts;
