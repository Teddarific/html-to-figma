import { EditIcon, Trash2Icon, CheckIcon } from 'lucide-react'
import React from 'react'

export function ExampleTodoList() {
  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          className="w-full p-2 border rounded"
        />
        <button className="mt-2 w-full p-2 bg-blue-500 text-white rounded">
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        <li className="border rounded p-2 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              aria-label="Mark task as complete"
            />
            <span className="flex-1">Sample Task 1</span>
          </div>
          <div className="flex space-x-2">
            <button aria-label="Edit task">
              <EditIcon className="w-5 h-5" />
            </button>
            <button aria-label="Delete task">
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>
        </li>
        <li className="border rounded p-2 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              aria-label="Mark task as complete"
            />
            <span className="flex-1">Sample Task 2</span>
          </div>
          <div className="flex space-x-2">
            <button aria-label="Edit task">
              <EditIcon className="w-5 h-5" />
            </button>
            <button aria-label="Delete task">
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>
          <CheckIcon />
        </li>
      </ul>
    </main>
  )
}
