import { useCallback, useEffect, useRef, useState } from 'react'
import { FaCopy } from 'react-icons/fa'

function App() {
  const [Length, setLength] = useState(8);
  const [NumberChecked, setNumberChecked] = useState(false);
  const [CharacterChecked, setCharacterChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (NumberChecked) str += "0123456789";
    if (CharacterChecked) str += "`~!@#$%^&*()-_=+[{]}\\|;:',<.>/?";
    for (let i = 1; i <= Length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [Length, NumberChecked, CharacterChecked]);

  const copypass = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [Length, NumberChecked, CharacterChecked, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md shadow-md mx-auto rounded-lg px-6 py-8 my-8 bg-gray-800 text-white'>
        <h1 className='text-center text-2xl font-semibold mb-4 text-orange-400'>Password Generator</h1>

        <div className='flex items-center shadow rounded-lg overflow-hidden mb-4 bg-gray-700'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-2 px-3 bg-gray-700 text-white text-lg'
            placeholder='Password'
            readOnly
            ref={passRef}
          />
          <button
            className='px-3 text-2xl bg-green-600 hover:bg-green-500 transition-colors text-white'
            onClick={copypass}
            aria-label="Copy Password"
          >
            <FaCopy />
          </button>
        </div>
        {copySuccess && <p className='text-green-400 text-center mb-2'>Copied to clipboard!</p>}

        <div className='mb-4'>
          <label htmlFor="length" className='text-green-500'>Length: {Length}</label>
          <input
            type="range"
            id="length"
            min={6}
            max={100}
            value={Length}
            className='w-full cursor-pointer bg-gray-600 rounded-lg'
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className='flex justify-between text-sm mb-4'>
          <div className='flex items-center gap-2'>
            <input
              type="checkbox"
              checked={NumberChecked}
              onChange={() => setNumberChecked((prev) => !prev)}
              className='cursor-pointer'
            />
            <label className='text-yellow-400'>Include Numbers</label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type="checkbox"
              checked={CharacterChecked}
              onChange={() => setCharacterChecked((prev) => !prev)}
              className='cursor-pointer'
            />
            <label className='text-yellow-400'>Include Symbols</label>
          </div>
        </div>

        <button
          className='w-full py-2 mt-4 bg-blue-600 hover:bg-blue-500 transition-colors text-white rounded-lg'
          onClick={passwordGenerator}
        >
          Generate New Password
        </button>
      </div>
    </>
  )
}

export default App;
