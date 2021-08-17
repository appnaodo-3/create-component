import styled, {css} from "styled-components"


export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const Cell = styled.div<{isSelected: boolean, isRowCol: boolean}>`
display: flex;
align-items: center;
justify-content: center;
  border-right: solid 1px #d7cfcf;;
  border-bottom: solid 1px #d7cfcf;;
  width: 100%;
  cursor: cell;
  /* padding: 5px; */
  height: 30px;

  ${props => props.isRowCol && css`
  border-right: solid 1px #a09393;;
  border-bottom: solid 1px #a09393;;
  background-color: #cecece;
  font-weight: 500;
}`}
  
  ${props => props.isSelected && css`
    /* border: solid 1px #1a1ad0; */
    background: #c7eef4;

    /* box-shadow: 0px 0px 6px #1a1ad0;  */
}

  `}

  ${props => props.isRowCol && props.isSelected && css`
  background-color: gray;
}`}


  input {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    box-shadow: 0px 0px 6px #1a1ad0; 
  }
`