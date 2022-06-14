const LOCALSTORAGE_KEY = "animals-635-477-590"; // Making our key unique to avoid confilcts with other apps.

export const getList = <T>(): T[] => {
  let valueFromLS = localStorage.getItem(LOCALSTORAGE_KEY) || "[]";
  return JSON.parse(valueFromLS) as T[];
};

export const save = <T>(data: T): void => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
};
