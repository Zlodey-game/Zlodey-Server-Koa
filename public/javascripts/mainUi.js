
// form.addEventListener('input', e =>{
//   var id = form.id.value;
//   var passwd = form.pw.value;
      
//   if(id !='' && passwd != '') form.submit.disabled = false;
//   else form.submit.disabled = true;
// });
// form.id.onkeyup = function(e){
//   var v = this.value;
// this.value = v.replace(/[^a-z0-9]/gi, '')

const color = {
  gold: '#726447',
  black: '#050D0B',
  lightBlack: '#151D1B',
  darkGreen: '#102020',
  lightRed: '#EB5335',
  gray: '#8C8C8C',
  green: '#70AD47',
  yellow: '#FFB801',
  lightYellow: '#CDD121',
  red: '#BC252A',
  lightBlue: '#0EB5CF',
};

function drawRecallRing(size, agl) {
  const p = {
    x: playerUnit.x + playerUnit.width / 2,
    y: playerUnit.y + playerUnit.height / 2,
  };

  bufferCtx.translate(p.x, p.y);
  bufferCtx.rotate((Math.PI / 180) * agl);

  const add = playerUnit.width * 0.9 / 2 * size / 100;
  bufferCtx.lineCap = 'round';

  bufferCtx.beginPath();
  bufferCtx.strokeStyle = 'rgba(142, 255, 255, 0.5)';
  bufferCtx.lineWidth = playerUnit.width * 0.05 * size / 100;
  bufferCtx.arc(0, 0, playerUnit.width * 0.9 * size / 100, 0, (Math.PI / 180) * 360, 1);
  bufferCtx.stroke();

  bufferCtx.lineWidth = playerUnit.width * 0.23 * size / 100;

  const grd1 = bufferCtx.createLinearGradient(-add, -add, +add, +add);
  grd1.addColorStop(0, 'rgba(142, 255, 255, 1)');
  grd1.addColorStop(0.7, 'rgba(142, 255, 255, 0.5)');
  grd1.addColorStop(1, 'rgba(14, 151, 207, 0.4');
  bufferCtx.strokeStyle = grd1;

  bufferCtx.beginPath();
  bufferCtx.arc(0, 0, playerUnit.width * 0.8 * size / 100, 0, (Math.PI / 180) * 165, false);
  bufferCtx.stroke();

  const grd2 = bufferCtx.createLinearGradient(-add, -add, +add, +add);
  grd2.addColorStop(1, 'rgba(142, 255, 255, 1)');
  grd2.addColorStop(0.3, 'rgba(142, 255, 255, 0.5)');
  grd2.addColorStop(0, 'rgba(14, 151, 207, 0.4)');
  bufferCtx.strokeStyle = grd2;

  bufferCtx.beginPath();
  bufferCtx.arc(0, 0, playerUnit.width * 0.8 * size / 100, (Math.PI / 180) * 180, (Math.PI / 180) * 345, false);
  bufferCtx.stroke();
  bufferCtx.rotate((Math.PI / 180) * -agl);
  bufferCtx.translate(-p.x, -p.y);
}

