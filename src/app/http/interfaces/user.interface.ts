export const enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export interface IUser {
  id?: number;
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: number;
  websiteUrl?: string;
  role: UserRole;
}
