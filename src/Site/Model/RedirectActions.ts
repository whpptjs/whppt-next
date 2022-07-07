import { Redirect } from "src/Site/Model";

export type RedirectActions = {
  load: (args: {
    page: string | number;
    size: string | number;
    domainId: string;
    search?: string;
  }) => Promise<{redirects: Redirect[], total: number}>;
  save: (redirect: Redirect) => Promise<{redirect: Redirect}>
};