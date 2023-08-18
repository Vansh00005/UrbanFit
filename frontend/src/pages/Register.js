import styled from "styled-components";
import { mobile } from "../responsive";
import React,{ useState } from "react";
import axios from "axios"; // Import axios for making API requests
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import {Box,IconButton,TextField} from "@material-ui/core";
import { Visibility,VisibilityOff } from "@material-ui/icons";
/******************styles********************/
const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
background-image: url('https://img.freepik.com/free-photo/top-view-clothing_1203-8160.jpg?w=740&t=st=1692338455~exp=1692339055~hmac=008bbb1646c6ccd84931ebbd8ba616564b10a0e17e5071b10caac435333e364d');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const Wrapper = styled.div`
background-color: rgba(255, 255, 255, 0.95);
  border-radius: 5px;
  color: #333;
  // font-family: sans-serif;
  line-height: 1.5;
  max-width: 50%;
  padding: 1rem 2rem;
  // a {
  //   color: #bf0222;
  // }
  ${mobile({ width: "75%" })};
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  {
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.5);  
    }   
  }
  `;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Modalstyle={
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
}
/******************styles********************/




const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
      confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "", //  confirmPassword 
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameRegex = /^[A-Za-z]+$/;

    if (formData.username.trim() === "") {
      errors.username = "Username is required";
      valid = false;
    } else if (!usernameRegex.test(formData.username)) {
      errors.username = "Username should only contain alphabets";
      valid = false;
    }

    if (formData.email.trim() === "") {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
      valid = false;
    }

    if (formData.password.trim() === "") {
      errors.password = "Password is required";
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Password must be at least 8 characters with one uppercase, one lowercase, and one special character";
      valid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    const dataToSend={
      username: formData.username,
      email:formData.email,
      password:formData.password,
    }
    try {
      const response = await axios.post("http://localhost:2000/api/auth/register", dataToSend);
      console.log(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <Container>
      <Wrapper>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h1>CREATE AN ACCOUNT</h1>
    <TextField
      label="Username"
      name="username"
      value={formData.username}
      onChange={handleInputChange}
      error={Boolean(formErrors.username)}
      helperText={formErrors.username}
    />
    <TextField
      label="Email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      error={Boolean(formErrors.email)}
      helperText={formErrors.email}
    />
    <TextField
      label="Password"
      name="password"
      type={showPassword ? 'text' : 'password'}
      value={formData.password}
      onChange={handleInputChange}
      error={Boolean(formErrors.password)}
      helperText={formErrors.password}
      InputProps={{
        endAdornment: (
          <IconButton
            aria-label="toggle password visibility"
            onClick={toggleShowPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
    />
    <TextField
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      value={formData.confirmPassword}
      onChange={handleInputChange}
      error={Boolean(formErrors.confirmPassword)}
      helperText={formErrors.confirmPassword}
    />
    <br/>
    <p>
      By creating an account, I consent to the processing of my personal
      data in accordance with the <b>PRIVACY POLICY</b>
    </p>
    <br/>
    <Button onClick={handleSubmit}>CREATE</Button>
    
          <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  style={Modalstyle}
>
  <div style={{ textAlign: "center" }}>
    <h2>Registration Successful!</h2>
    <p>Your registration was successful.</p>
    <Link to="/login"><button onClick={() => setIsModalOpen(false)}>Close</button></Link>
  </div>
</Modal>     
      
     
    </Box>
    </Wrapper>
     </Container>
  );
};

export default Register;