import React from 'react';
import Navbar from '../components/NavBar';
import { Carousel } from "../components/Carousel";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CallToActionButton = styled(Link)`
  background-color: #3498db;
  color: #fff;
  font-size: 18px;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin: 50px;
  text-decoration: none; /* Add this line to remove underline from Link */
  
  &:hover {
    background-color: #2980b9;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Help() {
  return (
    <>
      <Navbar />
      <CenteredContainer>
        <Carousel />
        
      </CenteredContainer>
      <CenteredContainer>
      <CallToActionButton to="/">Getting Started!</CallToActionButton>
      </CenteredContainer>
    </>
  );
}

export default Help;
