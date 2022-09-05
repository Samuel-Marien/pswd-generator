import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactSlider from 'react-slider'
import PropTypes from 'prop-types'

import { AiOutlineCopy } from 'react-icons/ai'
import { ImMagicWand } from 'react-icons/im'

const number = '012345678901234567890123456'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const symbol = '!@#$%^&*()?!@#$%^&*()?!@#$'
let chars = ''

const MyCheckBox = (props) => {
  const { title, checked, onChange } = props
  return (
    <div className="mt-2 ">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="w-6 h-6 accent-green-400 border-0 rounded-md focus:ring-0 mr-6"
          checked={checked}
          onChange={onChange}
        />
        {title}
      </label>
    </div>
  )
}
MyCheckBox.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

const StrengthLevel = (props) => {
  const { className } = props
  return (
    <div
      className={`${className} border border-slate-300 h-8 w-3 mr-2 transition-all duration-700 `}
    ></div>
  )
}
StrengthLevel.propTypes = {
  className: PropTypes.any
}

function App() {
  const [pswd, setPswd] = useState('')
  const [value, setValue] = useState(8)
  const [upperChecked, setUpperChecked] = useState(false)
  const [lowerChecked, setLowerChecked] = useState(false)
  const [numberChecked, setNumberChecked] = useState(false)
  const [symbolChecked, setSymbolChecked] = useState(false)
  const [levelIndicator, setLevelIndicator] = useState(0)
  const [strengthText, setStrengthText] = useState('')

  const fixPswd = (pswd, choiceArray) => {
    let randomNumber = Math.floor(Math.random() * choiceArray.length)
    pswd += choiceArray.substring(randomNumber, randomNumber + 1)
    let tempPswd = pswd.slice(1)
    pswd = tempPswd
    return pswd
  }

  const counter = (typeChecked) => {
    try {
      if (typeChecked) {
        setLevelIndicator(levelIndicator + 1)
      } else {
        if (levelIndicator > 0) setLevelIndicator(levelIndicator - 1)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // check length and options for set strengthLevel
  useEffect(() => {
    counter(upperChecked)
  }, [upperChecked])

  useEffect(() => {
    counter(lowerChecked)
  }, [lowerChecked])

  useEffect(() => {
    counter(numberChecked)
  }, [numberChecked])

  useEffect(() => {
    counter(symbolChecked)
  }, [symbolChecked])

  useEffect(() => {
    try {
      if (value >= 12 && value <= 13) {
        setLevelIndicator(levelIndicator + 1)
      } else {
        if (levelIndicator) {
          setLevelIndicator(levelIndicator - 1)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }, [value >= 12])

  useEffect(() => {
    switch (levelIndicator) {
      case 0:
        setStrengthText('security')
        break
      case 1:
        setStrengthText('low')
        break
      case 2:
      case 3:
        setStrengthText('medium')
        break
      case 4:
        setStrengthText('strong')
        break
      case 5:
        setStrengthText('heavy')
        break
      default:
        break
    }
  }, [levelIndicator])

  // console.log(levelIndicator)
  // console.log(strengthText)

  const genPassword = (userValue) => {
    //check user options and add to string
    if (upperChecked) {
      chars += upper
    }
    if (lowerChecked) {
      chars += lower
    }
    if (symbolChecked) {
      chars += symbol
    }
    if (numberChecked) {
      chars += number
    }

    // create pswd with user options
    let password = ''
    for (var i = 0; i <= userValue; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length)
      password += chars.substring(randomNumber, randomNumber + 1)
    }

    // check if one char minimum by option is present in password suggestion
    if (upperChecked) {
      if (!/[A-Z]/.test(password)) {
        password = fixPswd(password, upper)
      }
    }
    if (lowerChecked) {
      if (!/[a-z]/.test(password)) {
        password = fixPswd(password, lower)
      }
    }
    if (numberChecked) {
      if (!/[0-9]/.test(password)) {
        password = fixPswd(password, number)
      }
    }
    if (symbolChecked) {
      if (!/[!@#$%^&*()?]/.test(password)) {
        password = fixPswd(password, symbol)
      }
    }

    // set the pswd :)
    setPswd(password)

    // init the chars to empty for next iteration
    chars = ''
  }

  return (
    <div className="h-screen bg-black text-slate-700 flex flex-col pt-36 items-center font-cousine">
      <div className="text-2xl font-bold">Passw0rd Generat0r</div>
      <div className="mt-8 bg-slate-800 text-3xl text-slate-300 px-10 py-5 flex justify-between w-550 ">
        <p className="h-7">{pswd}</p>
        <p className="text-xl text-green-400 ">
          <AiOutlineCopy />
        </p>
      </div>
      <div className="mt-6 bg-slate-800  text-slate-300 px-10 py-5  w-550">
        <div className="flex justify-between">
          <p>Character Length</p>
          <p className="text-3xl font-black text-green-400">{value}</p>
        </div>
        <ReactSlider
          step={1}
          min={6}
          max={24}
          className="w-full h-3 pr-2 my-4 bg-slate-900 rounded-md cursor-grab"
          thumbClassName=" w-6 h-6 cursor-grab bg-green-500 rounded-full -translate-y-1.5 focus:outline-none"
          value={value}
          onChange={(value) => {
            setValue(value)
          }}
        />
        <div className="block mt-10">
          <MyCheckBox
            title="Include uppers case letters ?"
            checked={upperChecked}
            onChange={() => {
              setUpperChecked(() => (upperChecked ? false : true))
            }}
          />
          <MyCheckBox
            title="Include lowers case letters ?"
            checked={lowerChecked}
            onChange={() => {
              setLowerChecked(() => (lowerChecked ? false : true))
            }}
          />
          <MyCheckBox
            title="Include Numbers ?"
            checked={numberChecked}
            onChange={() => {
              setNumberChecked(() => (numberChecked ? false : true))
            }}
          />
          <MyCheckBox
            title="Include Symbols ?"
            checked={symbolChecked}
            onChange={() => {
              setSymbolChecked(() => (symbolChecked ? false : true))
            }}
          />
        </div>
        <div className="p-4 mt-6 bg-black h-16 w-full flex justify-between items-baseline">
          <p className="pt-1 text-xl text-slate-400 font-bold ">STRENGTH</p>
          <div className="flex items-center">
            <p className="uppercase transition-all duration-500 text-xl text-slate-300 mr-4">
              {strengthText}
            </p>
            <div className="flex">
              <StrengthLevel
                className={
                  levelIndicator && `bg-yellow-200 shadow-lg shadow-yellow-200`
                }
              />
              <StrengthLevel
                className={
                  levelIndicator >= 2 &&
                  `bg-yellow-200 shadow-lg shadow-yellow-200`
                }
              />
              <StrengthLevel
                className={
                  levelIndicator >= 4 &&
                  `bg-yellow-200 shadow-lg shadow-yellow-200`
                }
              />
              <StrengthLevel
                className={
                  levelIndicator === 5 &&
                  `bg-yellow-200 shadow-lg shadow-yellow-200`
                }
              />
            </div>
          </div>
        </div>
        {upperChecked || lowerChecked || numberChecked || symbolChecked ? (
          <button
            onClick={() => genPassword(value - 1)}
            className="flex justify-center py-4 mt-10 bg-green-400 text-slate-800 font-bold w-full 
          tracking-widest shadow-md shadow-slate-900 hover:shadow-none hover:bg-slate-700 
          hover:text-slate-200 hover:rounded-xl transition-all duration-500"
          >
            GENERATE
            <span className="ml-4 animate-pulse hover:scale-150">
              <ImMagicWand />
            </span>
          </button>
        ) : (
          <button
            disabled
            className="flex justify-center py-4 mt-10 bg-green-400 text-slate-900 font-bold w-full transition-all duration-500 opacity-50"
          >
            Choose your option(s)...
          </button>
        )}
      </div>
    </div>
  )
}

export default App
