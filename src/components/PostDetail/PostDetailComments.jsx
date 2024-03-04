import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actPagingCommentAsync } from "../../store/comment/action";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import "./comments.css";

function PostDetailComments() {
  const dispatch = useDispatch();

  const dataComment = useSelector((state) => state.COMMENT.parentComment.list);
  // console.log(dataComment);
  const total = useSelector((state) => state.COMMENT.parentComment.total);
  // console.log(total);
  const currentPage = useSelector((state) => state.COMMENT.parentComment.currentPage);
  // console.log(currentPage);
  const postDetail = useSelector((state) => state.POST.postsDetail);
  // console.log(postDetail);

  // So luong bai viet sau khi click xem them
  const commentCount = dataComment.length;
  const resComment = total - commentCount;
  // console.log(resComment);

  let fetchPosts = dataComment.map((item) => {
    return <CommentItem data={item} key={item.id}></CommentItem>;
  });

  const currenUser = useSelector((state) => state.USER.currenUser);

  function handleLoadMore(e) {
    e.preventDefault();
    dispatch(actPagingCommentAsync({ post: postDetail.id, page: currentPage + 1 }));
  }

  return (
    <div className="post-detail__comments">
      {currenUser && <CommentForm></CommentForm>}
      {!currenUser && (
        <p>
          Vui lòng <Link to="/login">đăng nhập</Link> để bình luận!
        </p>
      )}

      <p>{total} Bình luận</p>
      <ul className="comments">{fetchPosts}</ul>
      {resComment > 0 && (
        <div className="comments__hidden parent">
          <a href="/" onClick={handleLoadMore}>
            <i className=" ion-android-arrow-dropdown" /> Xem thêm {resComment} bình luận
          </a>
        </div>
      )}
    </div>
  );
}

export default PostDetailComments;
