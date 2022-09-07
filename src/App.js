import React, { useState, useEffect } from 'react'
import ReactSlider from 'react-slider'

import MyCheckBox from './components/MyCheckBox'
import StrengthLevel from './components/StrengthLevel'

import { AiOutlineCopy } from 'react-icons/ai'
import { ImMagicWand } from 'react-icons/im'

const number = '012345678901234567890123456'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const symbol = '!@#$%^&*()?!@#$%^&*()?!@#$'
let chars = ''

function App() {
  const [pswd, setPswd] = useState('')
  const [value, setValue] = useState(8)
  const [upperChecked, setUpperChecked] = useState(false)
  const [lowerChecked, setLowerChecked] = useState(true)
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
        setStrengthText('level')
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
    <div className="h-screen bg-black text-slate-700 flex flex-col pt-5 mysm:pt-36 items-center font-cousine">
      <div className="text-2xl font-bold">Passw0rd Generat0r</div>
      <div className="mt-8 bg-slate-800 text-base mysm:text-3xl text-slate-300 px-5 py-2 mysm:px-10 mysm:py-5 flex justify-between  mysm:w-550 w-80">
        <p className="h-7">{pswd}</p>

        <p
          className="text-xl text-green-400 cursor-pointer hover:scale-125 hover:text-green-200 transition-all duration-300"
          onClick={() => {
            navigator.clipboard.writeText(pswd)
          }}
        >
          <AiOutlineCopy />
        </p>
      </div>
      <div className="mt-6 bg-slate-800  text-slate-300 px-5 py-2 mysm:px-10 mysm:py-5 mysm:w-550 w-80">
        <div className="flex justify-between items-center">
          <p>Character Length</p>
          <p className="text-2xl mysm:text-3xl font-black text-green-400">
            {value}
          </p>
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
            title="Include upper-cases ?"
            checked={upperChecked}
            onChange={() => {
              setUpperChecked(() => (upperChecked ? false : true))
            }}
          />
          <MyCheckBox
            title="Include lower-cases ?"
            checked={lowerChecked}
            onChange={() => {
              setLowerChecked(() => (lowerChecked ? false : true))
            }}
          />
          <MyCheckBox
            title="Include numbers ?"
            checked={numberChecked}
            onChange={() => {
              setNumberChecked(() => (numberChecked ? false : true))
            }}
          />
          <MyCheckBox
            title="Include symbols ?"
            checked={symbolChecked}
            onChange={() => {
              setSymbolChecked(() => (symbolChecked ? false : true))
            }}
          />
        </div>
        <div className="p-4 mt-6 bg-black h-16 w-full flex justify-between items-baseline">
          <p className="pt-1 mysm:text-xl text-slate-400 font-bold ">
            STRENGTH
          </p>
          <div className="flex items-center">
            <p className="uppercase transition-all duration-500  mysm:text-xl text-slate-300 mr-4">
              {strengthText}
            </p>
            <div className="flex">
              <StrengthLevel
                className={
                  levelIndicator &&
                  `bg-amber-200 shadow-lg shadow-amber-200 border-none `
                }
              />
              <StrengthLevel
                className={
                  levelIndicator >= 2 &&
                  `bg-amber-400 shadow-lg shadow-amber-400 border-none `
                }
              />
              <StrengthLevel
                className={
                  levelIndicator >= 4 &&
                  `bg-orange-600 shadow-lg shadow-orange-600 border-none `
                }
              />
              <StrengthLevel
                className={
                  levelIndicator === 5 &&
                  `bg-red-800 shadow-lg shadow-red-700 border-none `
                }
              />
            </div>
          </div>
        </div>
        {upperChecked || lowerChecked || numberChecked || symbolChecked ? (
          <button
            onClick={() => genPassword(value - 1)}
            className="flex justify-center  mt-6 mysm:mb-0 mb-5 py-4 mysm:mt-10 bg-green-400 text-slate-800 font-bold w-full 
           mysm:tracking-widest shadow-md shadow-slate-900 hover:shadow-none hover:bg-slate-700 
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
            className=" mysm:mb-0 mb-5 flex justify-center py-4 mt-6 mysm:mt-10 bg-green-400 text-slate-900 font-bold w-full transition-all duration-500 opacity-50"
          >
            Choose your option(s)...
          </button>
        )}
      </div>
    </div>
  )
}

export default App
