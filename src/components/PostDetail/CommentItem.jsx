import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actChildCommentAsync, actPagingCommentAsync } from "../../store/comment/action";
import CommentForm from "./CommentForm";

function CommentItem({ data }) {
  const dispatch = useDispatch();

  const [isShowCommentForm, setIsShowCommentForm] = useState(false);

  const { id, comment_reply_count: commentReplyCount, parent } = data;

  const dataChildComment = useSelector((state) => state.COMMENT.childComment);

  // const commentFilter = dataChildComment.filter((item) => item.parent === id);
  // console.log(commentFilter);

  const commentFilter = dataChildComment[id] || {};

  const { list: listChildCommentFilter, currentPage } = commentFilter;
  const listCommentLength = listChildCommentFilter ? listChildCommentFilter.length : 0;
  const restCommentReplyCount = commentReplyCount - listCommentLength;

  function handleClickLoadMoreReply(e) {
    e.preventDefault();
    dispatch(actPagingCommentAsync({ parent: id, per_page: 4, page: currentPage ? currentPage + 1 : 1 }));
  }

  function handleToggle() {
    setIsShowCommentForm(!isShowCommentForm);
  }

  return (
    <li className="item" parent={id}>
      <div className="comments__section">
        <div className="comments__section--avatar">
          <a href="/">
            <img src="/assets/images/avatar2.jpg" alt="" />
          </a>
        </div>
        <div className="comments__section--content">
          <a href="/" className="comments__section--user">
            {data.author_name}
          </a>
          <p className="comments__section--time">{data.date}</p>
          <div className="comments__section--text" dangerouslySetInnerHTML={{ __html: data.content.rendered }}></div>
        </div>
        {parent === 0 && <i className="icons ion-ios-undo" onClick={handleToggle} />}
      </div>
      {isShowCommentForm && <CommentForm parent={id}></CommentForm>}

      {listCommentLength > 0 &&
        listChildCommentFilter.map((item) => {
          return (
            <ul className="comments" key={item.id}>
              <li className="item">
                <div className="comments__section">
                  <div className="comments__section--avatar">
                    <a href="/">
                      <img src="/assets/images/avatar3.jpg" alt="" />
                    </a>
                  </div>
                  <div className="comments__section--content">
                    <a href="/" className="comments__section--user">
                      {item.author_name}
                    </a>
                    <p className="comments__section--time">{item.date}</p>
                    <div
                      className="comments__section--text"
                      dangerouslySetInnerHTML={{ __html: item.content.rendered }}
                    ></div>
                  </div>
                </div>
              </li>
            </ul>
          );
        })}
      {restCommentReplyCount > 0 && (
        <div className="comments__hidden">
          <a href="/" onClick={handleClickLoadMoreReply}>
            <i className="icons ion-ios-undo" /> Xem thêm {restCommentReplyCount} câu trả lời
          </a>
        </div>
      )}
    </li>
  );
}

export default CommentItem;
