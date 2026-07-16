import {
  FiHome,
  FiUsers,
  FiTarget,
  FiFileText,
  FiBarChart2,
  FiUser
} from "react-icons/fi";

import type {
  IconType
} from "react-icons";

export interface StaffNavigationItem {

  id: string;

  label: string;

  path: string;

  icon: IconType;

  subtitle: string;

}

export const staffNavigation: StaffNavigationItem[] = [

  {

    id: "dashboard",

    label: "Dashboard",

    path: "/staff",

    icon: FiHome,

    subtitle:
      "Overview"

  },

  {

    id: "clients",

    label: "My Clients",

    path: "/staff/clients",

    icon: FiUsers,

    subtitle:
      "Assigned clients"

  },

  {

    id: "goals",

    label: "Goals",

    path: "/staff/goals",

    icon: FiTarget,

    subtitle:
      "Manage goals"

  },

  {

    id: "notes",

    label: "Notes",

    path: "/staff/notes",

    icon: FiFileText,

    subtitle:
      "Coach notes"

  },

  {

    id: "reports",

    label: "Reports",

    path: "/staff/reports",

    icon: FiBarChart2,

    subtitle:
      "Analytics"

  },

  {

    id: "profile",

    label: "Profile",

    path: "/staff/profile",

    icon: FiUser,

    subtitle:
      "My profile"

  }

];