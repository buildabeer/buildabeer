import { UserData } from 'angular-token'

export interface IUserData extends UserData {
  admin: boolean;
  contact: boolean;
  recipe_reminders: boolean;
}
