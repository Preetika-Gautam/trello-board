import axios from "axios";
import { Todo } from "../types/todo";

const API_URL = "https://dummyjson.com/todos";

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_URL}?limit=100`);
  return response.data.todos.map((todo: any) => ({
    ...todo,
    status: todo.completed ? "completed" : "pending",
  }));
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post(`${API_URL}/add`, {
    todo: title,
    completed: false,
    userId: 1,
  });
  return { ...response.data, status: "pending" };
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${todo.id}`, {
    todo: todo.todo,
    completed: todo.status === "completed",
  });
  return { ...response.data, status: todo.status };
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
