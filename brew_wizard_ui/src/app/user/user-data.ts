import { UserData } from 'angular2-token'

export interface IUserData extends UserData {
  admin: boolean;
  contact: boolean;
  recipe_reminders: boolean;
}
