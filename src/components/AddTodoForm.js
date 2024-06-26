import React, { useState } from 'react';
import styled from 'styled-components';
// css
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin:10%;
`;
const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 8px;
  border: 1px solid lightgray;
  outline: none;
  border-radius: 4px;
  background-color: #f5f5f5; /* Light gray background */
`;

const DescriptionInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 8px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 4px;
  background-color: #f5f5f5; /* Light gray background */
`;

const DeadlineInput = styled.input`
  padding: 12px;
  font-size: 16px;
  padding-left: 18px;
  margin-bottom: 8px;
  border: 1px solid lightgray;
  outline: none;
  border-radius: 4px;
  background-color: #f5f5f5; /* Light gray background */
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
  background-color: #f5f5f5; /* Light gray background */

  &:focus {
    border-color: #3498db;
  }
`;

const AddButton = styled.button`
  background-color: #539adb/* #4caf50 */;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  &:hover,
  &:active {
    color: black;
    background-color:gray;
  }
`;
const ColorInput = styled.input`
appearance: none;
width: 50%;
height: 30px;
padding: 5px; /* Added padding */
margin-right: 10px; /* Added margin-right for spacing */
border: none;
border-radius: 5px;
outline: none;
cursor: pointer;
background: linear-gradient(to right, #ff7e5f, #feb47b);
transition: background 0.3s ease-in-out;
margin-left:25%;

&::-webkit-color-swatch-wrapper {
  padding: 0;
}

&::-webkit-color-swatch {
  border: none;
  border-radius: 5px;
}

&:hover {
  background: linear-gradient(to right, #8e44ad, #3498db);
  }
`;
const StyledDiv = styled.div`
    margin:10px;
`;
const OptionalLabel = styled.label`
  font-size: 14px;
  color: #888;
  margin-left: auto;
  display: block;
  text-align: right;
`;
function AddTodoForm({ onAddTodo, LePasseur }) {
  //j'ai utiliser useState pour les changemment d'etats
  const [inputText, setInputText] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [time,setTime]=useState('');
  const [priority, setPriority] = useState('#fafafa');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onAddTodo({
        Todos: {
          text: inputText,
          description,
          deadline,
          priority,
          checked: false,
          time:time,
        }
      });
      // les defaults
      const newTodos = {
        text: inputText,
        description,
        deadline,
        priority,
        checked: false,
        time:time,

      };
      setInputText('');
      setDescription('');
      setDeadline('');
      setPriority('normal');
      setTime('');
      LePasseur(newTodos);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <OptionalLabel>
      (*) Stands for "Optional"
    </OptionalLabel>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a new todo"
      />
      <DescriptionInput
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description *"
      />
      
      <label style={{marginLeft:'2%'}}>Select a date: *</label>
      <DeadlineInput
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <label style={{marginLeft:'2%'}}>Select a time: *</label>
      <StyledInput
        type="time"
        id="timeInput"
        name="timeInput"
        value={time}
        onChange={(e)=>setTime(e.target.value)}
      />
      <StyledDiv>
        <label style={{marginLeft:'1%'}} >Choose color: *          </label>
        <ColorInput
          type='color'
          value={priority}
          onChange={(e) => setPriority(e.target.value)} />
      </StyledDiv>
      <AddButton type="submit">Add</AddButton>
    </Form>
  );
}

export default AddTodoForm;