function drawMainUI() {
  const list = [
    {
      name: 'ATK',
      value: playerUnit.atk,
      color: color.lightRed,
    },
    {
      name: 'DEF',
      value: playerUnit.def,
      color: color.gray,
    },
    {
      name: 'H P',
      value: playerUnit.maxHp,
      color: color.green,
    },
    {
      name: 'AGI',
      value: playerUnit.agi,
      color: color.yellow,
    },
    {
      name: 'L V',
      value: playerUnit.lv,
      color: color.lightYellow,
    },
    {
      name: 'EXP',
      value: playerUnit.exp,
      color: color.lightYellow,
    },
  ];

  drawMainBox({ fill: color.darkGreen, line: color.gold });

  drawMainBar({ fill: '#00B801', emptyFill: color.black, line: color.gold }, 0.7, playerUnit.hp / playerUnit.maxHp * 100);
  drawMainBar({ fill: '#2183F3', emptyFill: color.black, line: color.gold }, 0.9, playerUnit.mp);

  for (let i = 0; i < 9; i++) {
    drawInven({ fill: color.lightBlack, line: color.gold }, i);
  }

  drawStatBox({ fill: color.darkGreen, line: color.gold });

  for (let i = 0; i < 6; i++) {
    drawStat(list[i].name, list[i].value, list[i].color, i);
  }

  if (playerUnit.stat != 0) {
    drawLVup({ fill: color.darkGreen, line: color.gold }, playerUnit.stat);
  }

  drawInvenBox({ fill: color.darkGreen, line: color.gold });

  for (let i = 0; i < 4; i++) {
    drawEquipment({ fill: color.lightBlack, line: color.gold }, i);
  }

  for (let i = 0; i < 14; i++) {
    drawInvenItem(i, inventory[i]);
  }
  if (isPause) {
    if(playerUnit.hp <= 0){
      drawPauseBox({ fill: color.darkGreen, line: color.gold }, 'die');  
    }
    else{
      $("#logout").show();
      drawPauseBox({ fill: color.darkGreen, line: color.gold }, 'pause');
    }
  }
  else{
    $("#logout").hide();
  }
}

function drawDroppedItems() {
  // console.log(droppedItems);
  for (item of droppedItems) {
    bufferCtx.drawImage(items[item.itemId], // Source Image
      item.x, item.y, // View Position
      item.len, item.len, // View Size
    );
  }
}

function drawPauseBox(colorInfo, mode) {
  const { fill } = colorInfo;
  const { line } = colorInfo;
  const info = pauseBox;

  const move1 = {
    x: (canvas.width - info.width) / 2,
    y: (canvas.height - info.height) / 2,
  };

  bufferCtx.fillStyle = 'rgba(11,11,11,0.7)';
  bufferCtx.fillRect(0, 0, canvas.width, canvas.height);

  bufferCtx.translate(move1.x, move1.y);

  bufferCtx.beginPath();
  bufferCtx.moveTo(0, info.radius);
  bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
  bufferCtx.lineTo(info.width - info.radius, 0);
  bufferCtx.quadraticCurveTo(info.width, 0, info.width, info.radius);
  bufferCtx.lineTo(info.width, info.height - info.radius);
  bufferCtx.quadraticCurveTo(info.width, info.height, info.width - info.radius, info.height);
  bufferCtx.lineTo(info.radius, info.height);
  bufferCtx.quadraticCurveTo(0, info.height, 0, info.height - info.radius);
  bufferCtx.lineTo(0, info.radius);

  bufferCtx.strokeStyle = line; // set the color for the circle to 'green'
  bufferCtx.lineWidth = info.lineWidth;
  bufferCtx.stroke();
  bufferCtx.fillStyle = fill;
  bufferCtx.fill();

  if(mode == 'pause'){
    bufferCtx.fillStyle = '#e9e9e9';
    bufferCtx.font = `Bold ${info.height * 0.15}px Noto Sans KR`;
    bufferCtx.fillText('일시 정지', info.width * 0.35, (info.height - info.height * 0.5) / 2);

    bufferCtx.fillStyle = color.yellow;
    bufferCtx.font = `Bold ${info.height * 0.1}px Noto Sans KR`;
    bufferCtx.fillText('B', info.width * 0.11, (info.height - info.height * 0.1));
    bufferCtx.fillStyle = '#e9e9e9';
    bufferCtx.font = `Bold ${info.height * 0.1}px Noto Sans KR`;
    bufferCtx.fillText('를 누르면 7초 후 마을로 귀환합니다.', info.width * 0.16, (info.height - info.height * 0.1));
  }
  else if(mode == 'die'){
    bufferCtx.fillStyle = color.lightRed;
    bufferCtx.font = `Bold ${info.height * 0.15}px Noto Sans KR`;
    bufferCtx.fillText('죽었습니다', info.width * 0.325, (info.height - info.height * 0.5) / 2);

    bufferCtx.fillStyle = '#e9e9e9';
    bufferCtx.font = `Bold ${info.height * 0.1}px Noto Sans KR`;
    bufferCtx.fillText('자동으로 마을로 돌아갑니다.', info.width * 0.2, (info.height - info.height * 0.3));
  }

  bufferCtx.translate(-move1.x, -move1.y);
}

