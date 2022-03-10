import { createState } from "@agile-ts/core";
import { GlobalNumber, User } from "./interfaces";

export const USERS_STATE = createState<User[]>([]);
export const CONNECTION_STATE = createState<boolean>(false);
export const FILES = createState<string[]>([]);
export const TOKEN = createState('');
export const NUMBERS = createState<[GlobalNumber[], GlobalNumber[], GlobalNumber[]]>([[], [], []]);
export const NUMBERS_RED = createState<GlobalNumber[]>([]);
export const NUMBERS_GREEN = createState<GlobalNumber[]>([]);
export const NUMBERS_BLUE = createState<GlobalNumber[]>([]);
