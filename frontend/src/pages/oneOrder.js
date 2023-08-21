import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link,useLocation} from "react-router-dom";
import axios from 'axios'
import {useState,useEffect} from 'react'

const Container = styled.div``;


const Wrapper = styled.div`
background-color:#f5fafd;
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
  cursor:pointer;
`;

const OneOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [orderData,setOrderData] = useState([]);

  const isLoggedIn= useSelector((state) => state.currentUser);
  const userLocalStorage = localStorage.getItem("persist:root");
  const userPersistData = JSON.parse(userLocalStorage);
  const currentUserData = userPersistData?.currentUser ? JSON.parse(userPersistData.currentUser) : null;
  
  const userId= currentUserData?.username;
  const Address= currentUserData?.address;
// const [cartTotal,setCartTotal]=useState(0);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(`http://localhost:2000/api/orders/find_by_orderId/${orderId}`, {
         });
          setOrderData(response.data);
          console.log("order",response.data);
        } catch (error) {
          console.error('Error fetching order data:', error);
        }
      } else {
        setOrderData([]); // Empty order data for logged-out users
      }
    };    
    fetchOrderData();
  }, [isLoggedIn, userId]);

// const products=orderData[0].products;
// console.log(orderData);




  

  return (
    <Container>
     <Navbar />
      <Announcement />
      <Wrapper>
        <Title>ORDER ID: {orderData[0]?._id}</Title>
        <Top>
          <Link to="/"><TopButton>CONTINUE SHOPPING</TopButton></Link>        
        </Top>
        <Bottom>
          <Info>
    
          {orderData.length > 0 && orderData[0].products ? (
          orderData[0].products.map((product,index) => (
              <Product key={index}>
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
                  {/* <RemoveButton onClick={() => removeFromCart(product._id)}>Remove from cart</RemoveButton>  */}
                </PriceDetail>
                
              </Product>              
            ))
            )
            : (
              <p>Loading...</p>
            )}          
          </Info>  
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            {/* <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cartTotal}</SummaryItemPrice>
            </SummaryItem> */}
            {/* <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 60</SummaryItemPrice>
            </SummaryItem> */}
            <SummaryItem>
              <SummaryItemText>STATUS:</SummaryItemText>
              <SummaryItemPrice>PENDING</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total:</SummaryItemText>
              <SummaryItemPrice>Rs. {orderData[0]?.amount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Address:{Address}</SummaryItemText>
              {/* <p>{Address}</p> */}
            </SummaryItem>
            {/* <Button onClick={handleCheckOut}>CHECKOUT NOW</Button> */}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default OneOrder;