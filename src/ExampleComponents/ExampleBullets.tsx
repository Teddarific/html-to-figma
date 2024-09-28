import {
  MicIcon,
  MessageSquareIcon,
  UserIcon,
  CheckCircleIcon,
  CalendarIcon,
} from 'lucide-react'
import React from 'react'

export const ExampleBullets: React.FC = () => {
  return (
    <div className="max-w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white min-h-screen">
      <header className="bg-blue-600 py-4 px-6">
        <h1 className="text-2xl font-bold">Flute Genius</h1>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MicIcon className="mr-2" /> AI Flute Coach
            </h2>
            <p className="mb-4">
              Get personalized feedback and AI-generated lesson plans to improve
              your flute skills.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Start Session
            </button>
          </section>
          <section className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <div className="mr-2" /> Tuning Assistant
            </h2>
            <p className="mb-4">
              Fine-tune your flute with AI-powered tuning advice.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Start Tuning
            </button>
          </section>
        </div>
        <section className="bg-white rounded-lg shadow-lg p-6 mt-6 text-gray-800">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquareIcon className="mr-2" /> AI Flute Chat
          </h2>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-gray-600">
              AI Coach: Hi there! How can I assist you with your flute practice
              today?
            </p>
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2"
              placeholder="Type your message..."
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
              Send
            </button>
          </div>
        </section>
        <section className="bg-white rounded-lg shadow-lg p-6 mt-6 text-gray-800">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <CalendarIcon className="mr-2" /> Practice Schedule
          </h2>
          <ul className="mb-4">
            <li className="flex items-center mb-2">
              <CheckCircleIcon className="mr-2 text-green-500" /> Practice
              scales for 30 minutes
            </li>
            <li className="flex items-center mb-2">
              <CheckCircleIcon className="mr-2 text-green-500" /> Work on
              articulation exercises
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-gray-400">⬜</span> Learn new piece:
              Sonata in G Major
            </li>
          </ul>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            View Full Schedule
          </button>
        </section>
        <section className="bg-white rounded-lg shadow-lg p-6 mt-6 text-gray-800">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <UserIcon className="text-gray-400 w-8 h-8" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-600">Flute Enthusiast</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Progress</h3>
            <div className="bg-gray-200 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full w-1/2"></div>
            </div>
            <p className="text-gray-600 mt-2">50% of goals completed</p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            View Profile
          </button>
        </section>
      </main>
      <footer className="bg-blue-600 py-4 px-6 text-center">
        <p>&copy; 2023 Flute Genius. All rights reserved.</p>
      </footer>
    </div>
  )
}
