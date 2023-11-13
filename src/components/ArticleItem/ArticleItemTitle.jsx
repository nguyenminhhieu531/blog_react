import { Link, useLocation } from "react-router-dom";

export default function ArticleItemTitle(props) {
  let { slug, title } = props;

  let location = useLocation();
  let urlParams = new URLSearchParams(location.search);
  let keyword = urlParams.get("keyword");

  if (keyword) {
    const re = new RegExp(keyword, "igm");
    title = title.replace(re, (mark) => `<mark>${mark}</mark>`);
  }

  return (
    <h2 className="article-item__title">
      <Link to={`/post/${slug}`} dangerouslySetInnerHTML={{ __html: title }}></Link>
    </h2>
  );
}
