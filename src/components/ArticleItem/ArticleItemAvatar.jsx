export default function ArticleItemAvatar(props) {
  const { avatar } = props;
  return (
    <div className="article-item__author-image">
      <a aria-label="John Doe" href="/">
        <img src={avatar ? avatar : "/assets/images/john-doe.png"} alt="john-doe" />
      </a>
    </div>
  );
}
