// import StaticHeader from "./types/StaticHeader";
// import FixedHeader from "./types/FixedHeader";
// import HideHeader from "./types/HideHeader";
import ElevateHeader from "/src/components/layout/header/types/ElevateHeader";

function Header(props) {
  const { toggleTheme, toggleLang, lang } = props;

  return (
    <span className={lang}>
      {/* <StaticHeader toggleTheme={toggleTheme} toggleLang={toggleLang} /> */}
      {/* <FixedHeader toggleTheme={toggleTheme} toggleLang={toggleLang} /> */}
      <ElevateHeader toggleTheme={toggleTheme} toggleLang={toggleLang} />
      {/* <HideHeader toggleTheme={toggleTheme} toggleLang={toggleLang} /> */}
    </span>
  );
}

export default Header;
