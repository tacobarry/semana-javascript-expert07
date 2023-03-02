export default class HandGestureView {
  #handsCanvas = document.querySelector('#hands')
  #canvasContext = this.#handsCanvas.getContext('2d')
  #fingerLookupIndexes
  constructor({ fingerLookupIndexes }) {
    this.#handsCanvas.width = globalThis.screen.availWidth
    this.#handsCanvas.height = globalThis.screen.availHeight
    this.#fingerLookupIndexes = fingerLookupIndexes
  }

  clearCanvas() {
    this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
  }

  drawResults(hands) {
    // console.log({ hands })
    for ( const { keypoints, handedness } of hands ) {
      if (!keypoints) continue

      this.#canvasContext.fillStyle = handedness === 'Left' ? 'red' : 'green'
      this.#canvasContext.strokeStyle = 'white' 
      this.#canvasContext.lineWidth = 8 
      this.#canvasContext.lineJoin = 'round'

      // juntas
      this.#drawJoients(keypoints)

      // dedos
      this.#drawFingersAndHoverElements(keypoints)
    }
  }

  clickOnElement(x, y) {
    const element = document.elementFromPoint(x, y)
    if(!element) return;
    // console.log({ element, x, y })

    const rect = element.getBoundingClientRect()
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rect.left + x,
      clientY: rect.top + y
    })

    element.dispatchEvent(event)
  }

  #drawJoients(keypoints) {
    for (const { x, y } of keypoints) {
      this.#canvasContext.beginPath()
      const newX = x-2
      const newY = y-2
      const radius = 3
      const startAngle = 0
      const endAngle = 2 * Math.PI

      this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle)
      this.#canvasContext.fill()
    }
  }

  #drawFingersAndHoverElements(keypoints) {
    const fingers = Object.keys(this.#fingerLookupIndexes)
    for (const finger of fingers) {
      console.log({finger})
      const points = this.#fingerLookupIndexes[finger].map(
        index => keypoints[index]
      )
      const region = new Path2D()
      // [0] é a palma da mão (wrist)
      const [{ x, y }] = points
      region.moveTo(x, y)
      for (const point of points) {
        region.lineTo(point.x, point.y)
      }
      this.#canvasContext.stroke(region)
    }
  }

  loop(fn) {
    requestAnimationFrame(fn)
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: 'smooth'
    })
  }

}