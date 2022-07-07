import { Domain } from "src/App/Model";
import { Footer } from "src/Site/Model";

export type FooterActions = {
  load: ({ domain }) => Promise<Footer<any>>;
  save: (args: {
    domain: Domain;
    footer: Footer<any>;
  }) => Promise<Footer<any>>;
};