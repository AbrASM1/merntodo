import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image1 from '../icons/image1.png';
import { CredentialsContext } from '../App';
import Todos from '../components/Todos';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Heading = styled.h1`
  font-size: 2em;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-size: 1.2em;
  display: block;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`;

const FancyButton = styled.button`
  width: 120px;
  hight:60px;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const Image = styled.img`
  max-width: 736px;
  height: 552px;
  margin-bottom: 20px;
`;
function Home() {
  
  const [credentials]= useContext(CredentialsContext);
  
  return (
    <>
    {!credentials.username ? (
      <Container>
        <br />
        <Image src={Image1} alt="Illustration" />
        <StyledLink to="/register">
          <FancyButton>Register</FancyButton>
        </StyledLink>
        <StyledLink to="/login">
          <FancyButton>Login</FancyButton>
        </StyledLink>
        <br />
      </Container>
    ) : (
      <Heading>Welcome {credentials.username}</Heading>
    )}
      {credentials.username && <Todos/>}
    </>
  );
}

export default Home;
