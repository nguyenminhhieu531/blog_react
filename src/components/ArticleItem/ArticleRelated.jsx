import { Link } from "react-router-dom";
import "./related-posts.css";

function ArticleRelated(props) {
  const data = props.data;
  const { slug, title, pubDate, authorInfo } = data;
  console.log(slug);
  return (
    <article className="related-post__card">
      <Link to={`/post/${slug}`} className="related-post__title">
        {title}
      </Link>
      <div className="related-post__info">
        <a className="related-post__author" href="#">
          {authorInfo.nickname}
        </a>
        <p className="related-post__date">{pubDate}</p>
      </div>
    </article>
  );
}

export default ArticleRelated;
