import { Html, Head, Main, NextScript } from "next/document";
import { FULLCOUNT_ASSETS_PATH } from "../src/constants";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="robots"
          content={process.env.NEXT_PUBLIC_BUILD_TARGET == "alpha" ? "noindex" : "all"}
        />
        <link rel="prefetch" href={`${FULLCOUNT_ASSETS_PATH}/bi-banner.png`} as="image" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Pangolin&display=swap"
          rel="stylesheet"
        />

        <link href="https://fonts.googleapis.com/css?family=Space Grotesk" rel="stylesheet" />
        <link
          rel="stylesheet"
          media="screen"
          href="https://fontlibrary.org//face/segment7"
          type="text/css"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/cascadia-code" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
