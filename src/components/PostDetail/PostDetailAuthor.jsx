import "./post-author.css";

function PostDetailAuthor({ data }) {
  if (!data) {
    return <></>;
  }

  return (
    <div className="post-author">
      <div className="post-author__bg-avatar">
        <a href="/" className="post-author__avatar">
          <img src={data.author_data.avatar} alt="" />
        </a>
      </div>
      <div className="post-author__nickname">
        <a href="/">{data.author_data.nickname}</a>
      </div>
      <p className="post-author__desc">{data.author_data.description}</p>
    </div>
  );
}

export default PostDetailAuthor;
