import { MoonIcon, SunIcon } from 'lucide-react'
import React, { useState } from 'react'

export function ExampleTextArea() {
  const [text, setText] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }
  return (
    <div
      style={{
        maxWidth: '100%',
        padding: '20px',
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2
          style={{
            color: isDarkMode ? '#ffffff' : '#000000',
            margin: 0,
          }}
        >
          Dark Mode Text Area
        </h2>
        <button
          onClick={toggleDarkMode}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isDarkMode ? (
            <SunIcon size={24} color="#ffffff" />
          ) : (
            <MoonIcon size={24} color="#000000" />
          )}
        </button>
      </div>
      <div
        style={{
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: isDarkMode
            ? '0 0 10px rgba(255, 255, 255, 0.1)'
            : '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here..."
          style={{
            width: '100%',
            height: '300px',
            padding: '15px',
            fontSize: '16px',
            lineHeight: '1.5',
            color: isDarkMode ? '#e0e0e0' : '#333333',
            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
            border: 'none',
            borderRadius: '8px',
            resize: 'vertical',
            transition: 'all 0.3s ease',
            outline: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            fontSize: '12px',
            color: isDarkMode ? '#666666' : '#999999',
          }}
        >
          {text.length} characters
        </div>
      </div>
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          borderRadius: '8px',
          backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
          color: isDarkMode ? '#e0e0e0' : '#333333',
          fontSize: '14px',
          lineHeight: '1.6',
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        <h3
          style={{
            margin: '0 0 10px 0',
            color: isDarkMode ? '#ffffff' : '#000000',
          }}
        >
          Preview:
        </h3>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
          }}
        >
          {text || 'Your text will appear here...'}
        </pre>
      </div>
    </div>
  )
}
