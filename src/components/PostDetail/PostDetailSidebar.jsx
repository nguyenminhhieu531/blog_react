import PostDetailAuthor from "./PostDetailAuthor";
import PostDetailRelatedPosts from "./PostDetailRelatedPosts";

function PostDetailSidebar({ data }) {
  if (!data) {
    return <></>;
  }
  return (
    <div className="post-detail__side">
      <PostDetailAuthor data={data} />
      <div className="spacing" />
      <PostDetailRelatedPosts data={data} />
    </div>
  );
}

export default PostDetailSidebar;
