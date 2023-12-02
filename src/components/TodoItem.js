import React, { useState } from 'react';
import styled from 'styled-components';
//Implementation du drag and drop context

// css des composantes
const TodoItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  position: relative;
  padding: 16px;
  border-radius: 25px 10px;
  background-color: ${props => {
    return props.priority;
  }};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  opacity: ${props => props.checked ? '0.5' : '1'};
  cursor: pointer;
  border: 2px solid transparent;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input {
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    position: relative;
    display: inline-block;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border: 1px solid #ccc;
    margin-right: 10px;

    &::after {
      content: "\u2713";
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: none;
    }
  }

  input:checked + .checkmark {
    background-color: #2196f3;
  }

  input:checked + .checkmark::after {
    display: block;
  }
`;

const TodoText = styled.p`
  font-size: 18px;
  margin: 0;
  flex-grow: 1;
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
`;

const DeleteButton = styled.button`
  background-color: #d12c2c;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  &:hover,
  &:active {
    color: black;
    background-color:white;
  }
`;
const ModifyButton = styled.button`
  background-color: #1b4ad8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  position:absolute;
  top: 16px;
  right:100px;
  &:hover,
  &:active {
    color: black;
    background-color:white;
  }
`;

const Description = styled.div`
  margin-top: 4px;
  font-size: 14px;
  max-width: 80%;
  word-wrap: break-word;
`;

const Deadline = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;
const StyledInput = styled.input`
 border: none;
 background-color: transparent;
 width:400px;
`;

function TodoItem({ todo, onToggle, onDelete, todoId, onUpdate }) {

  const [description, setDescription] = useState(todo.description);
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    onUpdate(todoId, todo.text, e.target.value, todo.deadline);
  };
  const [text, setText] = useState(todo.text);
  const handletextChange = (e) => {
    setText(e.target.value);
    onUpdate(todoId, e.target.value, todo.description, todo.deadline);
  };
  const [deadline, setDeadline] = useState(todo.deadline);
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    onUpdate(todoId, todo.text, todo.description, e.target.value);
  };
  return (
    <TodoItemContainer
      checked={todo.checked}
      priority={todo.priority}
    >
      <Checkbox>
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => onToggle(todoId)}
        />
        <span className="checkmark"></span>
      </Checkbox>
      <div>
        <TodoText checked={todo.checked}>
          <StyledInput value={text} onChange={handletextChange} />
        </TodoText>

        {todo.description && <Description><StyledInput value={description} onChange={handleDescriptionChange} /></Description>}
        {todo.deadline && <Deadline>Deadline: <StyledInput value={deadline} onChange={handleDeadlineChange} /></Deadline>}
      </div>
      <DeleteButton onClick={() => onDelete(todoId)}>Delete</DeleteButton>

    </TodoItemContainer>
  );
}// les deux condition sont pour les todo vide

export default TodoItem;