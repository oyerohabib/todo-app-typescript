import React, { useState, useEffect, useRef } from "react";
import { Todo } from "../model";
import "../App.css";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [input, setInput] = useState<string>(todo.todo);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (input) {
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, todo: input } : todo)),
      );
      setEditMode(false);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  return (
    <div className="todo-item">
      {editMode ? (
        <form onSubmit={(e) => handleEdit(e, todo.id)}>
          <input
            type="text"
            placeholder="update todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
        </form>
      ) : todo.isCompleted ? (
        <li>
          <s>{todo.todo}</s>
        </li>
      ) : (
        <li>{todo.todo}</li>
      )}

      <span>
        <i
          onClick={() => {
            if (!editMode && !todo.isCompleted) {
              setEditMode(!editMode);
            }
          }}
        >
          Edit
        </i>
        <i onClick={() => handleDelete(todo.id)}>Delete</i>
        <i onClick={() => handleComplete(todo.id)}>Completed</i>
      </span>
    </div>
  );
};

export default SingleTodo;
