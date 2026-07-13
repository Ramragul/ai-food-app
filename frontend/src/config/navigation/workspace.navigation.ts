import {
  FiHome,
  FiUsers,
  FiHeart,
  FiTarget,
  FiMail,
  FiActivity,
  FiSettings
} from "react-icons/fi";

import type {
    IconType
} from "react-icons";

export interface WorkspaceNavigationItem {

  id: string;

  label: string;

  path: string;

  icon: IconType;

  permissions?: string[];

  subtitle: string;

}

export const workspaceNavigation: WorkspaceNavigationItem[] = [

  {
    id: "dashboard",
    label: "Dashboard",
    path: "/workspace",
    icon: FiHome,
    subtitle: "Manage your organization Dashboard."
  },

  {
    id: "employees",
    label: "Employees",
    path: "/workspace/employees",
    icon: FiUsers,
    subtitle: "Manage your organization employees."
  },

  {
    id: "clients",
    label: "Clients",
    path: "/workspace/clients",
    icon: FiHeart,
    subtitle: "Manage your organization clients."
  },

  {
    id: "assignments",
    label: "Assignments",
    path: "/workspace/assignments",
    icon: FiTarget,
    subtitle: "Manage your organization assignments."
  },

  {
    id: "invitations",
    label: "Invitations",
    path: "/workspace/invitations",
    icon: FiMail,
    subtitle: "Manage your organization invitations."
  },

  {
    id: "coach",
    label: "Coach",
    path: "/workspace/coach",
    icon: FiActivity,
    subtitle: "Manage your organization coach."
  },

  {
    id: "settings",
    label: "Settings",
    path: "/workspace/settings",
    icon: FiSettings,
    subtitle: "Manage your organization settings."
  }

];