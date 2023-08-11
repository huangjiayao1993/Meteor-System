'use strict'

let watermark = {
}

let setWatermark = (topText: string, bottomText: string) => {
  let id = '1.23452384164.123412415'

  if (document.getElementById(id) !== null) {
    // @ts-ignore
    document.body.removeChild(document.getElementById(id))
  }

  let can = document.createElement('canvas')
  can.width = 350
  can.height = 250

  let cans: any = can.getContext('2d')
  cans.rotate(-15 * Math.PI / 150)
  cans.font = '16px Vedana'
  cans.fillStyle = 'rgba(200, 200, 200, 0.50)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(topText, can.width / 16, can.height / 2.5)
  cans.fillText(bottomText, can.width / 16, can.height / 2)
  const today = `${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日`
  cans.fillText(today, can.width / 16, can.height / 1.65)

  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '10px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = document.documentElement.clientWidth + 'px'
  div.style.height = document.documentElement.clientHeight + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}

// 该方法只允许调用一次
// @ts-ignore
watermark.set = (topText: string, bottomText: string) => {
  let id = setWatermark(topText, bottomText)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(topText, bottomText)
    }
  }, 500)
  window.onresize = () => {
    setWatermark(topText, bottomText)
  }
}

const outWatermark = (id: any) => {
  if (document.getElementById(id) !== null) {
    const div: any = document.getElementById(id)
    div.style.display = 'none'
  }
}

// @ts-ignore
watermark.out = () => {
  const str = '1.23452384164.123412415'
  outWatermark(str)
}

export default watermark
