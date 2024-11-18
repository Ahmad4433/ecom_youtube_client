const apis = () => {
  const local = "http://localhost:5052/";

  const list = {
    registerUser: `${local}user/register`,
  };

  return list;
};

export default apis;
