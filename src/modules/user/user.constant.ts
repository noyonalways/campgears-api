import { TAuthProvider, TUserRole, TUserStatus } from "./user.interface";

export const UserRoles: TUserRole[] = ["super-admin", "admin", "user"];
export const UserStatus: TUserStatus[] = ["active", "inactive", "blocked"];
export const AuthProviders: TAuthProvider[] = ["github", "facebook", "google"];

export const USER_ROLES = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  USER: "user",
} as const;

export const USER_STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
} as const;
