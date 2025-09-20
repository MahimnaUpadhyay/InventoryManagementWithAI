import React from "react";

const Todo = () => {
  const todos = ["Check Mail", "Check Stocks", "Check Sales", "Check Products"];

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4 text-text">Todo List</h3>
      <ul className="space-y-2">
        {todos.map((task, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-gray-700">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
