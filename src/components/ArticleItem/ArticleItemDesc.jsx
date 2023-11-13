export default function ArticleItemDesc(props) {
  const { desc } = props;

  // let strDesc = desc.replace("<p>", "");
  // strDesc = strDesc.replace("</p>", "");

  return <p className="article-item__desc" dangerouslySetInnerHTML={{ __html: desc }}></p>;
}
