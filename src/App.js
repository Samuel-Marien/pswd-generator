import React, { useState } from 'react'
import ReactSlider from 'react-slider'

// const number = '0123456789'
// const lower = 'abcdefghijklmnopqrstuvwxyz'
// const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// const sign = '!@#$%^&*()?'
const chars =
  '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()?ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function App() {
  const [pswd, setPswd] = useState('')
  const [value, setValue] = useState(1)

  const genPassword = (userValue) => {
    let password = ''
    for (var i = 0; i <= userValue; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length)
      password += chars.substring(randomNumber, randomNumber + 1)
    }
    setPswd(password)
  }

  return (
    <div className="text-center text-3xl mt-24">
      <div>
        <ReactSlider
          step={1}
          min={1}
          max={20}
          className="w-full h-3 pr-2 my-4 bg-gray-200 rounded-md cursor-grab"
          thumbClassName="absolute w-5 h-5 cursor-grab bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -top-2px"
          value={value}
          onChange={(value) => {
            setValue(value)
          }}
        />
        <span>{value}</span>

        <button
          onClick={() => genPassword(value - 1)}
          className="px-2 p-y1 rounded border shadow"
        >
          click to generate
        </button>
      </div>
      <p className="text-red-500 font-mono font-black text-3xl">{pswd}</p>
    </div>
  )
}

export default App
