export const version: string;
export const startedAt: number;

interface optionType {
  clearOnStart?: boolean;
  filename?: string;
}

interface readOptionType {
  table?: string;
}

type data = boolean | string | number | object | any[];

interface keyValue {
  key: string;
  value: data;
}

export function set(key: string, value: data): void;
export function get(key: string): data;
export function fetch(key: string): data;
export function all(): keyValue[];
export function startsWith(search: string): keyValue[];
export function has(key: string): boolean;
export function type(key: string): any;
export function add(key: string, amount: number): void;
export function subtract(key: string, amount: number): void;
export function push(key: string, value: data): void;
export function includes(key: string, value: data): boolean;
export function is(key: string, value: data): boolean;
export function options(options: optionType): void;
export function deleteAll(): void;
export function importQuick(data: keyValue[]): void;

function imp(data: keyValue[]): void;
function del(key: string): void;

export { del as delete };
export { imp as import };

export class Table {
  public constructor(tablename: string, options?: optionType);

  public tablename: string;
  public startedAt: number;
  public options: any;
  public filename: string;
  public base: any;

  public set(key: string, value: data): void;
  public get(key: string): data;
  public fetch(key: string): data;
  public all(): keyValue[];
  public startsWith(search: string): keyValue[];
  public has(key: string): boolean;
  public type(key: string): any;
  public add(key: string, amount: number): void;
  public subtract(key: string, amount: number): void;
  public push(key: string, value: data): void;
  public includes(key: string, value: data): boolean;
  public is(key: string, value: data): boolean;
  public import(data: keyValue[]): void;
  public delete(key: string): void;
  public deleteAll(): void;
  public importQuick(data: keyValue[]): void;
}

export class Read {
  constructor(filename: string, options?: readOptionType);

  public filename: string;
  public options: any;
  public base: any;

  public get(): any[];
}
