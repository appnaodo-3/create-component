import React, { useState, useEffect, FC } from "react"
import * as S from "./styled"
import {ReactComponent as IconRotateRight} from './noun_rotate right.svg'
import {ReactComponent as IconClose} from './close_icon.svg' 


const MAX_IMAGE_SIZE = 200
const ORIGIN_IMAGE_SIZE = 100

type PropsModalType = {
  title: any
  isOpen: boolean
  handleClickClose: () => void
}

const Modal: FC<PropsModalType> = ({title, isOpen, handleClickClose, children}) => {
  const [isCloseAnimationModal, setCloseAnimationModal] = useState(isOpen)
  const refOutside = React.useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isOpen) {
      setCloseAnimationModal(true)
    }
  }, [isOpen])

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setCloseAnimationModal(false)
    }
  }

  if (!isCloseAnimationModal) return null


  return (
    <S.ModalWrapper
      onAnimationEnd={handleAnimationEnd}
      ref={refOutside}
      className={isOpen ? 'fade-in' : ' fade-out'}
      >
      <S.Content>
        <S.Header>
          <span>{title} </span>
          <IconClose width="15" height="15" onClick={handleClickClose}/>
        </S.Header>
        <S.Body>
          {children}
        </S.Body>
      </S.Content>
    </S.ModalWrapper>
  )
}


type PropsImageViewerType = {
  src: string
}

export const ImageViewer:FC<PropsImageViewerType> = ({src}) => {
  const [xDown, setXDown] = useState<number>(0)
  const [yDown, setYDown] = useState<number>(0)

  function getTouches(evt: any) {
    return evt.touches ||             // browser API
           evt.originalEvent.touches; // jQuery
  }     

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    return () => {}
  }, [])

  const handleTouchStart = (evt: any) => {
    
    const firstTouch = getTouches(evt)[0];                                      
    setXDown(firstTouch.clientX);                                      
    setYDown(firstTouch.clientY);    
    console.log("a", firstTouch.clientX, firstTouch.clientY);

  }

  const handleTouchMove = (evt: any) => {

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    console.log("b",xUp, yUp);


    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    // console.log(xDiff, yDiff);
    
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
            console.log("right");
            
        } else {
            /* left swipe */
            console.log("left");

        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    setXDown(0)
    setYDown(0)
  }


  ////
//   const [pos, setPos] = useState<{x: number; y: number; top: number; left: number}>(() => {
//     return {
//       // The current scroll 
//       left: 0,
//       top: 0,
//       // Get the current mouse position
//       x: 0,
//       y: 0,
//   };
//   })
//   const refImage = React.useRef<HTMLImageElement>(null)
//   React.useLayoutEffect(() => {
//     if (refImage?.current) {
//       setPos({
//         left: refImage?.current?.scrollLeft,
//           top: refImage?.current?.scrollTop,
//           // Get the current mouse position
//           // @ts-ignore
//           x: refImage?.current?.clientX,
//           // @ts-ignore
//           y: refImage?.current?.clientY,
//       })
//     }

//   }, [])

//   const mouseMoveHandler = function(e: any) {
//     // How far the mouse has been moved
//     const dx = e.clientX - pos.x;
//     const dy = e.clientY - pos.y;

//     // Scroll the element
//     e.scrollTop = pos.top - dy;
//     e.scrollLeft = pos.left - dx;
// };

// const mouseDownHandler = function(ele: any) {
//   // Change the cursor and prevent user from selecting the text
//   // ele.style.cursor = 'grabbing';
//   // ele.style.userSelect = 'none';
// };

// const mouseUpHandler = function(ele: any) {
//   // ele.style.cursor = 'grab';
//   // ele.style.removeProperty('user-select');
// };


const [active, setActive] = useState(false)
const [currentX, setCurrentX] = useState(0)
const [currentY, setCurrentY] = useState(0)
const [initialX, setInitialX] = useState(0)
const [initialY, setInitialY] = useState(0)
// const [xOffset, setXOffset] = useState(0)
// const [yOffset, setYOffset] = useState(0)
const refImage = React.useRef<HTMLImageElement>(null)


// const mouseDownHandler = (e: any) => {
//   if (e.target === refImage.current) {
//     setActive(true)
//   }

//   // console.log("xxxx", e.clientX, xOffset);
  
//   setInitialX(e.clientX - initialX)
//   setInitialY(e.clientY - initialY)
// }

// const mouseUpHandler = (e: any) => {
//   setActive(false)

//   setInitialX(currentX)
//   setInitialY(currentY)
// }

// const mouseMoveHandler = (e: any) => {
//   if (active) {
//     // e.preventDefault();
//     const diffX = e.clientX - initialX
//     const diffY  = e.clientY - initialY

//     // setXOffset(diffX)
//     // setCurrentY(diffY)
//     setCurrentX(diffX)
//     setCurrentY(diffY)
    
//     // @ts-ignore
//     if (refImage?.current && refImage?.current?.style ) {
//     console.log(diffX, diffY, refImage.current);
//       refImage.current.style.transform = "translate3d(" + (diffX) + "px, " + (diffY) + "px, 0)";

//     }
//   }
// }


const refInitialX = React.useRef(0)
const refInitialY = React.useRef(0)
const refCurrentX =  React.useRef(0)
const refCurrentY =  React.useRef(0)
const refActive = React.useRef(false)

const refInputRange = React.useRef<HTMLInputElement>(null)
const refButtonRotateValue = React.useRef<string>("0")

useEffect(() => {
  console.log(refImage.current);
  refImage.current?.addEventListener("mousedown", mouseDownHandler)
  refImage.current?.addEventListener("mouseup", mouseUpHandler)
  refImage.current?.addEventListener("mousemove", mouseMoveHandler)
}, [src, refButtonRotateValue?.current, refInputRange])

