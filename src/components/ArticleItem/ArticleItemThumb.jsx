export default function ArticleItemThumb(props) {
  const { thumb } = props;
  return (
    <div className="article-item__thumbnail">
      <a href="/">
        <img src={thumb} alt="assets/images/blog-1.jpg" />
      </a>
    </div>
  );
}
