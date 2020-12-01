function setImage() {
  backgroundImg = new Image();
  backgroundImg.src = '../images/village.jpg';

  for (let i = 1; i <= 16; i++) {
    items[i] = new Image();
    items[i].src = `../images/${i}.png`;
  }
  // console.log(ghost);
}

function drawVillage() {
  const { width } = canvas;
  const { height } = canvas;
  bufferCtx.drawImage(backgroundImg, 0, 0, width, height);

  bufferCtx.strokeStyle = color.lightRed;
  bufferCtx.fillStyle = color.lightRed;
  bufferCtx.lineWidth = canvas.height * 0.02;
  bufferCtx.beginPath();
  bufferCtx.moveTo(0, canvas.height * 0.25);
  bufferCtx.lineTo(canvas.width * 0.1, canvas.height * 0.25);
  bufferCtx.lineTo(canvas.width * 0.1, canvas.height * 0.85);
  bufferCtx.lineTo(0, canvas.height * 0.85);

  bufferCtx.stroke();

  bufferCtx.fillRect(canvas.width * 0.0, canvas.height * 0.18, canvas.width * 0.1, canvas.height * 0.08);
  bufferCtx.strokeRect(canvas.width * 0.0, canvas.height * 0.19, canvas.width * 0.1, canvas.height * 0.05);
  bufferCtx.moveTo(0, canvas.height * 0.25);
  bufferCtx.fillStyle = color.lightBlack;

  bufferCtx.font = `Bold ${canvas.height * 0.04}px Noto Sans KR`;
  bufferCtx.fillText('사냥 지대', canvas.width * 0.006, canvas.height * 0.24);
}
