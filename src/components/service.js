import axios from "axios";

const API_URL = "http://localhost:3000";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/productpage`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/productpage/category/${category}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
}

export const getProductsByBrand = async (brand) => {
    try {
        const response = await axios.get(`${API_URL}/productpage/brand/${brand}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
}

export const getProductsByOccasion = async (occasion) => {
    try {
        const response = await axios.get(`${API_URL}/productpage/occasion/${occasion}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
}

export const getProductsByDiscount = async (discount) => {
    try {
        const response = await axios.get(`${API_URL}/productpage/discount/${discount}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
}

export const sortProductsByPrice = async (sortBy) => {
    try {
        console.log(sortBy)
        const response = await axios.get(`${API_URL}/productpage/products`, {
            params: { sortBy }, // Pass sortBy as part of the params object
          });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
}

export const sortProductsByDate = async (sortBy) => {
    try {
        console.log(sortBy)
        const response = await axios.get(`${API_URL}/productpage/productsBydate`, {
            params: { sortBy }, // Pass sortBy as part of the params object
          });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
}

export const getProductsByPriceRange = async (minPrice, maxPrice) => {
    try {
        const response = await axios.get(`${API_URL}/productpage/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};




export const addProductData = async (formData) => {
  try {
    console.log("in service");
    console.log(formData);
    const response = await axios.post(
      `${API_URL}/productpage/addproduct`,
      formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductData = async (formData, productId) => {
  try {
    console.log(formData);
    const response = await axios.put(
      `${API_URL}/productpage/updateproduct/${productId}`,
      formData
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/productpage/deleteproduct/${productId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${API_URL}/productpage/product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
