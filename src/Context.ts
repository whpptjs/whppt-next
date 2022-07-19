import { createContext, useContext } from 'react';
import { Api } from './Api';
import * as app from './App/Context';
import * as editor from './Editor/Context';
import * as site from './Site/Context';
import * as security from './Security/Context';
import * as page from './Page/Context';
import * as gallery from './Gallery/Context';
import * as imageEditor from './ImageEditor/Context';

export const Whppt = createContext({
  ...editor.Context(editor.defaultArgs),
  ...security.Context(security.defaultArgs),
  ...app.Context(app.defaultArgs),
  ...site.Context(site.defaultArgs),
  ...page.Context(page.defaultArgs),
  ...gallery.Context(gallery.defaultArgs),
  ...imageEditor.Context(imageEditor.defaultArgs),
  api: Api(),
});

Whppt.displayName = 'WhpptContext';

export const useWhppt = () => {
  return useContext(Whppt);
};

export const useWhpptNav: <T>() => {
  nav: T;
  setNav: (nav: T) => void;
} = <T>() => {
  const whppt = useContext(Whppt);
  return {
    nav: whppt.initNav({ ...whppt.nav?.content }),
    setNav: (nav: T) => whppt.setNav({ ...whppt.nav, content: nav }),
  };
};

export const useWhpptFooter: <T>() => {
  footer: T;
  setFooter: (footer: T) => void;
} = <T>() => {
  const whppt = useContext(Whppt);
  return {
    footer: whppt.footer?.content || {},
    setFooter: (footer: T) => whppt.setFooter({ ...whppt.footer, content: footer }),
  };
};
