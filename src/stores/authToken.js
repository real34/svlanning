import { writable } from "svelte/store";

const KEY = "JWTToken";

const storage = (window && window.sessionStorage) || {
  getItem: () => undefined,
  setItem: () => {},
  removeItem: () => {}
};

const token = writable(storage.getItem(KEY));

token.subscribe(newValue => {
  newValue ? storage.setItem(KEY, newValue) : storage.removeItem(KEY);
});

export default token;
