window.onload = function (e) {
  canvas = document.getElementById('canvas');
  canvasBuffer = document.createElement('canvas');
  setCanvasSize();
};

window.onresize = function (e) {
  setCanvasSize();
};

function setCanvasSize() {
  const browserWidth = window.innerWidth;
  const browserHeight = window.innerHeight - 4;

  if (browserWidth / browserHeight < 1.777) { //  width small
    canvas.width = browserWidth;
    canvas.height = browserWidth * 0.5625;
  } else {
    canvas.width = browserHeight * 1.777;
    canvas.height = browserHeight;
  }

  canvasBuffer.width = canvas.width;
  canvasBuffer.height = canvas.height;

  setUIBoxes();

  setUnitSize(playerUnit, 0.06, 0.106, 2.5);

  if (typeof monsters !== 'undefined') {
    for (m of monsters) {
      setUnitSize(m, 0.093, 0.166, 2.5);
    }
  }

  canvasOldWidth = canvas.width;
  canvasOldHeight = canvas.height;
}

function setUIBoxes() {
  mainBox = {
    width: canvas.width * 0.34,
    height: canvas.height * 0.12,
    radius: canvas.width * 0.01,
    lineWidth: canvas.width * 0.008,
  };
  mainBar = {
    width: mainBox.width * 0.93,
    height: mainBox.height * 0.1,
    radius: mainBox.radius * 0.1,
    lineWidth: mainBox.lineWidth * 0.4,
  };
  inven = {
    len: mainBox.width * 0.07,
    radius: mainBox.radius * 0.1,
    lineWidth: mainBox.lineWidth * 0.6,
  };

  statBox = {
    width: canvas.width * 0.2,
    height: canvas.height * 0.12,
    radius: canvas.width * 0.01,
    lineWidth: canvas.width * 0.008,
  };
  statBar = {
    width: statBox.width * 0.4,
    height: statBox.height * 0.25,
    radius: statBox.radius * 0.1,
    lineWidth: 0,
  };
  LVupBox = {
    width: statBox.width,
    height: statBox.height * 1,
    radius: canvas.width * 0.01,
    lineWidth: canvas.width * 0.008,
  };

  invenBox = {
    width: canvas.width * 0.2,
    height: canvas.height * 0.18,
    radius: canvas.width * 0.01,
    lineWidth: canvas.width * 0.008,
  };

  pauseBox = {
    width: canvas.width * 0.34,
    height: canvas.height * 0.3,
    radius: canvas.width * 0.01,
    lineWidth: canvas.width * 0.008,
  };
}
