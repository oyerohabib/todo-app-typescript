import React, { useState, useEffect } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      setTodos([...todos, { id: Date.now(), todo: input, isCompleted: false }]);
      setInput("");
    }
  };
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="App">
      <header>TASKIFY</header>
      <InputField input={input} setInput={setInput} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
