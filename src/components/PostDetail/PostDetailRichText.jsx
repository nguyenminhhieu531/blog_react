function PostDetailRichText({ data }) {
  if (!data) {
    return <></>;
  }

  return <div className="rte" dangerouslySetInnerHTML={{ __html: data.content.rendered }}></div>;
}

export default PostDetailRichText;
