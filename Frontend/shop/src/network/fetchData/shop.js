import { GetRestApi, PostRestApi } from "/src/network/apiAxios";
import fixImagePath from "/src/network/fetchData/image";

const name = "shop";
const ver = "v1";

const getApi = (path, params) => GetRestApi(`${name}/${ver}/${path}`, params);
const postApi = (path) => PostRestApi(`${name}/${ver}/${path}`);

// Product
export async function getProducts(
  itemsPerPage,
  page,
  sort,
  query,
  details,
  brands,
  prices,
  offprice,
  available,
  category,
  subcategory,
  lang
) {
  let params = {
    sort,
    d: details,
    page: page === 0 ? "" : page,
    perpage: page === 0 ? "" : itemsPerPage,
    q: query,
    brand: brands,
    price: prices,
    offprice,
    available,
    category,
    subcategory,
    lang,
  };
  const { data } = await getApi(`products`, params);

  data["products"].map((product) => {
    fixImagePath("products", product);
  });

  return data;
}

export async function getNewProducts() {
  const { data } = await getApi(`newproducts`, {});

  data.map((product) => {
    fixImagePath("products", product);
  });

  return data;
}

export async function getSuggestProducts(subcategoryid) {
  const { data } = await getApi(`suggestproducts/${subcategoryid}`, {});

  data.map((product) => {
    fixImagePath("products", product);
  });

  return data;
}

export async function getRecommendProducts(productids) {
  const { data } = await getApi(`recommendproducts/${productids}`, {});

  data.map((product) => {
    fixImagePath("products", product);
  });

  return data;
}

export async function getProduct(productid) {
  const { data } = await getApi(`product/${productid}`, {});

  fixImagePath("products", data);

  return data;
}

// Favorite
export async function getFavorites() {
  const { data } = await getApi(`favorites`, {});

  data.map((product) => {
    fixImagePath("products", product);
  });

  return data;
}

export async function checkFavorite(productId) {
  const { data } = await getApi(`favorite/check/${productId}`, {});
  return data;
}

export async function addToFavorite(productId, flag) {
  await postApi(`favorite/add/${productId}/${flag}`);
}

// Cart
export async function getCarts(productIds) {
  if (productIds === undefined) productIds = 0;
  const { data } = await getApi(`cart/${productIds}`, {});

  data.map((product) => {
    fixImagePath("products", product);
  });

  return data;
}

export async function addCart(productId, price) {
  try {
    await postApi(`cart/add/${productId}/${price}`);
  } catch (error) {}
}

export async function removeCart(productId) {
  try {
    await postApi(`cart/remove/${productId}`);
  } catch (error) {}
}

export async function removeAllCart(productId) {
  try {
    await postApi(`cart/delete/${productId}`);
  } catch (error) {}
}

// Product Reviews
export async function getProductReviews(productId) {
  const { data } = await getApi(`productreviews/${productId}`, {});
  data.map((review) => {
    if (review.image !== "" && data.image !== null) {
      fixImagePath("reviews", review);
    }
  });
  return data;
}

export async function addProductReview(productId, rating, title, description) {
  await postApi(
    `productreview/add/${productId}/${rating}/${title}/${description}`
  );
}

// Product Details
export async function getProductDetails(productId) {
  const { data } = await getApi(`productdetail/${productId}`, {});
  return data;
}

export async function getDynamicProductDetails(productId) {
  const { data } = await getApi(`dproductdetail/${productId}`, {});
  return data;
}

// Product About
export async function getProductAbout(productId) {
  const { data } = await getApi(`productabout/${productId}`, {});
  return data;
}

// Categories
export async function getCategories() {
  const { data } = await getApi(`categories`, {});

  data.map((category) => {
    fixImagePath("categories", category);
  });

  return data;
}

// Orders
export async function getOrders() {
  const { data } = await getApi(`orders`, {});

  data.map((order) => {
    order.products.map((product) => {
      fixImagePath("products", product);
    });
  });

  return data;
}
