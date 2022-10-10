import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="todo-group">
      <Droppable droppableId="completed-todo">
        {(provided, snapshot) => (
          <div
            className={`todos completed ${
              snapshot.isDraggingOver ? "dragactive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h3>Completed</h3>
            {todos.map((todo, index) => (
              <SingleTodo
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="uncompleted-todo">
        {(provided, snapshot) => (
          <div
            className={`todos uncompleted ${
              snapshot.isDraggingOver ? "dragremove" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h3>Uncompleted</h3>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                key={todo.id}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