function drawMonsterHPBar(emptyfill, fill, line, info) {
  const move1 = {
    x: info.x,
    y: info.y - canvas.height * 0.005,
  };
  const value = info.hp / info.maxHp * 100;
  const height = info.height * 0.06;
  const lineWidth = height * 0.7;
  const radius = canvas.width * 0.001;
  // console.log(value);

  bufferCtx.translate(move1.x, move1.y);
  // bufferCtx.translate( (pInfo.width - info.width)/2 , (pInfo.height * height - info.height));

  bufferCtx.beginPath();
  bufferCtx.moveTo(0, radius);
  bufferCtx.quadraticCurveTo(0, 0, radius, 0);
  bufferCtx.lineTo(info.width - radius, 0);
  bufferCtx.quadraticCurveTo(info.width, 0, info.width, radius);
  bufferCtx.lineTo(info.width, height - radius);
  bufferCtx.quadraticCurveTo(info.width, height, info.width - radius, height);
  bufferCtx.lineTo(radius, height);
  bufferCtx.quadraticCurveTo(0, height, 0, height - radius);
  bufferCtx.lineTo(0, radius);

  bufferCtx.strokeStyle = line; // set the color for the circle to 'green'
  bufferCtx.lineWidth = lineWidth;
  bufferCtx.stroke();
  bufferCtx.fillStyle = emptyfill;
  bufferCtx.fill();

  bufferCtx.beginPath();
  bufferCtx.moveTo(0, radius);
  bufferCtx.quadraticCurveTo(0, 0, radius, 0);
  bufferCtx.lineTo(info.width * value * 0.01 - radius, 0);
  bufferCtx.quadraticCurveTo(info.width * value * 0.01, 0, info.width * value * 0.01, radius);
  bufferCtx.lineTo(info.width * value * 0.01, height - radius);
  bufferCtx.quadraticCurveTo(info.width * value * 0.01, height, info.width * value * 0.01 - radius, height);
  bufferCtx.lineTo(radius, height);
  bufferCtx.quadraticCurveTo(0, height, 0, height - radius);
  bufferCtx.lineTo(0, info.radius);

  bufferCtx.fillStyle = fill;
  bufferCtx.fill();

  bufferCtx.translate(-move1.x, -move1.y);
}

function drawUnit(unit, img = undefined) {
  if (img == undefined) {
    bufferCtx.beginPath();
    bufferCtx.arc(unit.x + unit.width / 2, unit.y + unit.height / 2, unit.width / 2, 0, (Math.PI / 180) * 360, 1);
    bufferCtx.fillStyle = '#F8C574';
    bufferCtx.lineWidth = canvas.height * 0.01;
    bufferCtx.strokeStyle = '#352C17';

    bufferCtx.fill();
    const move1 = {
      x: unit.x + unit.width / 2,
      y: unit.y + unit.width / 2,
    };

    bufferCtx.translate(move1.x, move1.y);
    bufferCtx.rotate((Math.PI / 180) * unit.agl);
    bufferCtx.beginPath();
    bufferCtx.arc(-unit.width / 2.5, -unit.width / 2, unit.width * 0.2, 0, (Math.PI / 180) * 360, 1);
    bufferCtx.fill();
    bufferCtx.stroke();
    bufferCtx.beginPath();
    bufferCtx.arc(unit.width / 2.5, -unit.width / 2, unit.width * 0.2, 0, (Math.PI / 180) * 360, 1);
    bufferCtx.fill();
    bufferCtx.stroke();

    bufferCtx.rotate((Math.PI / 180) * -unit.agl);
    bufferCtx.translate(-move1.x, -move1.y);
  } else {
    bufferCtx.drawImage(img, // Source Image
      unit.x, unit.y, // View Position
      unit.width, unit.height, // View Size
    );
  }
}

