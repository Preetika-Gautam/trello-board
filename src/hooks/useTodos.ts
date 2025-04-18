import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { getAllTodos } from "../services/todoService";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTodos = async () => {
    try {
      setLoading(true);
      const data = await getAllTodos();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const filteredTodos = {
    pending: todos.filter((todo) => todo.status === "pending"),
    inProgress: todos.filter((todo) => todo.status === "inProgress"),
    completed: todos.filter((todo) => todo.status === "completed"),
  };

  return {
    todos,
    setTodos,
    filteredTodos,
    loading,
    refetch: getTodos,
  };
};
