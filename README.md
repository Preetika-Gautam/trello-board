# 📝 Trello-style Todo Board (React + TypeScript + Vite)

A minimal Trello-style Todo board built using **React**, **TypeScript**, **SCSS Modules**, and **Vite**. It supports drag-and-drop functionality powered by [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd), allowing users to manage tasks across **Pending**, **In Progress**, and **Completed** columns.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation & Running Locally

```bash
git clone https://github.com/your-username/todo-board.git
cd todo-board
npm install
npm run dev


 Approach
A Brief Explanation of the Approach Taken
Component-based Architecture: The project is organized into reusable components (Board, Lane, TodoCard, etc.) to maintain a clean structure and ease future scalability.

Drag and Drop Functionality: Implemented using @hello-pangea/dnd, which simplifies the drag logic while maintaining good performance and accessibility.

Filtered Rendering: Todos are fetched and filtered by their status (pending, inProgress, or completed) and then rendered under corresponding columns.

Todo CRUD: A simple interface to add and delete todos. Each column has a button to add new tasks, and each card has a delete option.

API Integration: Todos are fetched from DummyJSON to simulate real API behavior.

Scoped Styling: CSS Modules are used to ensure styling is local to each component, avoiding global style conflicts.

Trade-offs & Improvements
Current Trade-offs
State Management: The project uses useState for local state management. For larger applications, this can get harder to maintain.

Persistence: Changes like dragging or deleting tasks are not persisted to the backend, since DummyJSON is a mock API.

Minimal Form Handling: No validations or feedback on adding empty todos or errors.

Possible Improvements
✅ Backend Integration: Connect to a real backend or Firebase to persist todo states and updates.

🗃️ Global State Management: Use Redux, Zustand, or Context API to handle shared state more efficiently.

🎨 Enhanced UX/UI: Add animations during drag, success/error toasts, and improved styling.

🔄 Reordering Within Columns: Currently, you can only move tasks between columns. Drag-to-reorder within the same column can be added.

🔐 User Authentication: Enable users to log in and manage their own boards.

🧪 Testing: Add unit and integration tests using tools like Jest and React Testing Library.
```