function drawEquipment(colorInfo, idx) {
  const { fill } = colorInfo;
  const { line } = colorInfo;
  const info = inven;
  const pInfo = invenBox;

  const move1 = {
    x: canvas.width - pInfo.width,
    y: canvas.height - pInfo.height,
  };
  const move2 = {
    x: (((pInfo.width - info.len) / 2) - ((info.len + info.lineWidth + info.len * 0.6) * (idx - 1.5))),
    y: (pInfo.height * 0.4 - info.len),
  };

  bufferCtx.translate(move1.x, move1.y);
  bufferCtx.translate(move2.x, move2.y);

  bufferCtx.beginPath();
  bufferCtx.moveTo(0, info.radius);
  bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
  bufferCtx.lineTo(info.len - info.radius, 0);
  bufferCtx.quadraticCurveTo(info.len, 0, info.len, info.radius);
  bufferCtx.lineTo(info.len, info.len - info.radius);
  bufferCtx.quadraticCurveTo(info.len, info.len, info.len - info.radius, info.len);
  bufferCtx.lineTo(info.radius, info.len);
  bufferCtx.quadraticCurveTo(0, info.len, 0, info.len - info.radius);
  bufferCtx.lineTo(0, info.radius);

  bufferCtx.strokeStyle = line; // set the color for the circle to 'green'
  bufferCtx.lineWidth = info.lineWidth;
  bufferCtx.stroke();

  bufferCtx.fillStyle = fill;
  bufferCtx.fill();

  bufferCtx.translate(-move1.x, -move1.y);
  bufferCtx.translate(-move2.x, -move2.y);
}

function drawInvenBox(colorInfo) {
  const { fill } = colorInfo;
  const { line } = colorInfo;
  const info = invenBox;
  const move1 = {
    x: canvas.width - info.width,
    y: canvas.height - info.height,
  };

  bufferCtx.translate(move1.x, move1.y);
  // bufferCtx.fillStyle = "#ffffff";
  // bufferCtx.fillRect (0, 0, box.width, box.height);
  bufferCtx.beginPath();
  bufferCtx.moveTo(0, info.radius);
  bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
  bufferCtx.lineTo(info.width, 0);
  bufferCtx.lineTo(info.width, info.height);
  bufferCtx.lineTo(0, info.height);
  bufferCtx.lineTo(0, info.radius);

  bufferCtx.strokeStyle = line; // set the color for the circle to 'green'
  bufferCtx.lineWidth = info.lineWidth;
  bufferCtx.stroke();
  bufferCtx.fillStyle = fill;
  bufferCtx.fill();

  // bufferCtx.translate( -(canvas.width - info.width)/2 , -canvas.height + info.height);
  bufferCtx.translate(-move1.x, -move1.y);
}

