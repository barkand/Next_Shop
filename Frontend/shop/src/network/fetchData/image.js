const imagesPath = {
  users: "users",
  reviews: "users",
  products: "products",
  articles: "blog",
  categories: "products/categories",
};

const itemId = (cat, item) => {
  switch (cat) {
    case "categories":
      return item.slug;
    case "reviews":
      return item.userid;
    default:
      return item.id;
  }
};

export default function fixImagePath(cat, item) {
  item.image = `/media/${imagesPath[cat]}/${itemId(cat, item)}.jpg`;
  return item;
}
