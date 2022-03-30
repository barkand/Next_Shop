import ErrorBoundary from "/src/functions/errorBoundary";
import TopSlider from "/src/components/layout/base/sections/TopSlider";
import TopGroups from "/src/components/layout/base/sections/TopGroups";
import TopArticles from "/src/components/blog/sections/TopArticles";
import TopProducts from "/src/components/shop/sections/TopProducts";

export default function Home() {
  return (
    <ErrorBoundary>
      <TopSlider />
      <TopProducts />
      <TopGroups />
      <TopArticles />
    </ErrorBoundary>
  );
}
