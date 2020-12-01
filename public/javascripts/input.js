document.addEventListener('mousemove', (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;

  // console.log(isPause);
  setUnitAngle(playerUnit, pointer.x, pointer.y);
}, false);

document.addEventListener('click', (e) => {
  if (getMouseWhich(e.clientX, e.clientY) == 'game' && typeof monsters !== 'undefined') attack();
}, false);

document.addEventListener('mousedown', (e) => {
  const which = getMouseWhich(e.clientX, e.clientY);
  if (which != 'game') moveInven(which, e.clientX, e.clientY, 'down');
}, false);

document.addEventListener('mouseup', (e) => {
  const which = getMouseWhich(e.clientX, e.clientY);
  if (inventory.findIndex((obj) => obj.clicked == true) != -1) { moveInven(which, e.clientX, e.clientY, 'up'); }
}, false);

function getKeyDown(event) {
  let keyValue;
  if (event == null) return;

  keyValue = event.keyCode;
  event.preventDefault();

  if (keyValue == '87') keyValue = '38'; // up
  else if (keyValue == '83') keyValue = '40'; // down
  else if (keyValue == '65') keyValue = '37'; // left
  else if (keyValue == '68') keyValue = '39'; // right
  keyPressOn[keyValue] = true;
}

function getKeyUp(event) {
  let keyValue;
  if (event == null) {
    keyValue = window.event.keyCode;
    window.event.preventDefault();
  } else {
    keyValue = event.keyCode;
    event.preventDefault();
  }
  if (keyValue == '87') keyValue = '38'; // up
  else if (keyValue == '83') keyValue = '40'; // down
  else if (keyValue == '65') keyValue = '37'; // left
  else if (keyValue == '68') keyValue = '39'; // right

  keyPressOn[keyValue] = false;
}

function moveInven(which, x, y, flg) {
  const invBox = {
    dy: canvas.height - mainBox.height + mainBox.height * 0.47 - inven.len,
    uy: canvas.height - mainBox.height + mainBox.height * 0.47,
    base: (canvas.width - mainBox.width) / 2 + (mainBox.width - inven.len) / 2,
    x_base: (inven.len * 1.2 + inven.lineWidth),
  };
  const sloBox = {
    dy: canvas.height - invenBox.height + invenBox.height * 0.4 - inven.len,
    uy: canvas.height - invenBox.height + invenBox.height * 0.4,
    base: base = (canvas.width - invenBox.width) + (invenBox.width - inven.len) / 2,
    x_base: (inven.len * 1.6 + inven.lineWidth),
  };
  let idx;
  const availSlot = ['weapon', 'armor', 'pants', 'shoes'];

  if (flg == 'down') {
    // console.log(which);
    if (isPause) return;

    for (let i = 0; i < 13; i++) {
      inventory[i].clicked = false;
    }
    if (which == 'inven') {
      // console.log(y, invBox.dy, invBox.uy);
      if (invBox.dy <= y && invBox.uy >= y) {
        for (idx = 0; idx < 9; idx++) {
          invBox.dx = invBox.base + invBox.x_base * (idx - 4);
          invBox.ux = invBox.base + invBox.x_base * (idx - 4) + inven.len;
          // console.log(x, invBox.dx, invBox.ux);
          if (invBox.dx < x && invBox.ux > x) {
            // console.log(idx);
            break;
          }
        }
        inventory[idx].clicked = true;
      }
    } else if (which == 'slot') {
      // console.log(y, sloBox.dy, sloBox.uy);
      if (sloBox.dy <= y && sloBox.uy >= y) {
        for (idx = 0; idx < 4; idx++) {
          sloBox.dx = sloBox.base + sloBox.x_base * (idx - 1.5);
          sloBox.ux = sloBox.base + sloBox.x_base * (idx - 1.5) + inven.len;
          // console.log(x, box.dx, box.ux);
          if (sloBox.dx < x && sloBox.ux > x) {
            // console.log(idx);
            break;
          }
        }
        inventory[idx + 9].clicked = true;
      }
    }
  } else if (flg == 'up') {
    // console.log(which);
    const origin = inventory.findIndex((obj) => obj.clicked == true);
    if (isPause) {
      for (item of inventory) {
        item.clicked = false;
      }
      return;
    }
    if (which == 'inven') {
      // console.log(y, invBox.dy, invBox.uy);
      if (invBox.dy <= y && invBox.uy >= y) {
        for (idx = 0; idx < 9; idx++) {
          invBox.dx = invBox.base + invBox.x_base * (idx - 4);
          invBox.ux = invBox.base + invBox.x_base * (idx - 4) + inven.len;
          // console.log(x, invBox.dx, invBox.ux);
          if (invBox.dx < x && invBox.ux > x) {
            // console.log(idx);
            break;
          }
        }

        if (idx == 9) {
          inventory[origin].clicked = false;
        } else if(origin<9 || inventory[idx].id == undefined || (itemInfo[inventory[idx].id - 1].type == availSlot[idx])){
          // console.log(idx);
          var temp = inventory[origin];
          inventory[origin] = inventory[idx];
          inventory[idx] = temp;
          // console.log(inventory[idx], inventory[origin]);
          inventory[idx].clicked = false;
          if (origin != idx && origin > 8) setPlayerStatus(playerUnit, idx, origin);
        }
        else{
          inventory[origin].clicked = false;  
        }
      } else {
        inventory[origin].clicked = false;
      }
    } else if (which == 'slot') {
      // console.log(y, sloBox.dy, sloBox.uy);
      if (sloBox.dy <= y && sloBox.uy >= y) {
        for (idx = 0; idx < 4; idx++) {
          sloBox.dx = sloBox.base + sloBox.x_base * (idx - 1.5);
          sloBox.ux = sloBox.base + sloBox.x_base * (idx - 1.5) + inven.len;
          // console.log(x, box.dx, box.ux);
          if (sloBox.dx < x && sloBox.ux > x) {
            // console.log(idx);
            break;
          }
        }
        // console.log(itemInfo)
        if (idx == 4) {
          inventory[origin].clicked = false;
        } else if (itemInfo[inventory[origin].id - 1].type == availSlot[idx]) {
          console.log(origin);
          console.log(itemInfo[inventory[origin].id - 1].type);

          idx += 9;
          // console.log(idx);
          var temp = inventory[origin];
          inventory[origin] = inventory[idx];
          inventory[idx] = temp;
          // console.log(inventory[idx], inventory[origin]);
          inventory[idx].clicked = false;
          if (origin != idx) setPlayerStatus(playerUnit, idx, origin);
        } else {
          inventory[origin].clicked = false;
        }
      } else {
        inventory[origin].clicked = false;
      }
    } else {
      //if (origin != idx) 
      setPlayerStatus(playerUnit, null, origin);
      inventory[origin].clicked = false;
      inventory[origin] = {};
    }
  }
}

