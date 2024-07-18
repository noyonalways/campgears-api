import { TUserRole, TUserStatus } from "./user.interface";

export const UserRoles: TUserRole[] = ["admin", "user"];
export const UserStatus: TUserStatus[] = ["active", "inactive", "blocked"];

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export const USER_STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
} as const;
