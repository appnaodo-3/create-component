import React, { useState } from "react"
import "./App.scss"
import Modal, { ImageViewer } from "./Modal"
import TableSheet from "./TableSheet"


const TestDataSheet = () => {
  const numberRow = 30
  const numberCol = 10

  return <TableSheet numberCol={numberCol} numberRow={numberRow} />
}

const TestModalImage: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>click to open image</button>
    <Modal title="image-girl" isOpen={isOpen} handleClickClose={() => setIsOpen(false)}>
      <ImageViewer src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min-768x512.jpg"/>
    </Modal>

    </div>
  )
}
 
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <TestModalImage />
      </header>
    </div>
  )
}

export default App
