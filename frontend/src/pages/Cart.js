import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
import {useState,useEffect} from 'react'

const Container = styled.div``;


const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom:1px;
  border-bottom:0.2px solid black;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;



const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const RemoveButton = styled.button`
  background-color: #ff6347;
  color: white;
  border: none;
  font-size: 12px;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d9534f;
  }
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const isLoggedIn= useSelector((state) => state.currentUser);
  const userLocalStorage = localStorage.getItem("persist:root");
  const userPersistData = JSON.parse(userLocalStorage);
  const currentUserData = userPersistData?.currentUser ? JSON.parse(userPersistData.currentUser) : null;
  
  const userId= currentUserData?.username;
const [cartTotal,setCartTotal]=useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(`http://localhost:2000/api/carts/finds/${userId}`, {
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
  }, [isLoggedIn, userId]);

  useEffect(() => {
    // Calculate the total cart cost
    const calculateCartTotal = () => {
      let total = 0;
      cartData.forEach((product) => {
        total += product.quantity * product.price;
      });
      setCartTotal(total);
    };
    calculateCartTotal();
  }, [cartData]);

  const removeFromCart = async (cartId) => {
    try {
      await axios.delete(`http://localhost:2000/api/carts/${cartId}`);
      // After successful deletion, update the cart data to reflect the changes
      setCartData((prevCartData) =>
        prevCartData.filter((cartItem) => cartItem._id !== cartId)
      );
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <Container>
     <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/"><TopButton>CONTINUE SHOPPING</TopButton></Link>
          <TopTexts>
            <TopText>Shopping Bag(0)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          {cartData.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    {/* <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName> */}
                    <ProductId>
                      <b>PRODUCT ID:</b> {product.productId}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    {/* <Add /> */}
                    <ProductAmount>Quantity:{product.quantity}</ProductAmount>               
                              
                  </ProductAmountContainer>
                  <ProductPrice>
                    Price:Rs. {product.price * product.quantity}
                  </ProductPrice>
                  <RemoveButton onClick={() => removeFromCart(product._id)}>Remove from cart</RemoveButton> 
                </PriceDetail>
                
              </Product>              
            ))}
            
          </Info>  
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cartTotal}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 60</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. -60</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cartTotal}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;