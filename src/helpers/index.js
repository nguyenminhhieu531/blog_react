export function mappingPostData(item) {
  return {
    id: item.id,
    title: item.title.rendered,
    desc: item.excerpt.rendered,
    slug: item.slug,
    thumb: item.featured_media_url,
    pubDate: item.date,
    authorInfo: item.author_data,
    categoryId: item.categories,
    view: item.view_count,
  };
}

export function mappingCategoryData(item) {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
  };
}

export function mappingMenuData(item) {
  const dataChildItems = item.child_items || [];

  const childItems = dataChildItems.map(mappingMenuData);

  return {
    id: item.ID,
    title: item.title,
    childItems: childItems,
  };
}
