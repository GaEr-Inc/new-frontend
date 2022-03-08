export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  numbers: UserNumbers;
  maxRandomNumbers: {
    red: number;
    green: number;
    blue: number;
  };
}

export interface UserNumbers {
  red: { asignedNumbers: number[]; randomNumbers: number[] };
  green: { asignedNumbers: number[]; randomNumbers: number[] };
  blue: { asignedNumbers: number[]; randomNumbers: number[] };
}

export interface GlobalNumber {
  id: string;
  textNumber: string;
  number: number;
}