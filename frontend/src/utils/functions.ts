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

export const filterTag = (assets: any[], searchTag: string): any[] => {
  if (!searchTag) return assets;
  return assets.filter((asset) => {
    return asset.tag.toLowerCase() === searchTag.toLowerCase();
  });
};

export function fizzBuzz(n: any) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}
