import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { getAllTodos } from "../../services/todoService";
import { Todo } from "../../types/todo";
import Lane from "../Lane/Lane";
import styles from "./Board.module.scss";

const Board = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const all = await getAllTodos();
      setTodos(all);
    };
    fetchTodos();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId as Todo["status"];
    const destinationStatus = destination.droppableId as Todo["status"];

    const updatedTodos = [...todos];

    const sourceList = todos.filter((todo) => todo.status === sourceStatus);
    const destinationList = todos.filter(
      (todo) => todo.status === destinationStatus
    );

    const movedTodo = sourceList[source.index];

    const sourceIndexInGlobal = updatedTodos.findIndex(
      (todo) => todo.id === movedTodo.id
    );
    updatedTodos.splice(sourceIndexInGlobal, 1);

    const updatedTodo = { ...movedTodo, status: destinationStatus };

    const destinationIds = destinationList.map((t) => t.id);
    const beforeTodoId = destinationIds[destination.index];
    const destinationIndexInGlobal = beforeTodoId
      ? updatedTodos.findIndex((t) => t.id === beforeTodoId)
      : -1;

    if (destinationIndexInGlobal === -1) {
      updatedTodos.push(updatedTodo);
    } else {
      updatedTodos.splice(destinationIndexInGlobal, 0, updatedTodo);
    }
    setTodos(updatedTodos);
  };

  const pending = todos.filter((t) => t.status === "pending");
  const inProgress = todos.filter((t) => t.status === "inProgress");
  const completed = todos.filter((t) => t.status === "completed");

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.boardContainer}>
        <Lane
          status="pending"
          todos={pending}
          setTodos={setTodos}
          allTodos={todos}
        />
        <Lane
          status="inProgress"
          todos={inProgress}
          setTodos={setTodos}
          allTodos={todos}
        />
        <Lane
          status="completed"
          todos={completed}
          setTodos={setTodos}
          allTodos={todos}
        />
      </div>
    </DragDropContext>
  );
};

export default Board;
