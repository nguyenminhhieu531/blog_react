import cls from "classnames";
import ArticleItemCategories from "./ArticleItemCategories";
import ArticleItemDesc from "./ArticleItemDesc";
import ArticleItemInfo from "./ArticleItemInfo";
import ArticleItemStats from "./ArticleItemStats";
import ArticleItemThumb from "./ArticleItemThumb";
import ArticleItemTitle from "./ArticleItemTitle";
import "./article-item.css";

export default function ArticleItem({
  isStyleRow = false,
  isStyleCard = false,
  isShowDesc = false,
  isShowCategoies = false,
  isShowAvatar = true,
  data,
}) {
  if (!data) {
    return <></>;
  }

  const { thumb, title, pubDate, authorInfo, desc, categoryId, slug, view } = data;

  const classes = cls("article-item", {
    "style-card": isStyleCard,
    "style-row": isStyleRow,
  });

  return (
    <article className={classes}>
      <ArticleItemThumb thumb={thumb} />
      <div className="article-item__content">
        {isShowCategoies && <ArticleItemCategories categoryId={categoryId} />}
        {isShowCategoies && <ArticleItemStats view={view} />}

        <ArticleItemTitle title={title} slug={slug} />

        {isShowDesc && <ArticleItemDesc desc={desc} />}

        <ArticleItemInfo isShowAvatar={isShowAvatar} authorInfo={authorInfo} pubDate={pubDate} />
      </div>
    </article>
  );
}
