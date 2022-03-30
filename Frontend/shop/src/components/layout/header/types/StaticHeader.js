import AppBarComponent from "/src/components/layout/header/types/AppBar";

export default function StaticHeader(props) {
  return (
    <>
      <AppBarComponent
        position="static"
        toggleTheme={props.toggleTheme}
        toggleLang={props.toggleLang}
      />

      <div style={{ marginTop: "20px" }} />
    </>
  );
}
