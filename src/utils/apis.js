const apis = () => {
  const local = "http://localhost:5052/";

  const list = {
    registerUser: `${local}user/register`,
    loginUser: `${local}user/login`,
    imageUpload:`${local}image/upload`
  };

  return list;
};

export default apis;
