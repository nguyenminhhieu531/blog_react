import "./post-detail.css";
import PostDetailComments from "./PostDetailComments";
import PostDetailRichText from "./PostDetailRichText";
import PostDetailTags from "./PostDetailTags";

function PostDetailContent({ data }) {
  if (!data) {
    return <></>;
  }

  return (
    <div className="post-detail__content">
      <div className="thumbnail">
        <img src={data.featured_media_url} alt="blog-title" />
      </div>
      <div className="content-padding">
        <PostDetailRichText data={data} />

        <PostDetailTags data={data} />

        <PostDetailComments data={data} />
      </div>
    </div>
  );
}

export default PostDetailContent;
