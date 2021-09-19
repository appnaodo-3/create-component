import styled, { css } from "styled-components"

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  --padding-x-modal: 20px;
  --padding-y-modal: 20px;
  padding: var(--padding-x-modal) var(--padding-y-modal);
  color: white;

  @keyframes fadeIn {
    from {opacity: 0}
    to {opacity: 1}
    }
    @keyframes fadeOut {
    from {opacity: 1}
    to {opacity: 0}
    }
  
  &.fade-in {
    animation: fadeIn 350ms ease-in-out;
  }
  &.fade-out {
    animation: fadeOut 350ms ease-in-out;
  }

  img, img::after, img::before {
	-webkit-user-select: none;
	-webkit-user-drag: none;
	-webkit-app-region: no-drag;
	cursor: default;
  }
  `

export const Content = styled.div`
  background-color: rgb(26, 29, 33);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  --saf-0: rgba(var(--sk_foreground_low,29,28,29),0.13);
  box-shadow: 0 0 0 1px var(--saf-0),0 18px 48px 0 rgba(0,0,0,.35);
  height: calc(100vh - var(--padding-y-modal)*2);
  width: calc(100% - var(--padding-x-modal)*2);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  min-height: 30px;
  --sk_foreground_low: 232,232,232;
  border-bottom: 1px solid rgba(var(--sk_foreground_low,29,28,29),.13);
    box-shadow: inset 0 1px 0 rgb(0 0 0 / 20%);
`

export const Body = styled.div`
  padding: 10px;
  flex: 1 1 0;
  overflow: hidden;
  position: relative;
`

export const ImageWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`

export const ImageWrapperContent = styled.div`
  /* width: fit-content;
  height: fit-content; */
  width: 100%;
  overflow   :auto ;
`
  /* transform: translate3d(${props => props.currentX}px, ${props => props.currentY}px, 0px) rotate(
0deg) scale(${props => props.imageZoom / 100}); */
export const Image = styled.img`
  height: auto;
  display: inline-block;
  flex-shrink: 0;
  cursor: zoom-in;
  transition: transform 200ms ease 0s;
  overflow: auto;
  user-select: none;
  /* If you want to transform origin fixed */
  /* transform-origin: 0 0; */
`

export const InputRange = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  input[type=range] {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: hsla(0,0%,100%,.7);
  border-radius: 25px;
  border: 0px solid #000101;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #ac51b5;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: #ac51b5;
  border-radius: 25px;
  border: 0px solid #000101;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  height: 20px;
  width: 39px;
  border-radius: 7px;
  background: #65001c;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 39px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #ac51b5;
  border: 0px solid #000101;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type=range]::-ms-fill-upper {
  background: #ac51b5;
  border: 0px solid #000101;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type=range]::-ms-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  height: 20px;
  width: 39px;
  border-radius: 7px;
  background: #65001c;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #ac51b5;
}
input[type=range]:focus::-ms-fill-upper {
  background: #ac51b5;
}

body {
  padding: 30px;
}
`

export const ButtonZoom = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 15px;
  border-radius: 5px;
  border: transparent;
`