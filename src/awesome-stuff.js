window.onload = function () {
  const file = document.getElementById('thefile')
  const audio = document.getElementById('audio')

  file.onchange = function () {
    const files = this.files
    audio.src = URL.createObjectURL(files[0])
    audio.load()
    audio.play()
    const context = new AudioContext()
    const src = context.createMediaElementSource(audio)
    const analyser = context.createAnalyser()

    const canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')

    src.connect(analyser)
    analyser.connect(context.destination)

    analyser.fftSize = 2048

    const bufferLength = analyser.frequencyBinCount
    console.log(bufferLength)

    const dataArray = new Uint8Array(bufferLength)

    const WIDTH = canvas.width
    const HEIGHT = canvas.height

    const barWidth = (WIDTH / bufferLength) * 2.5
    let barHeight
    let x = 0
    let lastcall = Date.now()
    function renderFrame () {
      const now = Date.now()
      console.log(`time taken, ${now - lastcall}ms`)
      lastcall = now
      window.requestAnimationFrame(renderFrame)
      x = 0

      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]

        const r = barHeight + (25 * (i / bufferLength))
        const g = 250 * (i / bufferLength)
        const b = 50

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }
    renderFrame()

    audio.play()
  }
}
