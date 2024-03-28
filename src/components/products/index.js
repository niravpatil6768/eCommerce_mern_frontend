import React, { useEffect, useState } from "react";
import { getAllProducts } from "../service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  MenuItem,
  Slide,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../service";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EditCalendar from "@mui/icons-material/EditCalendar";
import { Link } from "react-router-dom";
import {
  getProductsByCategory,
  getProductsByBrand,
  getProductsByDiscount,
  getProductsByOccasion,
  sortProductsByPrice,
  getProductsByPriceRange,
  sortProductsByDate,
} from "../service";

function Products({ product }) {
  const [products, setProducts] = useState([]);
  const [pro, setPro] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (event) => {
    try {
      console.log(products.id);
      const data = await getAllProducts(); // Call the service function
      setProducts(data.products); // Update state with the retrieved products
      setPro(data.products);
    } catch (error) {
      // Handle error
      console.error("Error fetching products:", error);
    }
  };

  const categoryFunction = async (event) => {
    const category = event.target.value;
    try {
      if (category !== "ALL") {
        const data = await getProductsByCategory(category);
        console.log(data);
        setProducts(data.products);
      } else {
        setProducts(pro);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const brandFunction = async (event) => {
    const brand = event.target.value;
    try {
      if (brand !== "ALL") {
        const data = await getProductsByBrand(brand);
        console.log(data);
        setProducts(data.products);
      } else {
        setProducts(pro);
      }
    } catch (error) {
      console.error("Error fetching products by brand:", error);
    }
  };

  const occasionFunction = async (event) => {
    const occasion = event.target.value;
    try {
      if (occasion !== "ALL") {
        const data = await getProductsByOccasion(occasion);
        console.log(data);
        setProducts(data.products);
      } else {
        setProducts(pro);
      }
    } catch (error) {
      console.error("Error fetching products by occasion:", error);
    }
  };

  const discountFunction = async (event) => {
    const discount = event.target.value;
    try {
      if (discount !== "ALL") {
        const data = await getProductsByDiscount(discount);
        console.log(data);
        setProducts(data.products);
      } else {
        setProducts(pro);
      }
    } catch (error) {
      console.error("Error fetching products by discount:", error);
    }
  };

  const sortPriceFunction = async (event) => {
    const sortBy = event.target.value;
    try {
      const data = await sortProductsByPrice(sortBy);
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products by discount:", error);
    }
  };

  const sortDateFunction = async (event) => {
    const sortBy = event.target.value;
    try {
      const data = await sortProductsByDate(sortBy);
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products by discount:", error);
    }
  };

  const priceRangeFunction = async (min, max) => {
    // const min = event.target.value;
    // const max = event.target.value;
    try {
      const data = await getProductsByPriceRange(min, max);
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products by discount:", error);
    }
  };

  const [value, setValue] = useState([0, 100]); // Initial slider value

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the slider value

    priceRangeFunction(newValue[0], newValue[1]);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId); // Call the deleteProduct function with the product ID
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optionally, handle deletion error
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Products List</h2>

        <Link
          to={`/addProduct`}
          style={{
            justifyContent: "end",
            margin: 20,
            alignItems: "end",
            border: "1px solid #4CAF51",
            height: "25px",
            backgroundColor: "#4CAF51",
            padding: 10,
            textDecoration: "none",
            borderRadius: 10,
          }}
        >
          <Typography style={{ color: "black" }}>Add Product</Typography>
        </Link>
      </div>
      <div>
        <TextField
          id="filled-select-currency"
          onChange={categoryFunction}
          select
          size="small"
          label="Filter Product By Category"
          defaultValue="EUR"
          style={{ width: 150, margin: 20 }}
          //   helperText="Filter Product By Category"
          variant="standard"
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="ELECTRONICS">ELECTRONICS</MenuItem>
          <MenuItem value="FASHION">FASHION</MenuItem>
          <MenuItem value="SPORTS">SPORTS</MenuItem>
        </TextField>

        <TextField
          id="filled-select-currency"
          onChange={brandFunction}
          select
          size="small"
          label="Filter Product By Brand"
          defaultValue="EUR"
          style={{ width: 150, margin: 20 }}
          //   helperText="Filter Product By Category"
          variant="standard"
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="NIKE">NIKE</MenuItem>
          <MenuItem value="PUMA">PUMA</MenuItem>
          <MenuItem value="ADIDAS">ADIDAS</MenuItem>
          <MenuItem value="NB">NB</MenuItem>
        </TextField>

        <TextField
          id="filled-select-currency"
          onChange={discountFunction}
          select
          size="small"
          label="Filter Product By Discount"
          defaultValue="EUR"
          style={{ width: 150, margin: 20 }}
          //   helperText="Filter Product By Discount"
          variant="standard"
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="0%25">0%</MenuItem>
          <MenuItem value="10%25">10%</MenuItem>
          <MenuItem value="20%25">20%</MenuItem>
          <MenuItem value="50%25">50%</MenuItem>
          <MenuItem value="70%25">70%</MenuItem>
        </TextField>

        <TextField
          id="filled-select-currency"
          onChange={occasionFunction}
          select
          size="small"
          label="Filter Product By Occasion"
          defaultValue="EUR"
          style={{ width: 150, margin: 20 }}
          //   helperText="Filter Product By Discount"
          variant="standard"
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="Party">Party</MenuItem>
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Sport">Sport</MenuItem>
        </TextField>

        <TextField
          id="filled-select-currency"
          onChange={sortPriceFunction}
          select
          size="small"
          label="Sort by Price.."
          defaultValue="None"
          style={{ width: 150, margin: 20 }}
          //   helperText="Filter Product By Category"
          variant="standard"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Low to High">Low to High</MenuItem>
          <MenuItem value="High to Low">High to Low</MenuItem>
        </TextField>

        <TextField
          id="filled-select-currency"
          onChange={sortDateFunction}
          select
          size="small"
          label="Sort by Date.."
          defaultValue="None"
          style={{ width: 150, margin: 20 }}
          //   helperText="Filter Product By Category"
          variant="standard"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Old to New">Old to New</MenuItem>
          <MenuItem value="New to Old">New to Old</MenuItem>
        </TextField>
      </div>

      <Box sx={{ width: 300, padding: 2 }}>
        <Typography>Filter by Price Range</Typography>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={10000}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#009879" }}>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Occasion</TableCell>
              <TableCell>category</TableCell>
              <TableCell>Update Product</TableCell>
              <TableCell>Delete Product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "lightgrey" }}>
            {products.map((product) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.discount}</TableCell>
                <TableCell>
                  {" "}
                  <img
                    src={`http://localhost:3000/${product.productImage}`}
                    alt={product.name} // Set the alt attribute to provide alternative text for the image
                    style={{ width: "60px", height: "60px" }} // Set the width and height of the image
                  />
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.occasion}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell style={{}}>
                  <Link to={`/updateProduct/${product._id}`}>
                    <EditCalendar style={{ color: "blue", paddingLeft: 30 }} />
                  </Link>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(product._id)}>
                    <DeleteIcon style={{ color: "red", paddingLeft: 30 }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Products;
