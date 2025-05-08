export const tagCheck = (str: string): boolean => {
  return /^[0-9]{6,}$/.test(str);
};

export const serialCheck = (str: string): boolean => {
  return /^[A-Z0-9]{10,}$/.test(str);
};

export const nameCheck = (str: string): boolean => {
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  return nameRegex.test(str);
};
