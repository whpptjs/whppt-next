import { User } from "./Model";

export const defaultSiteSettingsState = {
  visible: false,
  activeTab: "general",
};

export type SecurityContextArgs = {
  user: User;
  setUser: (user:User) => void

};

export const defaultArgs = {
  user: { _id: "", name:'', email:'' },
  setUser: () => {}
} as SecurityContextArgs;

export const Context = ({user,setUser}: SecurityContextArgs) => {
console.log("🚀 ~ file: Context.ts ~ line 20 ~ Context ~ user", user)


  return {
    user,setUser
    // toggleSiteSettings: (visible?: boolean) =>
    //   args.setSiteSettings({
    //     ...args.siteSettings,
    //     visible:
    //       typeof visible === "boolean" ? visible : !args.siteSettings.visible,
    //   }),
  };
};
