import React, { useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";

import { CredentialsContext } from '../App';
import styled from 'styled-components';
import Image7 from '../icons/image3.png';
import Navbar from '../components/NavBar';


const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6347;
  font-size: 0.8em;
  margin-top: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;





export const handleErrors = async (response)=>{
  if (!response.ok){
    //console.log(response)
    const {message} = await response.json();
    console.log("message",message);
    throw Error(message);
  }
  return response.json();
}
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Error,setError]= useState("");
  const [,setCredentials]= useContext(CredentialsContext);



  const register = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    //.then(handleErrors)
    
    .then((response) => {
      return response.json();
      //console.log(response.json())
    })
    .then((data)=>{
      // console.log(data);
      const token=data;
      //console.log(token);
      
      localStorage.setItem("jwtToken", token);
      //console.log(localStorage.getItem('jwtToken'))      
      setCredentials({
        username,
        password,  
      });
     navigate("/help");
    })
    .catch((error)=>{
      console.log("l'erreur:",error)
      setError(error.message);
    })
  }
    const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <RegisterContainer>
        <Image src={Image7}/>
    <FormContainer>
      <Heading>Register</Heading>
      {Error && <ErrorMessage>{Error}</ErrorMessage>}
      <Form onSubmit={register}>
        <Input onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Username' required />
        <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required />
     
        <Button type='submit'>Register</Button>
      </Form>
      </FormContainer>
    </RegisterContainer>
    </>
    
  );
}

export default Register;
