import Head from "next/head";

import GoogleTag from "./googleTag";

export default function Meta() {
  return (
    <>
      <Head>
        <title>Next Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ai on shop" />
        <link rel="icon" href="/favicon.ico" />

        <GoogleTag />
      </Head>
    </>
  );
}
