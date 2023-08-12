import styled from "styled-components";
import { mobile } from "../responsive";
import React,{ useState } from "react";
import axios from "axios"; // Import axios for making API requests
import Modal from 'react-modal';
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:2000/api/auth/register", formData); // Adjust the URL as needed
      console.log(response.data); // You can handle the response here
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit} >
          {/* <Input placeholder="name" /> */}
          {/* <Input placeholder="last name" /> */}
          <Input  name="username" placeholder="username"    value={formData.username}
          onChange={handleInputChange} />
          <Input name="email" placeholder="email"    value={formData.email}
          onChange={handleInputChange} />
          <Input name="password" placeholder="password"    
          onChange={handleInputChange} />
          {/* <Input placeholder="confirm password" /> */}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
          <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  style={{
    content: {
      top: "0",              // Position at the top
      left: "50%",           // Center horizontally
      right: "auto",         // Reset the right positioning
      bottom: "auto",        // Reset the bottom positioning
      transform: "translateX(-50%)", // Center horizontally
      width: "300px",        // Set the width of the pop-up
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
      zIndex: 1000,          // Ensure it's above other elements
    },
  }}
>
  <div style={{ textAlign: "center" }}>
    <h2>Registration Successful!</h2>
    <p>Your registration was successful.</p>
    <Link to="/login"><button onClick={() => setIsModalOpen(false)}>Close</button></Link>
  </div>
</Modal>
        </Form>
      </Wrapper>
     
    </Container>
  );
};

export default Register;