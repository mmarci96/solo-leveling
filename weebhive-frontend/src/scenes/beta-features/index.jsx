import { useState, useEffect } from 'react'
import './feature/Rendering.css'
const limit = 10
let count = 0
const BetaDevelopment = () => {
  const [test, setTest] = useState(false)
  
  useEffect(() => {
    
    setTimeout(() => {
      if (count <= limit) {
        test ? setTest(false) : setTest(true)
      }
    }, 1000)
    count++

  }, [test])
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.input.value)
    const testChatObj = []
    testChatObj.push(e.target.input.value)
    console.log(testChatObj)
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" id="input"></input>
        <button type="submit" onClick={() => {}}>
          send
        </button>
      </form>
      {test ? <p className="bipolar">im bipolar{count}</p> : <p className="not">{count} x oh nvm.. im not</p>}
    </div>
  )
}

export default BetaDevelopment
