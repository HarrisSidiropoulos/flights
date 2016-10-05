export const LOCAL_STORAGE   = "LOCAL_STORAGE"
export const SESSION_STORAGE = "SESSION_STORAGE"

export const loadLocalValue = (key, storage=LOCAL_STORAGE) => {
  try {
    const serializedState = getStorage(storage).getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return new Promise((resolve) => {
      resolve(JSON.parse(serializedState))
    });
  } catch(err) {
    return undefined;
  }
};
export const saveLocalValue = (key, response, storage=LOCAL_STORAGE) => {
  try {
    const serializedState = JSON.stringify(response);
    getStorage(storage).setItem(key, serializedState);
  } catch(err) {
    // Ignore write errors
  }
};
const getStorage = (storage=LOCAL_STORAGE) =>
  storage===LOCAL_STORAGE ? localStorage : sessionStorage
