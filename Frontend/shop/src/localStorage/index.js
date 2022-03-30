export function SetJsonLocalStorage(name, data) {
  return localStorage.setItem(name, JSON.stringify(data));
}

export function GetJsonLocalStorage(name) {
  return typeof window !== "undefined" && localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : {};
}

export function SetValueLocalStorage(name, data) {
  return localStorage.setItem(name, data);
}

export function GetValueLocalStorage(name) {
  return typeof window !== "undefined" && localStorage.getItem(name)
    ? localStorage.getItem(name)
    : "";
}

export function RemoveLocalStorage(name) {
  return localStorage.removeItem(name);
}
