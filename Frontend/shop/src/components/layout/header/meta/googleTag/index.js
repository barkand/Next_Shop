import tagFunction from "./tagFunction";
import { TagId } from "./tagId";

export default function GoogleTag() {
  return (
    <>
      <script
        async=""
        src={`https://www.googletagmanager.com/gtag/js?id=${TagId}`}
      />
      <script dangerouslySetInnerHTML={{ __html: tagFunction() }} />
    </>
  );
}
