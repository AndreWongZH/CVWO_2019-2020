export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const styleDate = (str) => {
  const d = new Date(str);
  return d.toDateString();
};

export const formatDate = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const formatted = `${year}-${month}-${day}`;
  return formatted;
};
