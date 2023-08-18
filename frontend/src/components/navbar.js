import React from "react";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux"; 
import {useEffect,useState} from 'react';
import axios from 'axios';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  transition: color 0.3s ease;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  &:hover {
    color: #ff4500;
  }
`;


const Navbar = () => {


  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.currentUser);;
  const userLocalStorage = localStorage.getItem("persist:root");
  const userPersistData = JSON.parse(userLocalStorage);
  const currentUserData = userPersistData?.currentUser ? JSON.parse(userPersistData.currentUser) : null;  
  const username= currentUserData?.username ;
const [cartData,setCartData]=useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(`http://localhost:2000/api/carts/finds/${username}`, {
         });
          setCartData(response.data);
          console.log("cart",response.data);
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      } else {
        setCartData([]); // Empty cart data for logged-out users
      }
    };    
    fetchCartData();
  }, [isLoggedIn, username]);

    const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('persist:root');
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>UrbanFit</Logo>
        </Center>
        <Right>
        <StyledLink to="/">Home</StyledLink>   
        <StyledLink to="/products">PRODUCTS</StyledLink>        
          {isLoggedIn ? (
            <>
              <MenuItem>Welcome {username}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={cartData.length} color="primary" overlap="rectangular">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
            </>
          ) : (
            <>              
                <StyledLink to="/register">REGISTER</StyledLink>
               <StyledLink to="/login">
                SIGN IN
              </StyledLink>
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={0} color="primary" overlap="rectangular">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
            </>
          )}
       </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;