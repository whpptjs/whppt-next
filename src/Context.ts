import { createContext, useContext } from "react";
import { Api } from "./Api";
import * as app from "./App/Context";
import * as editor from "./Editor/Context";
import * as page from "./Page/Context";
import * as footer from "./Footer/Context";
import * as site from "./Site/Context";

export const Whppt = createContext({
  ...app.Context(app.defaultArgs),
  ...editor.Context(editor.defaultArgs),
  ...page.Context(page.defaultArgs),
  ...footer.Context(footer.defaultArgs),
  ...site.Context(site.defaultArgs),
  api: Api(),
});
Whppt.displayName = "WhpptContext";

export const useWhppt = () => {
  return useContext(Whppt);
};

export const useWhpptFooter: <T>() => {
  footer: T;
  setFooter: (footer: T) => void;
} = <T>() => {
  const { footer, setFooter } = useContext(Whppt);
  const tFooter = footer as T;
  return { footer: tFooter, setFooter: setFooter };
};