function drawLVup(colorInfo, num) {
  const info = LVupBox;
  const pInfo = statBox;
  const { fill } = colorInfo;
  const { line } = colorInfo;

  const move1 = {
    x: 0,
    y: canvas.height - info.height - info.lineWidth * 0.5 - pInfo.height,
  };

  bufferCtx.translate(move1.x, move1.y);

  bufferCtx.beginPath();
  bufferCtx.moveTo(0, 0);
  bufferCtx.lineTo(info.width - info.radius, 0);
  bufferCtx.quadraticCurveTo(info.width, 0, info.width, info.radius);

  bufferCtx.lineTo(info.width, info.height);
  bufferCtx.lineTo(info.width, info.height - info.radius);
  bufferCtx.quadraticCurveTo(info.width, info.height, info.width - info.radius, info.height);
  bufferCtx.lineTo(0, info.height);
  bufferCtx.lineTo(0, 0);

  bufferCtx.strokeStyle = line; // set the color for the circle to 'green'
  bufferCtx.lineWidth = info.lineWidth;
  bufferCtx.stroke();
  bufferCtx.fillStyle = fill;
  bufferCtx.fill();

  bufferCtx.fillStyle = '#e9e9e9';
  bufferCtx.font = `medium ${info.height * 0.5}px Noto Sans KR`;
  bufferCtx.fillText('남은 포인트', info.width * 0.14, (info.height - info.height * 0.25) / 2);

  bufferCtx.fillStyle = color.yellow;
  bufferCtx.font = `Bold ${info.height * 0.3}px Noto Sans KR`;
  bufferCtx.fillText(num, info.width * 0.6, (info.height - info.height * 0.21) / 2);

  const textInfo = [
    {
      w: 0.05, h: 0.70, cmd: 'R', color: color.lightRed,
    },
    {
      w: 0.55, h: 0.70, cmd: 'T', color: color.gray,
    },
    {
      w: 0.05, h: 0.91, cmd: 'F', color: color.green,
    },
    {
      w: 0.55, h: 0.91, cmd: 'G', color: color.yellow,
    },
  ];
  for (i of textInfo) {
    bufferCtx.fillStyle = i.color;
    bufferCtx.font = `bold ${info.height * 0.18}px Noto Sans KR`;
    bufferCtx.fillText(`Shift + ${i.cmd}`, info.width * i.w, (info.height * i.h));
    bufferCtx.fillText('▲', info.width * (i.w + 0.30), (info.height * i.h));
  }

  bufferCtx.translate(-move1.x, -move1.y);
}

function drawStat(text, value, fill, idx) {
  const info = statBar;
  const pInfo = statBox;
  const Y_which = [-1, -1, 0, 0, 1, 1];
  const X_which = [-(pInfo.width - info.width) * 0.4, (pInfo.width - info.width) * 0.4];

  const move1 = {
    x: 0,
    y: canvas.height - pInfo.height,
  };
  const move2 = {
    x: ((pInfo.width - info.width) / 2 + X_which[idx % 2]),
    y: ((((pInfo.height - pInfo.lineWidth) - info.height) / 1.2) + ((info.height + info.lineWidth) * Y_which[idx])),
  };

  bufferCtx.translate(move1.x, move1.y);
  bufferCtx.translate(move2.x, move2.y);

  bufferCtx.font = `bold ${info.height * 0.7}px Noto Sans KR`;
  bufferCtx.fillStyle = fill;
  bufferCtx.fillText(text, 0, (info.height - info.height * 0.8) / 2);

  bufferCtx.translate(info.width * 0.35, 0);
  bufferCtx.fillText(value, 0, (info.height - info.height * 0.8) / 2);
  bufferCtx.translate(-info.width * 0.35, 0);

  bufferCtx.translate(-move1.x, -move1.y);
  bufferCtx.translate(-move2.x, -move2.y);
}

function drawStatBox(colorInfo) {
  const { fill } = colorInfo;
  const { line } = colorInfo;
  const info = statBox;
  const move1 = {
    x: 0,
    y: canvas.height - info.height,
  };

  bufferCtx.translate(move1.x, move1.y);
  // bufferCtx.fillStyle = "#ffffff";
  // bufferCtx.fillRect (0, 0, box.width, box.height);
  bufferCtx.beginPath();
  bufferCtx.moveTo(0, 0);
  // bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
  bufferCtx.lineTo(info.width - info.radius, 0);
  bufferCtx.quadraticCurveTo(info.width, 0, info.width, info.radius);

  bufferCtx.lineTo(info.width, info.height);
  bufferCtx.lineTo(0, info.height);
  // bufferCtx.lineTo(box.width, box.height-box.radius);
  // bufferCtx.quadraticCurveTo(box.width, box.height, box.width - box.radius, box.height);
  // bufferCtx.lineTo(box.radius, box.height);
  // bufferCtx.quadraticCurveTo(0, box.height, 0, box.height-box.radius);
  bufferCtx.lineTo(0, 0);
  // bufferCtx.quadraticCurveTo(125, 25, 75, 25);
  bufferCtx.strokeStyle = line; // set the color for the circle to 'green'
  bufferCtx.lineWidth = info.lineWidth;
  bufferCtx.stroke();
  bufferCtx.fillStyle = fill;
  bufferCtx.fill();

  // bufferCtx.translate( -(canvas.width - info.width)/2 , -canvas.height + info.height);
  bufferCtx.translate(-move1.x, -move1.y);
}

