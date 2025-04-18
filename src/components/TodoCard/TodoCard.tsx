import React, { useState } from "react";
import { Todo } from "../../types/todo";
import { deleteTodo, updateTodo } from "../../services/todoService";
import { Draggable } from "@hello-pangea/dnd";
import styles from "./TodoCard.module.scss";

type Props = {
  todo: Todo;
  index: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  allTodos: Todo[];
};

const TodoCard: React.FC<Props> = ({ todo, index, setTodos, allTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.todo);

  const handleSave = async () => {
    const updated = await updateTodo({ ...todo, todo: editedTitle });
    const updatedTodos = allTodos.map((t) => (t.id === todo.id ? updated : t));
    setTodos(updatedTodos);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    setTodos(allTodos.filter((t) => t.id !== todo.id));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <div
          className={styles.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{todo.todo}</p>
              <div className={styles.actions}>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TodoCard;