function getMouseWhich(x, y) {
  const mArea = {
    dx: (canvas.width - mainBox.width) / 2,
    ux: (canvas.width - mainBox.width) / 2 + mainBox.width,
    dy: canvas.height - mainBox.height,
    uy: canvas.height,
  };
  const iArea = {
    dx: canvas.width - invenBox.width,
    ux: canvas.width,
    dy: canvas.height - invenBox.height,
    uy: canvas.height,
  };

  if (mArea.dx <= x && mArea.ux >= x && mArea.dy <= y && mArea.uy >= y) {
    return 'inven';
  }
  if (iArea.dx <= x && iArea.ux >= x && iArea.dy <= y && iArea.uy >= y) {
    return 'slot';
  }

  return 'game';
}

function checkGetItem(unit, item, idx) {
  if (unit.x < item.x + item.len * 0.5 && unit.x + unit.width > item.x + item.len * 0.5
       && unit.y < item.y + item.len * 0.5 && unit.y + unit.height > item.y + item.len * 0.5) {
    const emptyIdx = inventory.findIndex((obj) => obj.id == undefined);
    if (emptyIdx < 9 && emptyIdx >= 0) {
      inventory[emptyIdx].id = item.itemId;
      droppedItems.splice(idx, 1);
      setInven(inventory);
    }
  }
}

function calcKeyInput() {
  // console.log(keyPressOn);
  if (!isPause) {
    if (keyPressOn['38'] && playerUnit.y >= 0) {
      playerUnit.y -= playerUnit.Y_speed; // up
    }
    if (keyPressOn['40'] && playerUnit.y <= canvas.height - playerUnit.height) {
      playerUnit.y += playerUnit.Y_speed; // down
    }
    if (keyPressOn['37'] && playerUnit.x >= 0) {
      playerUnit.x -= playerUnit.X_speed; // left
    }
    if (keyPressOn['39'] && playerUnit.x <= canvas.width - playerUnit.width) {
      playerUnit.x += playerUnit.X_speed; // right
    }

    if (playerUnit.stat != 0) {
      if (keyPressOn['16']) {
        const keyArr = [82, 84, 70, 71];
        for (let i = 0; i < 4; i++) {
          if (keyPressOn[`${keyArr[i]}`] && !isPush && oldPush == 0) {
            if (i == 0) playerUnit.atk++;
            else if (i == 1) playerUnit.def++;
            else if (i == 2) playerUnit.maxHp++;
            else if (i == 3) playerUnit.agi++;
            playerUnit.stat--;
            isPush = !isPush;
            oldPush = keyArr[i];
            setStat('stats');
            setStat('skillPoint');
          } else if (!keyPressOn[`${keyArr[i]}`] && isPush && oldPush == keyArr[i]) {
            isPush = false;
            oldPush = 0;
          }
        }
      }
    } else {
      oldPush = 0;
    }
  }

  // ESC
  if (keyPressOn['27'] && !isPush && oldPush == 0 && playerUnit.hp > 0) {
    isPause = !isPause;
    isPush = !isPush;
    console.log(isPause);
  } else if (!keyPressOn['27'] && isPush && oldPush == 0 && playerUnit.hp > 0) {
    isPush = !isPush;
  }

  if (typeof droppedItems !== 'undefined') {
    for (let i = 0; i < droppedItems.length; i++) {
      // console.log(droppedItems);
      checkGetItem(playerUnit, droppedItems[i], i);
    }
  }

  setUnitAngle(playerUnit, pointer.x, pointer.y);
  // if(agl != null) playerUnit.agl = agl;
}