function drawInven(colorInfo, idx) {
  const { fill } = colorInfo;
  const { line } = colorInfo;
  const info = inven;
  const pInfo = mainBox;

  const move1 = {
    x: (canvas.width - pInfo.width) / 2,
    y: canvas.height - pInfo.height,
  };
  const move2 = {
    x: (((pInfo.width - info.len) / 2) - ((info.len + info.lineWidth + info.len * 0.2) * (4 - idx))),
    y: (pInfo.height * 0.47 - info.len),
  };

  bufferCtx.translate(move1.x, move1.y);
  bufferCtx.translate(move2.x, move2.y);

  bufferCtx.beginPath();
  bufferCtx.moveTo(0, info.radius);
  bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
  bufferCtx.lineTo(info.len - info.radius, 0);
  bufferCtx.quadraticCurveTo(info.len, 0, info.len, info.radius);
  bufferCtx.lineTo(info.len, info.len - info.radius);
  bufferCtx.quadraticCurveTo(info.len, info.len, info.len - info.radius, info.len);
  bufferCtx.lineTo(info.radius, info.len);
  bufferCtx.quadraticCurveTo(0, info.len, 0, info.len - info.radius);
  bufferCtx.lineTo(0, info.radius);

  bufferCtx.strokeStyle = line; // set the color for the circle to 'green'
  bufferCtx.lineWidth = info.lineWidth;
  bufferCtx.stroke();

  bufferCtx.fillStyle = fill;
  bufferCtx.fill();

  bufferCtx.translate(-move1.x, -move1.y);
  bufferCtx.translate(-move2.x, -move2.y);
}

function drawInvenItem(idx, item) {
  const info1 = inven;
  const pInfo1 = mainBox;
  const info2 = info1;
  const pInfo2 = invenBox;

  if (idx < 9) {
    const move1 = {
      x: (canvas.width - pInfo1.width) / 2,
      y: canvas.height - pInfo1.height,
    };
    const move2 = {
      x: (((pInfo1.width - info1.len) / 2) - ((info1.len + info1.lineWidth + info1.len * 0.2) * (4 - idx))),
      y: (pInfo1.height * 0.47 - info1.len),
    };

    if (item != undefined) {
      // console.log(item);
      // bufferCtx.fillStyle = '#333';
      // bufferCtx.fill();
      if (item.id == undefined) {

      } else if (item.clicked != true) {
        bufferCtx.translate(move1.x, move1.y);
        bufferCtx.translate(move2.x, move2.y);
        bufferCtx.drawImage(items[item.id], 0, 0, info1.len, info1.len);
        bufferCtx.translate(-move1.x, -move1.y);
        bufferCtx.translate(-move2.x, -move2.y);
      } else {
        bufferCtx.drawImage(items[item.id], pointer.x - inven.len / 2, pointer.y - inven.len / 2, info1.len, info1.len);
      }
    }
  } else if (idx < 14) {
    const move1 = {
      x: canvas.width - pInfo2.width,
      y: canvas.height - pInfo2.height,
    };
    const move2 = {
      x: (((pInfo2.width - info2.len) / 2) - ((info2.len + info2.lineWidth + info2.len * 0.6) * (1.5 - (idx - 9)))),
      y: (pInfo2.height * 0.4 - info2.len),
    };

    if (item != undefined) {
      // console.log(item);
      // bufferCtx.fillStyle = '#333';
      // bufferCtx.fill();
      if (item.id == undefined) {

      } else if (item.clicked != true) {
        bufferCtx.translate(move1.x, move1.y);
        bufferCtx.translate(move2.x, move2.y);
        bufferCtx.drawImage(items[item.id], 0, 0, info2.len, info2.len);
        bufferCtx.translate(-move1.x, -move1.y);
        bufferCtx.translate(-move2.x, -move2.y);
      } else {
        bufferCtx.drawImage(items[item.id], pointer.x - inven.len / 2, pointer.y - inven.len / 2, info2.len, info2.len);
      }
    }
  }
}

