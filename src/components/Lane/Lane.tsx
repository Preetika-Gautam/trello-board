import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { createTodo } from "../../services/todoService";
import { Todo } from "../../types/todo";
import TodoCard from "../TodoCard/TodoCard";
import styles from "./Lane.module.scss";

type LaneProps = {
  status: "pending" | "inProgress" | "completed";
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  allTodos: Todo[];
};

const statusLabels: Record<LaneProps["status"], string> = {
  pending: "Pending",
  inProgress: "In Progress",
  completed: "Completed",
};

const Lane: React.FC<LaneProps> = ({ status, todos, setTodos, allTodos }) => {
  const [newTitle, setNewTitle] = useState("");

  const handleAddTodo = async () => {
    if (!newTitle.trim()) return;
    const newTodo = await createTodo(newTitle);
    newTodo.status = status;
    setTodos([...allTodos, newTodo]);
    setNewTitle("");
  };

  return (
    <div className={styles.lane}>
      <h3>{statusLabels[status]}</h3>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className={styles.cards}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, index) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                index={index}
                setTodos={setTodos}
                allTodos={allTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className={styles.newTodo}>
        <input
          type="text"
          placeholder="New task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );
};

export default Lane;
