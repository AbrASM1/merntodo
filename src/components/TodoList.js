import React, {useState} from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';


//pour le drag and drop que on voulait ajouter
const TodoListContainer = styled.div`
  margin-top: 20px;
`;

const SearchContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
  flex-grow: 1;

  &:focus {
    border-color: #3498db;
  }
`;

const SearchIcon = styled.span`
  margin-right: 8px;
`;

function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTodos = todos.filter((todo) =>
    todo.Todos.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {todos.length>1 && <SearchContainer>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      }<TodoListContainer>
        {filteredTodos.map((todo) => (
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
    </div>
  );
}
export default TodoList;
