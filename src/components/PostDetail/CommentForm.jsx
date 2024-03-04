import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddChildNewsCommentAsync, actNewsCommentAsync } from "../../store/comment/action";

function CommentForm({ parent = 0 }) {
  console.log(parent);
  const dispatch = useDispatch();
  const [content, setContent] = useState();

  const currenUser = useSelector((state) => state.USER.currenUser);
  // console.log(currenUser);
  const postDetail = useSelector((state) => state.POST.postsDetail);
  // console.log(postDetail);

  function handleSubmit() {
    const data = {
      author: currenUser.id,
      content,
      post: postDetail.id,
      parent: parent,
    };
    if (content === "") {
      alert("Nội dung bình luận không được để trống");
    }

    if (parent === 0) {
      dispatch(actNewsCommentAsync(data));
    } else {
      dispatch(actAddChildNewsCommentAsync(data));
    }
    setContent("");
  }

  function handleChangeValue(e) {
    setContent(e.target.value);
  }

  return (
    <div className="comments__form">
      <div className="comments__form--control">
        <div className="comments__section--avatar">
          <a href="/">
            <img src="/assets/images/avatar1.jpg" alt="" />
          </a>
        </div>
        <textarea onChange={handleChangeValue} value={content} />
      </div>
      <div className="text-right">
        <button className="btn btn-default" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default CommentForm;
