import React from 'react'
export function ExampleTerminal() {
  return (
    <div className="bg-black p-4 text-green-400 font-mono text-sm">
      <div className="flex space-x-1 mb-4">
        <div className="bg-red-500 w-3 h-3 rounded-full"></div>
        <div className="bg-yellow-500 w-3 h-3 rounded-full"></div>
        <div className="bg-green-500 w-3 h-3 rounded-full"></div>
      </div>
      <p className="text-white">~/code/patterns (-zsh)</p>
      <p>
        <span className="text-red-500">→</span>
        <span className="text-red-500"> patterns git:</span>
        <span className="text-blue-500">(main)</span>
        <span className="text-white"> x git status</span>
      </p>
      <p>On branch main</p>
      <p>Your branch is ahead of 'origin/main' by 1 commit.</p>
      <p>(use "git push" to publish your local commits)</p>
      <p></p>
      <p>Changes to be committed:</p>
      <p>(use "git restore --staged &lt;file&gt;..." to unstage)</p>
      <p className="text-green-500">new file: launch.js</p>
      <br />
      <p>
        <span className="text-red-500">→</span>
        <span className="text-red-500"> patterns git:</span>
        <span className="text-blue-500">(main)</span>
        <span className="text-white"> x git add .</span>
      </p>
      <p>
        <span className="text-red-500">→</span>
        <span className="text-red-500"> patterns git:</span>
        <span className="text-blue-500">(main)</span>
        <span className="text-white"> x git commit -m "Launch!"</span>
      </p>
      <div className="absolute top-4 right-4 h-4 w-4 text-red-500" />
    </div>
  )
}
