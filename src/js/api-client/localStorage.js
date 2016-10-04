export const loadLocalValue = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
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
    localStorage.setItem(key, serializedState);
  } catch(err) {
    // Ignore write errors
  }
};
