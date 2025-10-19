const Respone = (status_code, message, datas) => {
  return {
    payload: {
      status_code,
      message,
      datas: [datas],
    },
  };
};

export default Respone;
