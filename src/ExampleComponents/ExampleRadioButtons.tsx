import React from 'react'
import { CheckIcon } from 'lucide-react'

export function ExampleRadioButtons() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold mb-2">Choose an option</legend>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="options"
            className="hidden peer"
            id="option1"
          />
          <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
            <CheckIcon className="w-2 h-2 text-white hidden peer-checked:block" />
          </div>
          <span className="text-gray-900">Option 1</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="options"
            className="hidden peer"
            id="option2"
          />
          <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
            <CheckIcon className="w-2 h-2 text-white hidden peer-checked:block" />
          </div>
          <span className="text-gray-900">Option 2</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="options"
            className="hidden peer"
            id="option3"
          />
          <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
            <CheckIcon className="w-2 h-2 text-white hidden peer-checked:block" />
          </div>
          <span className="text-gray-900">Option 3</span>
        </label>
      </fieldset>
    </div>
  )
}
