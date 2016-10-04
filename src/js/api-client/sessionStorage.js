export const loadLocalValue = (key) => {
  try {
    const serializedState = sessionStorage.getItem(key);
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
export const saveLocalValue = (key, response) => {
  try {
    const serializedState = JSON.stringify(response);
    sessionStorage.setItem(key, serializedState);
  } catch(err) {
    // Ignore write errors
  }
};
