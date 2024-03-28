import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import BackupIcon from "@mui/icons-material/Backup";
import ClearIcon from "@mui/icons-material/Clear";
import { updateProductData } from "../service";
import { useParams } from "react-router-dom";
import { getProductById } from "../service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "red",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderRadius: 10,
      borderWidth: 1.3,
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

function Updateproduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const productData = await getProductById(id); // Fetch product data by ID

      console.log(productData.product);
      console.log(productData.product.productImage);
      setProduct(productData.product); // Set the product data in state
      setProductImage(productData.product.productImage);

      setFormData((prevFormData) => ({
        ...prevFormData,
        name: productData.product.name,
        price: productData.product.price,
        occasion: productData.product.occasion,
        brand: productData.product.brand,
        discount: productData.product.discount,
        category: productData.product.category,
        productImage: file,
        // Add other properties as needed
      }));
      const filee = productImage.split("/").pop();
      setFile(filee);
      console.log(filee);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    price: null,
    category: "",
    productImage: null,
    occasion: "",
    brand: "",
    discount: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [brand, setBrand] = useState("");
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      brand: value,
    }));
  };

  const [category, setCategory] = useState("");
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const [occasion, setOccasion] = useState("");
  const handleOccasionChange = (event) => {
    setOccasion(event.target.value);
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      occasion: value,
    }));
  };

  const [discount, setDiscount] = useState("");
  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      discount: value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileSize = selectedFile.size / (1024 * 1024); // Size in MB
      if (fileSize > 10) {
        alert("File size should be less than 10 MB");
        return;
      }
      const fileType = selectedFile.type;
      if (fileType !== "image/png" && fileType !== "image/jpeg") {
        alert("Please upload a PNG or JPEG file.");
        return;
      }
      setFile(selectedFile);
    }

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        productImage: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        productImage: selectedFile,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Ensure that formData has the correct productImage before submitting
      const updatedFormData = { ...formData };
      if (file) {
        updatedFormData.productImage = file;
      }
      console.log(updatedFormData);
      const response = await updateProductData(updatedFormData, id);
      console.log("Form submitted successfully:", response);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Updated successfully!",
        showConfirmButton: false,
        timer: 2500,
        customClass: {
          popup: "small-swal",
          title: "small-swal-title",
        },
        style: {
          width: "100px", // Adjust the width as needed
          fontSize: "14px", // Adjust the font size as needed
        },
      });
      navigate("/");

      // Reset form after successful submission
      setFormData({
        name: "",
        price: null,
        category: "",
        productImage: null,
        occasion: "",
        brand: "",
        discount: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent scrolling to the top
    document.querySelector('input[type="file"]').click();
  };

  const handleClearFile = () => {
    setFile(null);
    console.log("clear");
  };

  //   const fetchProductMemoized = useMemo(() => {
  //     return () => {
  //       fetchProduct();
  //     };
  //   }, []);

  if (!product) {
    return <div>Loading...</div>; // Render loading indicator or return early if product is null
  }

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          justifyContent: "center",

          paddingTop: 150,
          //   paddingBottom: 150,
          //   paddingLeft: "20px",
          //   paddingRight: "20px",
          width: "460px",
        }}
      >
        <Card>
          <form
            style={{ padding: 30, borderRadius: 20 }}
            onSubmit={handleSubmit}
          >
            <h2>Update Product</h2>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                style={{
                  marginRight: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "23px",
                  }}
                >
                  Name
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={7.95}
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <CssTextField
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  //   onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  style={{
                    // width: isLargeScreen ? "72%" : "100%",
                    alignContent: "left",
                    alignSelf: "left",
                    fontWeight: "bold",
                  }}
                  InputProps={{
                    style: {
                      //   color: "white",
                      textAlign: "left",
                    },
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                style={{
                  marginRight: "auto",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "23px",
                  }}
                >
                  Price
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={7.95}
                style={{
                  marginLeft: "auto",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <CssTextField
                  required
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  style={{
                    // width: isLargeScreen ? "72%" : "100%",
                    alignContent: "left",
                    alignSelf: "left",
                    fontWeight: "bold",
                  }}
                  InputProps={{
                    style: {
                      //   color: "white",
                      textAlign: "left",
                    },
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                style={{
                  marginRight: "auto",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "23px",
                  }}
                >
                  Brand
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                style={{
                  //   height: isLargeScreen ? 86 : 60,

                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <CssTextField
                  label="Select Brand"
                  variant="outlined"
                  select
                  name="brand"
                  value={formData.brand}
                  onChange={handleBrandChange}
                  fullWidth
                  InputProps={{
                    style: {
                      textAlign: "left",
                    },
                  }}
                  style={{
                    alignContent: "left",
                    alignSelf: "left",
                    width: "223px",
                    fontWeight: "bold",
                    boxSizing: "border-box",
                  }}
                >
                  <MenuItem value="NIKE">NIKE</MenuItem>
                  <MenuItem value="PUME">PUMA</MenuItem>
                  <MenuItem value="ADIDAS">ADIDAS</MenuItem>
                  <MenuItem value="NB">NB</MenuItem>
                  <MenuItem value="ALL">ALL</MenuItem>
                </CssTextField>
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                style={{
                  marginRight: "auto",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "23px",
                  }}
                >
                  Discount
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                style={{
                  //   height: isLargeScreen ? 86 : 60,

                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <CssTextField
                  label="Discount on Product"
                  variant="outlined"
                  select
                  name="discount"
                  value={formData.discount}
                  onChange={handleDiscountChange}
                  fullWidth
                  InputProps={{
                    style: {
                      textAlign: "left",
                    },
                  }}
                  style={{
                    alignContent: "left",
                    alignSelf: "left",
                    width: "223px",
                    fontWeight: "bold",
                    boxSizing: "border-box",
                  }}
                >
                  <MenuItem value="0%">0%</MenuItem>
                  <MenuItem value="10%">10%</MenuItem>
                  <MenuItem value="20%">20%</MenuItem>
                  <MenuItem value="50%">50%</MenuItem>
                  <MenuItem value="70%">70%</MenuItem>
                </CssTextField>
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                style={{
                  marginRight: "auto",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "23px",
                  }}
                >
                  Occasion
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                style={{
                  //   height: isLargeScreen ? 86 : 60,

                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <CssTextField
                  label="Select Product Occasion"
                  variant="outlined"
                  select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleOccasionChange}
                  fullWidth
                  //   value={formData.rashi}
                  //   onChange={handleRashiChange}

                  InputProps={{
                    style: {
                      textAlign: "left",
                    },
                  }}
                  style={{
                    alignContent: "left",
                    alignSelf: "left",
                    width: "223px",
                    fontWeight: "bold",
                    boxSizing: "border-box",
                  }}
                >
                  <MenuItem value="Party">Party</MenuItem>
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Sport">Sport</MenuItem>
                  <MenuItem value="ALL">ALL</MenuItem>
                </CssTextField>
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                style={{
                  marginRight: "auto",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "23px",
                  }}
                >
                  Category
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                style={{
                  //   height: isLargeScreen ? 86 : 60,

                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <CssTextField
                  label="Select Category"
                  variant="outlined"
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  select
                  fullWidth
                  //   value={formData.rashi}
                  //   onChange={handleRashiChange}

                  InputProps={{
                    style: {
                      textAlign: "left",
                    },
                  }}
                  style={{
                    alignContent: "left",
                    alignSelf: "left",
                    width: "223px",
                    fontWeight: "bold",
                    boxSizing: "border-box",
                  }}
                >
                  <MenuItem value="ELECTRONICS">ELECTRONICS</MenuItem>
                  <MenuItem value="FASHION">FASHION</MenuItem>
                  <MenuItem value="SPORTS">SPORTS</MenuItem>
                  <MenuItem value="ALL">ALL</MenuItem>
                </CssTextField>
              </Grid>

              {/* <Grid
                md={5}
                sm={4}
                xs={12}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                style={{
                  paddingLeft: 16,
                  paddingTop: 8,
                }}
              >
                <Grid>
                  <Typography
                    style={{
                      textAlign: "left",
                      fontSize: "23px",

                      color: "white",
                    }}
                  >
                    Upload photo
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    style={{
                      textAlign: "left",
                      fontSize: "12px",
                      paddingTop: 7,
                      color: "red",
                    }}
                  >
                    *Required.
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                xs={12}
                sm={5.5}
                md={5.5}
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {!file && (
                  <Grid xs={8} sm={8} md={4}>
                    <div>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept=".png, .jpeg, .jpg"
                        // value={formData.productImage}
                        onChange={handleFileChange}
                        required
                      />
                      <button
                        style={{
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          backgroundColor: "white",
                        }}
                        onClick={handleButtonClick}
                      >
                        <BackupIcon />
                        <Typography variant="body2">Upload File</Typography>
                      </button>
                    </div>
                  </Grid>
                )}
                {file && (
                  <Grid xs={12} sm={11} md={10}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1px",
                        backgroundColor: "white",
                        width: "65%",
                        maxWidth: "1200px",
                      }}
                    >
                      <Typography
                        style={{
                          flex: 1,
                          padding: "10px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        variant="body2"
                      >
                        {file.name}
                      </Typography>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={handleClearFile}
                      >
                        <ClearIcon />
                      </button>
                    </div>
                  </Grid>
                )}
                {!file && (
                  <Grid xs={12} sm={10} md={8}>
                    <Typography
                      style={{
                        textAlign: "left",
                        fontSize: "12px",
                        paddingTop: 7,
                        color: "white",
                        paddingLeft: 10,
                      }}
                    >
                      Max file size 10MB.
                    </Typography>
                  </Grid>
                )}
              </Grid> */}

              <Grid style={{}}>
                <Button
                  type="submit"
                  fullWidth
                  style={{
                    backgroundColor: "blue",
                    height: 30,
                    borderRadius: 10,
                    marginLeft: 100,
                    marginTop: 20,
                  }}
                  onClick={() => {
                    // handleButton();
                    window.scrollTo(0, 0); // Scroll to the top of the page
                  }}
                >
                  <Typography
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    UPDATE PRODUCT
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </div>
  );
}

export default Updateproduct;
