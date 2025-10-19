const date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();

const format = (params) => {
  return params.toString().length < 2 ? "0" + params : params;
};

const time = `${year}-${format(month)}-${format(day)} ${format(hour)}:${format(
  minute
)}:${format(second)}`;

export default time;
