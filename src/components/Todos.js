import React, { useContext, useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import styled from 'styled-components';
import TodoList from './TodoList';
import { CredentialsContext } from '../App';
import DarkMode from './DarkMode';
//import { handleErrors } from '../Routes/Register';
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;
function Todos() {
  const [credentials] = useContext(CredentialsContext);
  const [Todos, setTodos] = useState([]);
  const handleAddTodo = (newTodo) => {
    setTodos([...Todos, newTodo]);
  };

  const LeDelete = (id) => {

    const ID = { id };
    fetch("http://localhost:4000/todosdelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
        //  ...(todo._id ? { Id: `Basic ${todo._id}` } : {})
      },
      body: JSON.stringify(ID),
    })
      .then(() => { Fetcher() });

  }

  const handleDelete = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    LeDelete(id);
    //Fetcher();

  };

  const Fetcher = () => {
    console.log("sent");
    fetch("http://localhost:4000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      //.then(handleErrors)
      .then(response => response.json())
      .then(newTodos => {
        // setTodos(prevTodos => [...prevTodos, ...newTodos]);
        setTodos(newTodos);
      });
  }


  const LePasseur = (newTodos) => {
    //console.log("sent");
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    })
      //.then(handleErrors)
      .then(() => { Fetcher() });
  }
  const LeChecker = (todo) => {
    fetch("http://localhost:4000/todoscheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
        //  ...(todo._id ? { Id: `Basic ${todo._id}` } : {})
      },
      body: JSON.stringify(todo),
    })
  }
  const Updater = (todo) => {
    fetch("http://localhost:4000/todosupdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(todo),
    })
  }

  const handleToggle = (id) => {
    const UpdatedTodo = [...Todos];
    const todoItem = UpdatedTodo.find((todo) => todo._id === id);
    todoItem.Todos.checked = !todoItem.Todos.checked;
    setTodos(UpdatedTodo);
    LeChecker(todoItem);
  };
  const handleUpdate = (id, text, description, deadline) => {
    const UpdatedTodo = [...Todos];
    const todoItem = UpdatedTodo.find((todo) => todo._id === id);
    todoItem.Todos.text = text;
    todoItem.Todos.description = description;
    todoItem.Todos.deadline = deadline;
    setTodos(UpdatedTodo);
    Updater(todoItem);
  };

  useEffect(() => { Fetcher() }, []);


  return (


    <Container>
      <DarkMode />
      <AddTodoForm onAddTodo={handleAddTodo}
        LePasseur={LePasseur}
      />
      <TodoList
        todos={Todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

    </Container>

  );
}

export default Todos;