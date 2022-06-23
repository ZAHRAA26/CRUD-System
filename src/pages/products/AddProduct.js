import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Card, TextField, styled } from "@mui/material";
import { toast } from "react-toastify";
import api from "./../../api";
const initialState = {
  name: "",
  price: "",
};

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "green",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
});
const AddProduct = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, price } = formData;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "" || price === "")
      return toast.error("Please enter all of data!");

    if (isNaN(price)) return toast.error("Price should be number");

    const addProduct = async () => {
      const newProduct = await api.addProduct(formData);
      setFormData(newProduct);

      navigate("/", { replace: true });
    };
    addProduct();
    toast.success("Product is added successfully");
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Grid
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ margin: "2rem auto" }}
    >
      <Card variant="outlined">
        <Grid item xs={12} md={8}>
          <h2>Add New Product</h2>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid item xs={12} md={8}>
              <ValidationTextField
                label="Name"
                required
                variant="outlined"
                defaultValue="enter product name here"
                id="name"
                name="name"
                onChange={handleChange}
                value={name}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <ValidationTextField
                label="Price"
                required
                variant="outlined"
                defaultValue="0"
                id="price"
                name="price"
                onChange={handleChange}
                value={price}
              />
            </Grid>
            <Grid item xs={12} md={8} margin="normal">
              <Button variant="outlined" type="submit">
                Add Product
              </Button>
            </Grid>
          </form>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AddProduct;
