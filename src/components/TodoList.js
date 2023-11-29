import React from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';


//pour le drag and drop que on voulait ajouter
const TodoListContainer = styled.div`
  margin-top: 20px;
`;

function TodoList({ todos, onToggle, onDelete, onUpdate }) {


  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo.Todos}
          onToggle={onToggle}
          onDelete={onDelete}
          todoId={todo._id}
          onUpdate={onUpdate}
        />
      ))}
    </TodoListContainer>
  );
}

export default TodoList;
