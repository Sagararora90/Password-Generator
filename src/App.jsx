import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(0)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "~!@#$%^&*()_+=-`?><,./[{}]"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPassToClipBoard = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numberAllowed, passwordGenerator])

  return (
    <>
      <div className='mt-14 flex flex-col items-center px-4'>
        <h1 className='text-5xl text-center text-gray-800 font-bold'>Random Password Generator</h1>
        <h5 className='text-center mt-8 text-lg'>Create a strong and secure password to surf online freely.</h5>
        
        <div className='flex justify-center mt-8'>
          <img src="./download.svg" alt="Security Icon" className="w-20 h-20 sm:w-28 sm:h-28" />
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-2 mt-6 w-full max-w-xl'>
          <input 
            type="text"
            value={password}
            readOnly
            ref={passRef}
            className='w-full py-4 px-4 rounded-4xl bg-white border border-gray-400 shadow-md text-gray-700 text-lg font-semibold overflow-hidden text-ellipsis'
            placeholder='Generated Password'
          />
          <button 
            onClick={copyPassToClipBoard} 
            className='rounded-4xl bg-blue-500 text-white px-6 py-2 shrink-0 hover:bg-blue-700 transition font-bold'>
            Copy
          </button>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-between mt-8 w-full max-w-xl'>
          <label className='text-2xl font-semibold flex flex-col items-center sm:items-start'>
            Password Length: 
            <span className='text-gray-600 text-center'>{length}</span>
          </label>
          <input 
            type="range" 
            min={0}
            max={20}
            value={length}
            className='cursor-pointer w-60 h-2 mt-2 sm:mt-0'
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className='mt-8 w-full max-w-xl'>
          <div className='text-2xl font-semibold text-center sm:text-left'>Addtionals:</div>
          <div className='flex flex-col sm:flex-row justify-evenly mt-6 gap-4 sm:gap-8'>
            <label className='flex items-center gap-2 text-xl'>
              <input 
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className='h-4 w-4 scale-150'
              />
              Includes Numbers
            </label>
            <label className='flex items-center gap-2 text-xl'>
              <input 
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className='h-4 w-4 scale-150'
              />
              Includes Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
