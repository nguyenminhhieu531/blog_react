import ArticleItemAvatar from "./ArticleItemAvatar";

export default function ArticleItemInfo(props) {
  const { isShowAvatar, authorInfo, pubDate } = props;
  return (
    <div className="article-item__info">
      {isShowAvatar && <ArticleItemAvatar avatar={authorInfo.avatar} />}
      <div className="article-item__info-right">
        <div className="article-item__author-name">
          <a href="/">
            <strong>{authorInfo.nickname}</strong>
          </a>
        </div>
        <div className="article-item__datetime">
          <div className="date">{pubDate}</div>
        </div>
      </div>
    </div>
  );
}
