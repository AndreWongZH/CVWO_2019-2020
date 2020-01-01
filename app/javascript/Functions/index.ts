export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const styleDate = (str: string) => {
  const d = new Date(str);
  return d.toDateString();
};

export const formatDate = (dateObj: Date) => {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const formatted = `${year}-${month}-${day}`;
  return formatted;
};
