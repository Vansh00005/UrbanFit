import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import Navbar from '../components/navbar';
import Footer from'../components/Footer';
import NewsLetter from '../components/NewsLetter';
import { makeStyles } from '@material-ui/core/styles';
import styled from'styled-components';
import { Link } from "react-router-dom";

const Div=styled.div``
const Container=styled.div`
background-color:#f5fafd;
border-top:1px solid black;
padding:30px;
`
const Title=styled.h1`
text-align:center;
`

const useStyles = makeStyles((theme) => ({
    tableContainer: {
      borderRadius: 15,
      margin: '10px auto',
      maxWidth: 800,
      position: 'relative',
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

const Order = () => {
     const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const userLocalStorage = localStorage.getItem("persist:root");
  const userPersistData = JSON.parse(userLocalStorage);
  const currentUserData = userPersistData?.currentUser ? JSON.parse(userPersistData.currentUser) : null;
  
  const userId= currentUserData?.username;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/orders/find/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Div>
    <Navbar />
    <Container>
     <Title>View Your Orders</Title>   
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table aria-label="order table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Order ID</TableCell>
            <TableCell className={classes.tableHeaderCell}>Amount</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell className={classes.tableHeaderCell}>Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>{order._id}</TableCell>
              <TableCell className={classes.tableCell}>{order.amount}</TableCell>
              <TableCell className={classes.tableCell}>{order.status}</TableCell>
              <TableCell className={classes.tableCell}>{order.createdAt}</TableCell>
              <TableCell className={classes.tableCell}>
                <Link to={`/order/${order._id}`}>
                <Button variant="contained" color="primary">
                  View
                </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    <NewsLetter />
    <Footer />
  </Div>
  );
};
export default Order;
