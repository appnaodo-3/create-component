import React, {useState, useEffect} from 'react'

import * as S from './styled'



const HeaderDefault = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

type Props = {
  rowIndex: number
  colIndex: number
  isSelected: boolean
  isEdited: boolean
  data: string
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void
  handleClick: (e: React.MouseEvent<HTMLDivElement>, row: number, col: number) => void
  handleDoubleClick: (e: React.MouseEvent<HTMLDivElement>, row: number, col: number) => void
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => void
  handleMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => void
  handleMouseOver: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => void
}

const Cell: React.FC<Props>  = ({ colIndex, rowIndex,isSelected,isEdited,data, handleChangeValue,  handleClick,handleDoubleClick,  handleMouseDown, handleMouseUp, handleMouseOver}) => {
  const getContent = () => {
    if(rowIndex === 0 && colIndex === 0) {
      return ""
    }

    if(rowIndex === 0) {
      return HeaderDefault[colIndex -1 ]
    }

    if(colIndex === 0) {
      return rowIndex
    }

    return data || ""
  }

  return (
    <S.Cell isRowCol={colIndex === 0 || rowIndex === 0} isSelected={isSelected} onClick={(e) => handleClick(e, rowIndex, colIndex)} onDoubleClick={e => handleDoubleClick(e, rowIndex, colIndex)} onMouseDown={(e) => handleMouseDown(e, rowIndex, colIndex)} onMouseUp={(e) => handleMouseUp(e, rowIndex, colIndex)} onMouseOver={(e) => handleMouseOver(e, rowIndex, colIndex)}>
      {isEdited && colIndex !== 0 &&  rowIndex !== 0 ? <input  onChange={(e) => handleChangeValue(e, rowIndex, colIndex)}/> : getContent()}
    </S.Cell>
  )
}
export default  Cell