import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./../../api";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup } from "@mui/material";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getProducts = async () => {
    const products = await api.getProducts();
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);
  const handleUpdate = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = (id) => {
    const deleteProduct = async () => {
      await api.deleteProduct(id);
      const productsList = products.filter((product) => product.id !== id);
      setProducts(productsList);
    };
    deleteProduct();
  };

  return (
    <>
      <h1>Products List</h1>
      <Link to="/add" style={{ margin: "1rem 0", display: "block" }}>
        <Button variant="outlined">Add Product</Button>
      </Link>
      {products.length === 0 && <h3>There is no products until now</h3>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product ID</StyledTableCell>
              <StyledTableCell align="right">Product Name</StyledTableCell>
              <StyledTableCell align="right">Product Price</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell component="th" scope="product">
                    {product.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.price}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Link to={`/${product.id}`}>
                        <Button>View</Button>
                      </Link>

                      <Button onClick={() => handleUpdate(product.id)}>
                        Edit
                      </Button>

                      <Button
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Products;
