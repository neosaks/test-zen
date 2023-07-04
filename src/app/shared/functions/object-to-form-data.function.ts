export function objectToFormData<T extends {
  [key: string]: number | string | Blob | any
}>(object: T): FormData {
  const formData = new FormData();

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (typeof value === 'number') {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value);
      }
    }
  }

  return formData;
}
