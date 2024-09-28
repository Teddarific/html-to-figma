import { Plus, Minus, X, Divide, Superscript } from 'lucide-react'
import React, { useState } from 'react'
export const ExampleCalculator = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<any>([])
  const handleInput = (value: any) => {
    setInput((prevState) => prevState + value)
  }
  const calculateResult = () => {
    try {
      // Using 'eval' for demonstration purposes. In real-world applications, use a proper math parser.
      const result = eval(input)
      setHistory([
        ...history,
        {
          expression: input,
          result,
        },
      ])
      setInput(String(result))
    } catch (error) {
      setInput('Error')
    }
  }
  const clearInput = () => {
    setInput('')
  }
  const backspaceInput = () => {
    setInput(input.slice(0, -1))
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <div className="w-full mb-4 text-right text-2xl p-2 border border-gray-300 rounded">
          <span>{input || '0'}</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button
            className="p-2 bg-gray-200 rounded flex items-center justify-center"
            onClick={() => handleInput('(')}
          >
            (
          </button>
          <button
            className="p-2 bg-gray-200 rounded flex items-center justify-center"
            onClick={() => handleInput(')')}
          >
            )
          </button>
          <button
            className="p-2 bg-gray-200 rounded flex items-center justify-center"
            onClick={backspaceInput}
          >
            ←
          </button>
          <button
            className="p-2 bg-red-300 rounded flex items-center justify-center"
            onClick={clearInput}
          >
            C
          </button>

          {/* Row 2 */}
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('7')}
          >
            7
          </button>
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('8')}
          >
            8
          </button>
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('9')}
          >
            9
          </button>
          <button
            className="p-2 bg-yellow-300 rounded flex items-center justify-center"
            onClick={() => handleInput('/')}
          >
            <Divide />
          </button>

          {/* Row 3 */}
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('4')}
          >
            4
          </button>
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('5')}
          >
            5
          </button>
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('6')}
          >
            6
          </button>
          <button
            className="p-2 bg-yellow-300 rounded flex items-center justify-center"
            onClick={() => handleInput('*')}
          >
            <X />
          </button>

          {/* Row 4 */}
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('1')}
          >
            1
          </button>
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('2')}
          >
            2
          </button>
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('3')}
          >
            3
          </button>
          <button
            className="p-2 bg-yellow-300 rounded flex items-center justify-center"
            onClick={() => handleInput('-')}
          >
            <Minus />
          </button>

          {/* Row 5 */}
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('0')}
          >
            0
          </button>
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => handleInput('.')}
          >
            .
          </button>
          <button
            className="p-2 bg-green-300 rounded"
            onClick={calculateResult}
          >
            =
          </button>
          <button
            className="p-2 bg-yellow-300 rounded flex items-center justify-center"
            onClick={() => handleInput('+')}
          >
            <Plus />
          </button>

          {/* Row 6 - Advanced Functions */}
          <button
            className="p-2 bg-gray-200 rounded flex items-center justify-center"
            onClick={() => handleInput('**')}
          >
            <Superscript />
          </button>
          <button
            className="p-2 bg-gray-200 rounded flex items-center justify-center"
            onClick={() => handleInput('Math.sqrt(')}
          >
            <div />
          </button>
          <button
            className="p-2 bg-gray-200 rounded flex items-center justify-center"
            onClick={() => handleInput('Math.sin(')}
          >
            sin
          </button>
          <button
            className="p-2 bg-gray-200 rounded flex items-center justify-center"
            onClick={() => handleInput('Math.cos(')}
          >
            cos
          </button>
          <button
            className="p-2 bg-gray-200 rounded flex items-center justify-center"
            onClick={() => handleInput('Math.tan(')}
          >
            tan
          </button>
        </div>
      </div>

      <div className="mt-8 w-full max-w-xs bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg mb-2">History</h2>
        <ul className="overflow-y-auto max-h-32">
          {history.map((entry: any, index: any) => (
            <li key={index} className="mb-1">
              <span>{entry.expression}</span> = <span>{entry.result}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
