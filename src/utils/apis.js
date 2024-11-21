const apis = () => {
  const local = "http://localhost:5052/";

  const list = {
    registerUser: `${local}user/register`,
    loginUser: `${local}user/login`,
    imageUpload: `${local}image/upload`,
    addNewBrand: `${local}brand/add`,
    addNewCategory: `${local}category/add`,
    getBrandDropdown: `${local}dropdown/brand`,
    getCategoryDropdown: `${local}dropdown/category`,
    addProduct: `${local}product/add`,
  };

  return list;
};

export default apis;
