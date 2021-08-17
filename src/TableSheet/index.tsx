import React, { useEffect, useState } from "react"
import * as S from "./styled"
import Cell from "./Cell"

type Props = {
  data?: [][]
  numberRow: number
  numberCol: number
}
const POSITION_IGNORE = -1

const TableSheet: React.FC<Props> = ({ data, numberCol, numberRow }) => {
  const [startSelected, setStartSelected] = useState<{ x: number; y: number }>({
    x: POSITION_IGNORE,
    y: POSITION_IGNORE,
  })

  const [endSelected, setEndSelected] = useState<{ x: number; y: number }>({
    x: POSITION_IGNORE,
    y: POSITION_IGNORE,
  })

  const [isSelecting, setIsSelecting] = useState(false)
  const [isEditting, setIsEditing] = useState<{ x: number; y: number }>({
    x: POSITION_IGNORE,
    y: POSITION_IGNORE,
  })
  // mutable value
  // const [datas, setDatas] = useState(Array(numberRow).fill(Array(numberCol).fill(null)))
  //https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
  const [datas, setDatas] = useState(Array.from(Array(numberRow), () => new Array(numberCol)))

  console.log("datas", datas)

  useEffect(() => {
    document.addEventListener('copy', handleCopy);

    return() => {
    document.removeEventListener('copy', handleCopy);
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, rowIndex: number, colIndex: number) => {
    // select all
    if (colIndex === 0 && rowIndex === 0) {
      setStartSelected({ x: 0, y: 0 })
      setEndSelected({ x: numberRow, y: numberCol })

      return
    }

    // select row
    if (colIndex === 0) {
      setStartSelected({ x: rowIndex, y: 0 })
      setEndSelected({ x: rowIndex, y: numberCol })

      return
    }

    // select column
    if (rowIndex === 0) {
      setStartSelected({ x: 0, y: colIndex })
      setEndSelected({ x: numberRow, y: colIndex })

      return
    }

    setStartSelected({ x: rowIndex, y: colIndex })
    setEndSelected({ x: rowIndex, y: colIndex })
  }

  const isSelected = (rowIndex: number, colIndex: number): boolean => {
    if (startSelected.x === POSITION_IGNORE) return false
    // if (rowIndex >= startSelected.x && colIndex >= startSelected.y && rowIndex <= endSelected.x && colIndex <= endSelected.y) return true
    // if (rowIndex < startSelected.x && colIndex > startSelected.y) return false
    // if (rowIndex > endSelected.x && colIndex < endSelected.y) return false
    if (rowIndex < startSelected.x || colIndex < startSelected.y) return false
    if (rowIndex > endSelected.x || colIndex > endSelected.y) return false

    return true
  }

  const handeKey = (e: React.KeyboardEvent) => {
    if (e.isPropagationStopped && e.isPropagationStopped()) {
      return;
    }
    const keyCode = e.which || e.keyCode;
    console.log(keyCode, e.shiftKey)
    const isMultiSelect = e.shiftKey
    // top
    if (keyCode  === 38 && startSelected.x > 0 ) {
      setStartSelected({
        x: startSelected.x - 1,
        y: startSelected.y
      })
      if (!isMultiSelect) {
        setEndSelected({
          x: startSelected.x - 1,
          y: startSelected.y 
        })
      }
 
    }

    // bottom
    if (keyCode  === 40) {
      if (!isMultiSelect) {
      setStartSelected({
        x: endSelected.x  + 1,
        y: endSelected.y
      })} else {
        setEndSelected({
          x: endSelected.x + 1,
          y: endSelected.y 
        })
      }
      setEndSelected({
        x: endSelected.x + 1,
        y: endSelected.y 
      })
    }
    
    // right
    if (keyCode  === 39) {
      if (!isMultiSelect) {
      setStartSelected({
        x: endSelected.x,
        y: endSelected.y + 1
      })
    }

      setEndSelected({
        x: endSelected.x,
        y: endSelected.y + 1 
      })
    }

    if (keyCode  === 37) {
      setStartSelected({
        x: startSelected.x,
        y: startSelected.y - 1
      })

      if (!isMultiSelect) {
      setEndSelected({
        x: startSelected.x,
        y: startSelected.y - 1 
      })
    }
    }
  }

  console.log(startSelected, endSelected)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => {
    const isSelecting = startSelected.x !== POSITION_IGNORE

    if (isSelecting) {
      setIsSelecting(true)
    }
  }

  const handleMouseUp =(e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => {
    setIsSelecting(false)
    // setEndSelected({
    //   x: POSITION_IGNORE,
    //   y: POSITION_IGNORE,
    // })
    // setStartSelected({
    //   x: POSITION_IGNORE,
    //   y: POSITION_IGNORE,
    // })
  }

  const handleMouseOver =(e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => {
    console.log("pver");
    
    if(isSelecting) {
      setEndSelected({
        x: row,
        y: col
      })
    }
  }

  const handleDoubleClick =(e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => {
    setIsEditing({
      x: row,
      y: col
    })
  }

   const handleChangeValue =(e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const {value} = e.target
    console.log(row, col, value);

    const datasClone = datas
    datasClone[row][col] = value
    console.table(datasClone);
    
    setDatas(datasClone)
    
  }

  const handleCopy = (e: any) => {
    e.preventDefault();
    let dataCopy = ""
    for(let i = startSelected.x; i <= endSelected.x; i ++) {
      for(let j = startSelected.y; j <= endSelected.y; j ++) {
        console.log("copy value", datas[i][j]);
        
        dataCopy = dataCopy + datas[i][j] + '\t'
      }
      dataCopy = dataCopy + '\n'
    } 

    // console.log("------copy value", dataCopy);
    alert(dataCopy)
    document.execCommand("copy");
    // @ts-ignore
    if (window.clipboardData && window.clipboardData.setData) {
    // @ts-ignore
      window.clipboardData.setData('Text', dataCopy);
    } else {
      e.clipboardData.setData('text/plain', dataCopy);
    }
  }

  return (
    // @ts-ignore
    // https://stackoverflow.com/questions/30677134/react-keyboard-events-not-firing
    <div onKeyDown={handeKey} tabIndex="0"  style={{width: "100%", borderTop: 'solid 1px #a09393'}}>
      {Array(numberRow)
        .fill(0)
        .map((_, rowIndex) => {
          //
          return (
            <S.Row onKeyDown={handeKey}>
              {Array(numberCol)
                .fill(0)
                .map((_, colIndex) => {
                  return (
                    <Cell
                    handleChangeValue={handleChangeValue}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                    handleMouseOver={handleMouseOver}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      isEdited={isEditting.x === rowIndex && isEditting.y === colIndex}
                      data={datas[rowIndex][colIndex]}
                      handleClick={handleClick}
                      handleDoubleClick={handleDoubleClick}
                      isSelected={isSelected(rowIndex, colIndex)}
                    />
                  )
                })}
            </S.Row>
          )
        })}
    </div>
  )
}

export default TableSheet
