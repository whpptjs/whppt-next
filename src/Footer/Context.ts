import { Footer } from "src/Models/Footer";

export const defaultState = {} as Footer;

export type FooterContextArgs = {
  footer: Footer;
  setFooter: (val: Footer) => void;
  initFooter: (val: Footer) => void;
};

export const defaultArgs = {
  footer: {},
  setFooter: () => {},
  initFooter: () => {
    lastModified: new Date();
  },
} as FooterContextArgs;

export const Context = ({
  footer,
  setFooter,
  initFooter,
}: FooterContextArgs) => {
  return {
    footer,
    setFooter,
    initFooter: initFooter || defaultArgs.initFooter,
  };
};
