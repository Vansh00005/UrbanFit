import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from'styled-components';
import { Link } from "react-router-dom";
import { userRequest } from '../../../../requestMethods';
import Navbar from './../../../../components/navbar'
import Footer from './../../../../components/Footer'
import Pagination from '@material-ui/lab/Pagination'; 
import Sidebar from './../../adminComponents/sidebar/Sidebar.jsx';

const Div=styled.div`
// text-align:center;
display:flex;
`

const AddProductButton=styled.div`
// text-align:center;
margin:10px;
`
const Middle=styled.div`
display:flex;
justify-content:center;
border radius:15;
border:1px solid black;
`
const Wrapper=styled.div`
display:flex;
flex-direction:column;
`


const Side=styled.div`
width: 20vw; 
  background-color: #f5fafd;
  border-right: 1px solid black;
  border-top: 1px solid black;
`

const useStyles = makeStyles((theme) => ({
    tableContainer: {
      width:'80vw',
      borderRadius: 15 ,
      borderTop:'2px solid black',     
      position: 'relative',
      // padding:'40px',
    },
    tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: '#504099',
      color: 'white',
      border: '1px solid rgba(224, 224, 224, 1)',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    tableRow: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      border: '1px solid rgba(224, 224, 224, 1)',
      '&:hover': {
        backgroundColor: 'rgba(255, 192, 203, 0.9)',
      },
    },
    tableCell: {
      border: '1px solid rgba(224, 224, 224, 1)',
    },
  }));

const ProductsTable = () => {

     const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await userRequest.get(`/products`);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const handlePageChange = (event, newPage) => {
      setCurrentPage(newPage);
    };
  
  return (
    <>
    <Div>
        <Sidebar/>  
     {/* <Title>View Your Products</Title>  */}
     <Wrapper>
     <TableContainer component={Paper} className={classes.tableContainer}>
  <Table aria-label="products table">
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeaderCell}>ID</TableCell>
        <TableCell className={classes.tableHeaderCell}>Title</TableCell>
        <TableCell className={classes.tableHeaderCell}>Stock</TableCell>
        <TableCell className={classes.tableHeaderCell}>Price</TableCell>
        <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
     {currentProducts.map((product) => ( // Use currentProducts here
        <TableRow key={product._id} className={classes.tableRow}>
          <TableCell className={classes.tableCell}>{product._id}</TableCell>
          <TableCell className={classes.tableCell}>{product.title}</TableCell>
          <TableCell className={classes.tableCell}>{product.inStock.toString()}</TableCell>
          <TableCell className={classes.tableCell}>{product.price}</TableCell>
          <TableCell className={classes.tableCell}>
            <Button variant="contained" color="primary">
              View
            </Button>
            &nbsp; &nbsp;
            <Button variant="contained" color="primary">
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
    
</TableContainer>  
<Middle><Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className="mt-3"
      /> </Middle>
      <Link to="/newProduct">
    <AddProductButton> 
     <Button variant="contained" color="primary">Add Product</Button>  
     </AddProductButton>
     </Link>
     </Wrapper>
     </Div>
     <Footer />
 </>
  );
};
export default ProductsTable;
