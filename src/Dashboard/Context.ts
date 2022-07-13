export type DashboardState = {
  visible: boolean;
  activeTab: string;
};

export const defaulDashboardState = {
  visible: false,
  activeTab: "users",
};

export type DashboardContextArgs = {
  dashboard: DashboardState;
  setDashboard: (val: DashboardState) => void;
};

export const defaultArgs = {
  dashboard: defaulDashboardState,
  setDashboard: () => { },
}  as DashboardContextArgs;

export const Context = ({ dashboard, setDashboard }: DashboardContextArgs) => {
  return {
    dashboard,
    setDashboard,
    toggleDashboard: (visible?:boolean) => {
      setDashboard({ ...dashboard, visible: typeof visible=== 'boolean' ? visible : !dashboard.visible });
    },
    changeDashboardActiveTab: (activeTab: string) => setDashboard({ ...dashboard, activeTab }),
  };
};
