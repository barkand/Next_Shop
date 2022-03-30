import { TagId } from "./tagId";

const tagFunction = () => {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${TagId}');
  `;
};

export default tagFunction;
