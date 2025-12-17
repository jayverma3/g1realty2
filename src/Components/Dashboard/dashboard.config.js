import Profile from "./Profile";
import Orders from "./Orders";
import Security from "./Security";
import Settings from "./Settings";

export const dashboardModules = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "🏠",
    component: "HOME",
  },
  {
    key: "profile",
    label: "Profile",
    icon: "👤",
    component: Profile,
  },
  {
    key: "orders",
    label: "Orders",
    icon: "📦",
    component: Orders,
  },
  {
    key: "security",
    label: "Security",
    icon: "🔒",
    component: Security,
  },
  {
    key: "settings",
    label: "Settings",
    icon: "⚙️",
    component: Settings,
  },
];