const mouseDownHandler = (e: any) => {
  console.log("start")
  if (e.target === refImage.current) {
    // setActive(true)
    refActive.current = true
  }

  // console.log("xxxx", e.clientX, xOffset);
  refInitialX.current = e.clientX - refInitialX.current
  refInitialY.current = e.clientY - refInitialY.current

  if (refImage?.current && refImage?.current?.style ) {
    refImage.current.style.cursor = "pointer"
    refImage.current.style.transition = "none"
  }
}

const mouseUpHandler = (e: any) => {
  refActive.current = false
  console.log("end")
  if (refImage?.current && refImage?.current?.style ) {
    refImage.current.style.cursor = "zoom-in"
  }


  refInitialX.current = refCurrentX.current
  refInitialY.current = refCurrentY.current
}

const mouseMoveHandler = (e: any) => {
  if (refActive.current) {
    console.log("XXX", active);
    // e.preventDefault();
    const diffX = e.clientX - refInitialX.current
    const diffY  = e.clientY - refInitialY.current

    // e.clientX < refImage.current!.width! && e.clientY < refImage.current!.height!
    if(true) {
      // setXOffset(diffX)
      // setCurrentY(diffY)
      refCurrentX.current = diffX
      refCurrentY.current = diffY
      // @ts-ignore
      if (refImage?.current && refImage?.current?.style ) {
        // console.log(diffX, diffY, refImage.current);
        setStyleImage(refInputRange.current?.value, diffX, diffY)
      }
    }
  }
}

const setStyleImage = (scale = refInputRange.current?.value, xTranslate = refCurrentX.current, yTranslate = refCurrentY.current, rotate = refButtonRotateValue.current) => {
  if (refImage?.current && refImage?.current?.style ) {
    // console.log(diffX, diffY, refImage.current);
    refImage.current.style.transform = "scale("+ (+scale! as number) /100 + ") translate3d(" + (xTranslate) + "px, " + (yTranslate) + "px, 0) rotate(" + rotate + "deg)";
  }
}

const handleChangeInputRange = (value: string) => {
  if (refInputRange.current) {
    refInputRange.current.value =  value
    setStyleImage(value)

    if (refImage?.current && refImage?.current?.style ) {
      refImage.current.style.transition = "transform 200ms ease 0s"
    }
  }
}

const handleClickRotateImage = () => {
  if (!!refButtonRotateValue.current) {
    refButtonRotateValue.current = (+refButtonRotateValue.current! + 90) +  ""
    setStyleImage(undefined, undefined, undefined, (+refButtonRotateValue.current! + 90) +  "")
    
    if (refImage?.current && refImage?.current?.style ) {
      refImage.current.style.transition = "transform 200ms ease 0s"
    }
  
  }
}

const handleClickDoubleImage = () => {
  if(refImage.current && refImage.current.style && refInputRange.current ) {
    if ( +refInputRange.current.value! < MAX_IMAGE_SIZE) {
      refInputRange.current.value = MAX_IMAGE_SIZE + ""
      refImage.current.style.cursor = "zoom-out"
      setStyleImage(refInputRange.current.value)
    } else {
      refInputRange.current.value = ORIGIN_IMAGE_SIZE + ""
      refImage.current.style.cursor = "zoom-in"
      setStyleImage(refInputRange.current.value)
    }

  }

}

useEffect(() => {
  handleChangeInputRange(ORIGIN_IMAGE_SIZE + "")
}, [])

  return (
    <>
    <S.ImageWrapper>
      {/* <S.ImageWrapperContent> */}
        {/* <S.Image ref={refImage} onMouseUp={mouseUpHandler} onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler} src={src} imageZoom={imageZoom}/> */}
        {/* <S.Image currentX={currentX} currentY={currentY} ref={refImage} onMouseUp={mouseUpHandler} onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler} src={src} imageZoom={imageZoom}/> */}
        <S.Image ref={refImage} src={src} onDoubleClick={handleClickDoubleImage} />


      {/* </S.ImageWrapperContent> */}
    </S.ImageWrapper>
    <S.InputRange>
    <S.ButtonZoom onClick={handleClickRotateImage}>
        <IconRotateRight fill="white" width="20" />
      </S.ButtonZoom>
      <S.ButtonZoom onClick={(e) => {
        handleChangeInputRange((+refInputRange!.current!.value! - 10) + "")
      }}> - </S.ButtonZoom>
      <input type="range" ref={refInputRange} min={0} max={MAX_IMAGE_SIZE} onChange={(e) => {
        handleChangeInputRange(e.target.value)
      }}/>
      <S.ButtonZoom onClick={(e) => {
        handleChangeInputRange((+refInputRange!.current!.value! + 10) + "")
      }}> + </S.ButtonZoom>
    </S.InputRange>
    </>
  )
}


const InputRange: FC<{handleChange: (value: number) => void}> = ({handleChange}) => {
  const [value, setValue] = useState<number>(100)
  return (
    <S.InputRange>
      <S.ButtonZoom onClick={(e) => {
        handleChange(+value - 10)
        setValue(+value - 10)
      }}> - </S.ButtonZoom>
      <input type="range" value={value} min={0} max={MAX_IMAGE_SIZE} onChange={(e) => {
        handleChange(+e.target.value)
        setValue(+e.target.value)
      }}/>
      <S.ButtonZoom onClick={(e) => {
        handleChange(+value + 10)
        setValue(+value + 10)
      }}> + </S.ButtonZoom>
    </S.InputRange>
  )
}

export default Modal
