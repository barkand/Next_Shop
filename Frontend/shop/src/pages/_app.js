import Layout from "/src/components/layout";
import ReduxProvider from "/src/redux/provider";

import "/src/styles/global.scss";
import "/src/styles/locales.scss";
import "/src/styles/image.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}

export default MyApp;
