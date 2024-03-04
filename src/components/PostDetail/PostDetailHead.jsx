import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

export default function PostDetailHead({ data }) {
  if (!data) {
    return <></>;
  }

  dayjs.extend(relativeTime);
  dayjs.locale("vi");

  return (
    <div className="post-detail__head">
      <div className="tcl-container">
        <h1 className="post-detail__title">{data.title.rendered}</h1>
        <ul className="post-detail__info">
          <li className="item author">
            By{" "}
            <a href="/">
              <strong>{data.author_data.nickname}</strong>
            </a>
          </li>
          <li className="item date">{dayjs(data.date).fromNow()}</li>
          <li className="item views">
            2 <i className="icons ion-ios-eye" />
          </li>
          <li className="item comments">
            20 <i className="icons ion-ios-chatbubble" />
          </li>
        </ul>
      </div>
    </div>
  );
}
