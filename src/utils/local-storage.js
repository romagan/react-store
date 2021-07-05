const setLocalStorage = (obj) => {
  for (let key in obj) {
    let value = obj[key];

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  }
}

export default setLocalStorage;
