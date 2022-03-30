import { GetRestApi } from "/src/network/apiAxios";
import fixImagePath from "/src/network/fetchData/image";

const name = "blog";
const ver = "v1";

const getApi = (path, params) => GetRestApi(`${name}/${ver}/${path}`, params);

// Articles
export async function getArticles() {
  const { data } = await getApi(`articles`, {});

  data.map((article) => {
    fixImagePath(`articles`, article);
  });

  return data;
}

export async function getArticle(id) {
  const { data } = await getApi(`article/${id}`, {});

  fixImagePath("articles", data);

  return data;
}

export async function getNewArticles() {
  const { data } = await getApi(`newarticles`, {});

  data.map((article) => {
    fixImagePath("articles", article);
  });

  return data;
}
