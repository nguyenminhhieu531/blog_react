import ArticleItemAvatar from "./ArticleItemAvatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

export default function ArticleItemInfo(props) {
  const { isShowAvatar, authorInfo, pubDate } = props;

  dayjs.extend(relativeTime);
  dayjs.locale("vi");
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
          <div className="date">{dayjs(pubDate).fromNow()}</div>
        </div>
      </div>
    </div>
  );
}
