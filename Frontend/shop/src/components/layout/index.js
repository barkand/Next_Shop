import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Meta from "/src/components/layout/header/meta";
import Header from "/src/components/layout/header";
import Footer from "/src/components/layout/footer";
import ScrollTopButton from "/src/components/layout/base/toys/scrollTop";

import Template from "/src/theme";
import Language from "/src/multilingual";
import UseGlobalContext, { GlobalContext } from "/src/context/global";

function Layout({ children }) {
  const globalContext = UseGlobalContext();
  let { culture, toggleLang } = Language();
  let { theme, muiTheme, toggleTheme } = Template();

  return (
    <>
      <GlobalContext.Provider
        value={{
          catalog: globalContext.catalog,
          culture: globalContext.culture,
          theme: theme,
        }}
      >
        <Meta />
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Header
            toggleTheme={toggleTheme}
            toggleLang={toggleLang}
            lang={culture.language}
          />

          <div style={{ minHeight: "80vh" }}>
            <ScrollTopButton>
              <main
                dir={culture.direction}
                style={{ minHeight: "10vh" }}
                className={culture.language}
              >
                {children}
              </main>
            </ScrollTopButton>
          </div>
          <Footer lang={culture.language} />
        </ThemeProvider>
      </GlobalContext.Provider>
    </>
  );
}

export default Layout;
