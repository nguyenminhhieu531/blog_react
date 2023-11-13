import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actPostsPagingAsync } from "../store/post/action";
import Button from "../components/shared/Button";

export function usePostPaging(extraParams = {}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { list: posts } = useSelector((state) => state.POST.postsPaging);
  const currentPage = useSelector((state) => state.POST.postsPaging.currentPage);
  const totalPage = useSelector((state) => state.POST.postsPaging.totalPage);
  const total = useSelector((state) => state.POST.postsPaging.total);

  // ẩn hiện tải thêm
  const hasLoadMore = currentPage < totalPage;
  function handleClickLoadMore() {
    setLoading(true);
    dispatch(actPostsPagingAsync({ page: currentPage + 1, ...extraParams })).then(() => {
      setLoading(false);
    });
  }

  function renderButtonLoadMore() {
    return (
      hasLoadMore && (
        <div className="text-center">
          <Button type="primary" size="large" disabled={loading} loading={loading} onClick={handleClickLoadMore}>
            Tải thêm
          </Button>
        </div>
      )
    );
  }

  return {
    posts,
    totalPage,
    total,
    renderButtonLoadMore,
  };
}
