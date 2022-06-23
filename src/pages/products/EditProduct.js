import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Card,
  Container,
} from "@mui/material";
import api from "./../../api";
const initialState = {
  name: "",
  price: "",
};
const EditProduct = () => {
  //   const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const { id } = useParams();
  const { name, price } = product;
  useEffect(() => {
    const getProduct = async () => {
      const product = await api.getProduct(id);
      setProduct(product);
    };
    getProduct();
  }, [id]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "" || price === "")
      return toast.error("Please enter all of data!");

    if (isNaN(price)) return toast.error("Price should be number");
    const updateProduct = async () => {
      const edittedProduct = await api.updateProduct(id, product);
      setProduct(edittedProduct);
      navigate("/", { replace: true });
    };
    updateProduct();
    toast.success("Product is updated successfully");
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    // setFormData({ ...formData, [name]: value });
  };
  return (
    <Container fixed>
      <Grid rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Card variant="outlined">
          <Grid item xs={12} md={8}>
            <h2>Edit New Product</h2>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid item xs={12} md={8}>
                <FormControl>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    aria-describedby="name-helper-text"
                    onChange={handleChange}
                    value={name}
                  />
                  <FormHelperText id="name-helper-text">
                    Enter Product Name Here
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8}>
                <FormControl>
                  <InputLabel htmlFor="price">Price</InputLabel>
                  <Input
                    id="price"
                    name="price"
                    aria-describedby="price-helper-text"
                    onChange={handleChange}
                    value={price}
                  />
                  <FormHelperText id="price-helper-text">
                    Enter Product Price Here
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8} margin="normal">
                <Button variant="outlined" type="submit">
                  Save Product
                </Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default EditProduct;
