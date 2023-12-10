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
  border-radius: 20px 10px 20px 20px;
  background-color: ${props => {
    return props.priority;
  }};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  opacity: ${props => (props.checked ? '0.75' : '1')};
  cursor: pointer;
  border: 2px solid transparent;
  height: 13px; 
  transition: height 0.3s ease; 

  &:hover {
    height: 100%; /* Expand to 100% height on hover */
  }
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  input {
    margin-bottom: 0;
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
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
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

function remainingTimeWarning(targetDate, targetTime) {
  // Combine date and time parameters into a single string
  const warningThresholdMinutes = 30;
  const targetDateTimeString = `${targetDate}T${targetTime}`;
  
  // Split date and time
  const [datePart, timePart] = targetDateTimeString.split('T');
  
  // Convert the target date and time strings to a Date object
  const targetDateTime = new Date(`${datePart} ${timePart}`);

  // Calculate the remaining time in milliseconds
  const currentTime = new Date();
  const remainingTime = targetDateTime - currentTime;
  console.log("1 " + warningThresholdMinutes + " 2 " + targetDateTimeString + " 3 " + targetDateTime + " 4 " + currentTime + " 5 " + remainingTime + " 6 " + targetDate + " 7 " + targetTime);

  // Convert remaining time from milliseconds to minutes
  const remainingMinutes = Math.max(remainingTime / (1000 * 60), 0);

  // Check if the remaining time is less than the warning threshold
  if (remainingMinutes <= warningThresholdMinutes && remainingMinutes !==0) {
    // Display a warning icon or perform any other action
    return(`⚠️ Warning: Time is running out! less than ${remainingMinutes}`);
  }else if(remainingMinutes===0||Math.floor((remainingMinutes/60)/24)===0 ){
    return"Time passed !";
  }else{
    return (`Remainig Time: ${Math.floor((remainingMinutes/60)/24)} Days`);
  }

};
function TodoItem({ todo, onToggle, onDelete, todoId, onUpdate }) {

  const [description, setDescription] = useState(todo.description);
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    onUpdate(todoId, todo.text, e.target.value, todo.deadline,todo.time);
  };
  const [text, setText] = useState(todo.text);
  const handletextChange = (e) => {
    setText(e.target.value);
    onUpdate(todoId, e.target.value, todo.description, todo.deadline,todo.time);
  };
  const [deadline, setDeadline] = useState(todo.deadline);
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    onUpdate(todoId, todo.text, todo.description, e.target.value,todo.time);
  };
  const [time, setTime] = useState(todo.time);
  
  const handleTimeChange = (e) => {
    setTime(e.target.value);
    onUpdate(todoId, todo.text, todo.description, todo.deadline,e.target.value);
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
        {todo.deadline && <Deadline>Deadline: <StyledInput value={new Date(deadline).toLocaleDateString()} onChange={handleDeadlineChange} /></Deadline>}
        {todo.time && <Deadline>At: <StyledInput value={time} onChange={handleTimeChange}/></Deadline>}
        {(todo.time && todo.deadline)&& <Deadline>{remainingTimeWarning(deadline,time)}</Deadline>}
      </div>
      <DeleteButton onClick={() => onDelete(todoId)} ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.364 5.63605C18.7566 6.02868 18.7566 6.66132 18.364 7.05395L13.414 12.004L18.364 16.954C18.7566 17.3466 18.7566 17.9792 18.364 18.3718C17.9714 18.7644 17.3388 18.7644 16.9462 18.3718L12 13.425L7.04998 18.3718C6.65735 18.7644 6.02471 18.7644 5.63208 18.3718C5.23945 17.9792 5.23945 17.3466 5.63208 16.954L10.582 12.004L5.63208 7.05395C5.23945 6.66132 5.23945 6.02868 5.63208 5.63605C6.02471 5.24342 6.65735 5.24342 7.04998 5.63605L12 10.586L16.95 5.63605C17.3426 5.24342 17.9752 5.24342 18.364 5.63605Z" fill="#2C3E50"/></svg></DeleteButton>

    </TodoItemContainer>
  );
}
export default TodoItem;