function drawMainBox(colorInfo) {
  const info = mainBox;
  const { fill } = colorInfo;
  const { line } = colorInfo;
  const move1 = {
    x: (canvas.width - info.width) / 2,
    y: canvas.height - info.height,
  };

  bufferCtx.translate(move1.x, move1.y);

  bufferCtx.beginPath();
  bufferCtx.moveTo(0, info.radius);
  bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
  bufferCtx.lineTo(info.width - info.radius, 0);
  bufferCtx.quadraticCurveTo(info.width, 0, info.width, info.radius);
  bufferCtx.lineTo(info.width, info.height);
  bufferCtx.lineTo(0, info.height);
  bufferCtx.lineTo(0, info.radius);

  bufferCtx.strokeStyle = line; // set the color for the circle to 'green'
  bufferCtx.lineWidth = info.lineWidth;
  bufferCtx.stroke();
  bufferCtx.fillStyle = fill;
  bufferCtx.fill();

  bufferCtx.translate(-move1.x, -move1.y);
}

function drawMainBar(colorInfo, height, value) {
  const { fill } = colorInfo;
  const emptyfill = colorInfo.emptyFill;
  const { line } = colorInfo;
  const info = mainBar;
  const pInfo = mainBox;
  const move1 = {
    x: (canvas.width - pInfo.width) / 2,
    y: canvas.height - pInfo.height,
  };
  const move2 = {
    x: (pInfo.width - info.width) / 2,
    y: (pInfo.height * height - info.height),
  };

  bufferCtx.translate(move1.x, move1.y);
  bufferCtx.translate(move2.x, move2.y);

  bufferCtx.beginPath();
  bufferCtx.moveTo(0, info.radius);
  bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
  bufferCtx.lineTo(info.width - info.radius, 0);
  bufferCtx.quadraticCurveTo(info.width, 0, info.width, info.radius);
  bufferCtx.lineTo(info.width, info.height - info.radius);
  bufferCtx.quadraticCurveTo(info.width, info.height, info.width - info.radius, info.height);
  bufferCtx.lineTo(info.radius, info.height);
  bufferCtx.quadraticCurveTo(0, info.height, 0, info.height - info.radius);
  bufferCtx.lineTo(0, info.radius);

  bufferCtx.strokeStyle = line; // set the color for the circle to 'green'
  bufferCtx.lineWidth = info.lineWidth;
  bufferCtx.stroke();
  bufferCtx.fillStyle = emptyfill;
  bufferCtx.fill();

  if (value != 0 || value != null) {
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    bufferCtx.beginPath();
    bufferCtx.moveTo(0, info.radius);
    bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
    bufferCtx.lineTo(info.width * value * 0.01 - info.radius, 0);
    bufferCtx.quadraticCurveTo(info.width * value * 0.01, 0, info.width * value * 0.01, info.radius);
    bufferCtx.lineTo(info.width * value * 0.01, info.height - info.radius);
    bufferCtx.quadraticCurveTo(info.width * value * 0.01, info.height, info.width * value * 0.01 - info.radius, info.height);
    bufferCtx.lineTo(info.radius, info.height);
    bufferCtx.quadraticCurveTo(0, info.height, 0, info.height - info.radius);
    bufferCtx.lineTo(0, info.radius);

    bufferCtx.fillStyle = fill;
    bufferCtx.fill();
  }

  bufferCtx.translate(-move1.x, -move1.y);
  bufferCtx.translate(-move2.x, -move2.y);
}
