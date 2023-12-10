import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { LogOut } from 'lucide-react';
import DarkMode from './DarkMode';
const NavbarContainer = styled.div`
  background-color: #222d5a;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 98%;
  z-index: 1000;
  align-items: center;
`;


const NavbarBrand = styled.h2`
  color: #fff;
  margin: 0;
`;

const NavbarLinks = styled.ul`
  color: #fff;
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  justify-content: center;
`;

const NavbarLink = styled.li`
  margin-left: 1rem;
  color: #fafafa;
  text-decoration: none;

  &:first-child {
    margin-left: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fafafa;
  font-size: 1.2em;
  transition: color 0.3s;
  margin-right: 20px; 

  &:hover {
    color: #000;
  }
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const GreetingContainer = styled.div`
  padding-right: 13%;
  color: #fff;
  animation: ${fadeInOut} 4s ease-out;
  margin-left: 10px;

`;



function Navbar() {
  const [credentials,setCredentials] = useContext(CredentialsContext);
  const [showGreeting, setShowGreeting] = useState(true);
  function logout (){
    localStorage.removeItem("jwtToken");
    setCredentials('');
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowGreeting(false);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NavbarContainer>
      <NavbarBrand>
        <StyledLink to="/">Todo List</StyledLink>
      </NavbarBrand>

      {(showGreeting && credentials.username) && (
        <GreetingContainer>
          <p style={{ fontSize: '25px', marginLeft:'200px' }}>Hello, {credentials.username}!</p>
        </GreetingContainer>
      )}
      <NavbarLinks>
      {credentials.username &&<StyledLink to="/help">
              Help             
            </StyledLink>
      }  <DarkMode />
        {credentials.username && (
          <NavbarLink>
            <StyledLink to="/" onClick={logout}>
              <LogOut />
            </StyledLink>
          </NavbarLink>
        )}
      </NavbarLinks>
    </NavbarContainer>
  );
}

export default Navbar;