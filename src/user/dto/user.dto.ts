import { isNumber, isString } from "class-validator";

export class UserDto {
  email: string;

  name: string;

  lastName: string;

  age: number;
}
