import { createContext, useContext } from "react";

import cultures from "/src/multilingual/cultures";

export const defaultGlobal = {
  catalog: false,
  culture: cultures["en"],
  theme: {
    color: "dark",
    lightBackgroundColor: "white",
    lightColor: "inherit",
  },
};

export const GlobalContext = createContext(defaultGlobal);

export default function UseGlobalContext() {
  return useContext(GlobalContext);
}
