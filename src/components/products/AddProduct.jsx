import React, { useEffect, useState } from "react";
import FileUpload from "../common/FileUpload";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextField, Autocomplete, Button } from "@mui/material";
import CustomModel from "../common/CustomModel";
import httpAction from "../../utils/httpAction";
import apis from "../../utils/apis";
import useProvideHooks from "../../hooks/useProvideHooks";
import "./addProduct.css";
import toast from "react-hot-toast";
import { wait } from "@testing-library/user-event/dist/utils";
const AddProduct = () => {
  const { dispatch, loading, navigate, setLoading } = useProvideHooks();
  const [files, setFiles] = useState([]);
  const [shoeModel, setShowModel] = useState(false);
  const [modelFile, setModelFile] = useState([]);
  const [modelTitle, setModelTitle] = useState("");

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const closeModel = () => {
    setShowModel(false);
  };
  const openModel = (value) => {
    setModelTitle(value);
    setShowModel(true);
  };

  const initistate = {
    title: "",
    sale_price: "",
    purchase_price: "",
    stock: "",
    detail: "",
    brand: "",
    category: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    sale_price: Yup.number().required("Sale price is required"),
    purchase_price: Yup.number().required("Purchase price is required"),
    stock: Yup.number().required("Stcok is required"),
    detail: Yup.string().required("Detail is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
  });

  // product submit
  const submitHandler = async (values) => {
    const productData = {
      ...values,
      image: files,
    };

    const data = {
      url: apis().addProduct,
      method: "post",
      body: { ...productData },
    };
    const result = await dispatch(httpAction(data));
    console.log(result)
    if (result?.status) {
      toast.success(result?.message);
    }
  };

  const initialModelaValue = {
    title: "",
  };

  const validateModelValue = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  // model integration
  const sendModelValue = async (values) => {
    const formatedValues = {
      ...values,
      image: modelFile[0],
    };

    const data = {
      url: modelTitle === "brand" ? apis().addNewBrand : apis().addNewCategory,
      method: "POST",
      body: { ...formatedValues },
    };
    const result = await dispatch(httpAction(data));

    if (result?.status) {
      setShowModel(false);
      toast.success(result?.message);
      setModelFile([]);
      if (modelTitle === "brand") {
        setBrands((prevBrnads) => [...prevBrnads, result?.savedBrand?.title]);
      } else {
        setCategories((prevCat) => [...prevCat, result?.savedCategory?.title]);
      }
    }
  };

  // get brands and category dropdown
  useEffect(() => {
    const getModelDropdown = async () => {
      const data = {
        url: apis().getBrandDropdown,
      };
      const result = await dispatch(httpAction(data));
      if (result?.status) {
        const formatedValues = result?.list?.map((item) => item.title);
        setBrands(formatedValues);
      }

      const categoryData = {
        url: apis().getCategoryDropdown,
      };
      const cartegoryResult = await dispatch(httpAction(categoryData));
      if (result?.status) {
        const formatedCate = cartegoryResult?.list?.map((item) => item.title);
        setCategories(formatedCate);
      }
    };

    getModelDropdown();
  }, []);

  return (
    <div className="add_product_main">
      <CustomModel
        show={shoeModel}
        onClose={closeModel}
        title={`add new ${modelTitle}`}
      >
        <div>
          <Formik
            onSubmit={sendModelValue}
            initialValues={initialModelaValue}
            validationSchema={validateModelValue}
          >
            {({ handleBlur, handleChange, values, errors, touched }) => (
              <Form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    name="title"
                    label={`${modelTitle} title`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    size="small"
                    fullWidth
                    value={values.title}
                  />
                  <FileUpload files={modelFile} setFiles={setModelFile} />

                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CustomModel>
      <Formik
        initialValues={initistate}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({
          handleBlur,
          handleChange,
          touched,
          setFieldValue,
          errors,
          values,
        }) => (
          <Form>
            <div className="row g-3">
              <div className="col-md-12">
                <TextField
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  type="text"
                  label="Product Title"
                  name="title"
                />
              </div>
              <div className="col-md-4">
                <TextField
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.sale_price}
                  error={touched.sale_price && Boolean(errors.sale_price)}
                  helperText={touched.sale_price && errors.sale_price}
                  type="number"
                  label="Product sale price"
                  name="sale_price"
                />
              </div>
              <div className="col-md-4">
                <TextField
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.purchase_price}
                  error={
                    touched.purchase_price && Boolean(errors.purchase_price)
                  }
                  helperText={touched.purchase_price && errors.purchase_price}
                  type="number"
                  label="Product purchase price"
                  name="purchase_price"
                />
              </div>
              <div className="col-md-4">
                <TextField
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stock}
                  error={touched.stock && Boolean(errors.stock)}
                  helperText={touched.stock && errors.stock}
                  type="number"
                  label="Product stock"
                  name="stock"
                />
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <textarea
                    style={{
                      borderColor:
                        touched.detail && Boolean(errors.detail) && "red",
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.detail}
                    name="detail"
                    placeholder="Type here..."
                    rows={5}
                    className="add_product_detail"
                  />
                  <span style={{ color: "red" }}>
                    {touched.detail && Boolean(errors.detail) && errors.detail}
                  </span>
                </div>
                <div className="col-md-6">
                  <FileUpload files={files} setFiles={setFiles} />
                </div>
              </div>
              <div className="col-md-6">
                <Autocomplete
                  options={brands}
                  value={values.brand}
                  onChange={(event, newValue) => {
                    setFieldValue("brand", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select brand"
                      name="brand"
                      onBlur={handleBlur}
                      error={touched.brand && Boolean(errors.brand)}
                      helperText={touched.brand && errors.brand}
                      size="small"
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className="col-md-6">
                <Autocomplete
                  options={categories}
                  value={values.category}
                  onChange={(event, newValue) => {
                    setFieldValue("category", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select category"
                      name="category"
                      onBlur={handleBlur}
                      error={touched.category && Boolean(errors.category)}
                      helperText={touched.category && errors.category}
                      size="small"
                      fullWidth
                    />
                  )}
                />
              </div>
              <div>
                <Button type="submit" variant="contained">
                  Save
                </Button>
                <Button variant="outlined" onClick={() => openModel("brand")}>
                  Add new brand
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => openModel("category")}
                >
                  Add new category
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
