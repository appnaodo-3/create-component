import React, { useState } from "react"
import "./App.scss"
import TableSheet from "./TableSheet"

const numberRow = 30
const numberCol = 10

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <TableSheet numberCol={numberCol} numberRow={numberRow} />
      </header>
    </div>
  )
}

export default App
