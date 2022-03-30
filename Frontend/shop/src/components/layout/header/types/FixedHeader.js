import AppBarComponent from "/src/components/layout/header/types/AppBar";

export default function FixedHeader(props) {
  return (
    <>
      <AppBarComponent
        position="fixed"
        toggleTheme={props.toggleTheme}
        toggleLang={props.toggleLang}
      />

      <div style={{ marginTop: "70px" }} />
    </>
  );
}
