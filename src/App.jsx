import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
   
  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "~!@#$%^&*()_+=`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(()=>{
    //optimization or for Ux by using useRef
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

    
  return (
    <>
      <h1 className="text-3xl text-center text-white">Password Generator</h1>
      <div className="w-80 mx-auto shadow-md rounded-lg px-4 my-6 text-orange-500 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden py-7">
          
          <input
            type="text"
            value={password}
            className="rounded-lg outline-none w-full py-1 px-3 m-2"
            placeholder="password here"
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-4 py-1 shrink-0 my-auto w-55 ">
            Copy
          </button>

        </div>

        <div className="flex text-sm gap-x-2 ">
          <div className=" mb-3 flex items-start gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>

            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>

            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Spl.Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
