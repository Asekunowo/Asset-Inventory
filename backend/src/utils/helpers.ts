export const changeDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export const firstDay = (date: Date): string => {
  const firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
  console.log(firstDay);

  return firstDay.toISOString();
};

export const lastDay = (date: Date): string => {
  const lastDay = new Date(
    Date.UTC(date.getFullYear(), date.getMonth() + 1, 0)
  );
  lastDay.setHours(24, 59, 59, 999);

  return lastDay.toISOString();
};
