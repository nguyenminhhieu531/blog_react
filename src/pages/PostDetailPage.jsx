import { useParams } from "react-router-dom";
import PostDetailContent from "../components/PostDetail/PostDetailContent";
import PostDetailHead from "../components/PostDetail/PostDetailHead";
import PostDetailSidebar from "../components/PostDetail/PostDetailSidebar";
import { useEffect } from "react";
import { actPostsAllAsync, actPostsDetailAsync } from "../store/post/action";
import { useDispatch, useSelector } from "react-redux";

function PostDetailPage() {
  let params = useParams();
  // console.log(params);
  const { slug } = params;
  // console.log(slug);
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.POST.postsDetail);

  useEffect(() => {
    dispatch(actPostsDetailAsync(slug));
    dispatch(actPostsAllAsync());
  }, [slug]);

  return (
    <main className="post-detail">
      <div className="spacing" />
      <PostDetailHead data={posts}></PostDetailHead>;
      <div className="spacing" />
      <div className="post-detail__fluid">
        <div className="tcl-container">
          <div className="post-detail__wrapper">
            <PostDetailContent data={posts} />
            <PostDetailSidebar data={posts} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostDetailPage;
