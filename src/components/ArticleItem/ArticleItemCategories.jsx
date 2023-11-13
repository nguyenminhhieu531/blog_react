import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function ArticleItemCategories(props) {
  const { categoryId } = props;
  const categories = useSelector((state) => state.CATEGORY.categories);

  let location = useLocation();
  let urlParams = new URLSearchParams(location.search);
  let keyword = urlParams.get("keyword");

  return (
    <ul className="article-item__categories">
      {categories.length > 0 &&
        categoryId.map((categoryIdItem) => {
          let category = categories.find((item) => item.id === categoryIdItem);
          let categoryName = category.name;
          if (keyword) {
            const re = new RegExp(keyword, "igm");
            categoryName = categoryName.replace(re, (mark) => `<mark>${mark}</mark>`);
          }
          return (
            <li key={category.id}>
              <Link
                to={`/category/${category.slug}`}
                className="btn btn-category"
                dangerouslySetInnerHTML={{ __html: categoryName }}
              ></Link>
            </li>
          );
        })}
    </ul>
  );
}
