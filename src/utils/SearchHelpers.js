// utils/searchHelpers.js
export const performSearch = (searchString, searchData) => {
  if (!searchString) return [];
  const regex = new RegExp(`${searchString}`, "gi");

  return searchData.filter((item) => {
    const { title, description, categories, tags, content } = item.frontmatter;
    return (
      title.toLowerCase().match(regex) ||
      description?.toLowerCase().match(regex) ||
      categories?.join(" ").toLowerCase().match(regex) ||
      tags?.join(" ").toLowerCase().match(regex) ||
      item.content.toLowerCase().match(regex)
    );
  });
};
