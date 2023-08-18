import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch} from "react-redux";

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


const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const { error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} >
            LOGIN
          </Button>
          {/* {<Error>Something went wrong...</Error>} */}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;