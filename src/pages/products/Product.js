import api from "./../../api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CardActions,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      const product = await api.getProduct(id);
      setProduct(product);
    };
    getProduct();
  }, [id]);

  return (
    <>
      <h2>Product Details</h2>
      <Card
        sx={{ maxWidth: 320 }}
        style={{ margin: "2rem auto", padding: "1rem" }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Product Name:{product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price:{product.price}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button size="small" onClick={() => navigate(`/edit/${product.id}`)}>
            Edit
          </Button>
          <Button size="small" onClick={() => navigate("/")}>
            Back To Home
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default Product;
