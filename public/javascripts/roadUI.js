function setImage(){
    ghost = new Image();
    ghost.src = "../public/images/ghost.png";

    backgroundImg = new Image();
    backgroundImg.src = "../public/images/asphalt.jpg";

    for(let i=1; i<=16; i++){
        items[i] = new Image();
        items[i].src = `../public/images/${i}.png`;
    }
    //console.log(ghost);
}

function drawRoad(){
    var width = canvas.width;
    var height = canvas.height;
    bufferCtx.drawImage(asphalt, 0, 0, width, height);

    bufferCtx.fillStyle = "rgb(206, 206, 206)";
    // Left
    bufferCtx.beginPath();
    bufferCtx.moveTo(0,0);
    bufferCtx.lineTo(canvas.width*0.065,0);
    bufferCtx.lineTo(0,height*0.7);
    bufferCtx.closePath();
    bufferCtx.fill();
    // Right
    bufferCtx.beginPath();
    bufferCtx.moveTo(width,0);
    bufferCtx.lineTo(width - width*0.065,0);
    bufferCtx.lineTo(width,height*0.7);
    bufferCtx.closePath();
    bufferCtx.fill();

    // 보도
    bufferCtx.fillStyle = "rgb(244, 177, 131)";
    // Left
    bufferCtx.beginPath();
    bufferCtx.moveTo(0,0);
    bufferCtx.lineTo(width*0.04,0);
    bufferCtx.lineTo(0,height*0.4);
    bufferCtx.closePath();
    bufferCtx.fill();
    // Right
    bufferCtx.beginPath();
    bufferCtx.moveTo(width,0);
    bufferCtx.lineTo(width - width*0.04,0);
    bufferCtx.lineTo(width,height*0.4);
    bufferCtx.closePath();
    bufferCtx.fill();

    // 중앙선
    bufferCtx.fillStyle = "rgb(255, 192, 0)";  
    bufferCtx.fillRect (width * 0.485 - (width*0.014)/2, 0, width*0.014, height);
    bufferCtx.fillRect (width * 0.515 - (width*0.014)/2, 0, width*0.014, height);

    const lineLen = height*0.208;
    const rightGap = height*0.152;
    // 차선
    bufferCtx.fillStyle = "rgb(255, 255, 255)"; 
    // Left
    bufferCtx.rotate((5/180)*Math.PI);
    for(let i=0; i<5; i++){
        bufferCtx.fillRect (width * 0.27 - (width*0.014)/2, lineLen * i, width*0.014, height*0.1);    
    }
    bufferCtx.rotate((-5/180)*Math.PI);
    // Right
    bufferCtx.rotate((-5/180)*Math.PI);
    for(let i=0; i<5; i++){
        bufferCtx.fillRect (width * (1-0.28) - (width*0.014)/2, rightGap + lineLen * i, width*0.014, height*0.1);    
    }
    bufferCtx.rotate((5/180)*Math.PI);
}

function drawRoad(){
    var width = canvas.width;
    var height = canvas.height;
    bufferCtx.drawImage(backgroundImg, 0, 0, width, height);

    bufferCtx.fillStyle = "rgb(206, 206, 206)";
    // Left
    bufferCtx.beginPath();
    bufferCtx.moveTo(0,0);
    bufferCtx.lineTo(canvas.width*0.065,0);
    bufferCtx.lineTo(0,height*0.7);
    bufferCtx.closePath();
    bufferCtx.fill();
    // Right
    bufferCtx.beginPath();
    bufferCtx.moveTo(width,0);
    bufferCtx.lineTo(width - width*0.065,0);
    bufferCtx.lineTo(width,height*0.7);
    bufferCtx.closePath();
    bufferCtx.fill();

    // 보도
    bufferCtx.fillStyle = "rgb(244, 177, 131)";
    // Left
    bufferCtx.beginPath();
    bufferCtx.moveTo(0,0);
    bufferCtx.lineTo(width*0.04,0);
    bufferCtx.lineTo(0,height*0.4);
    bufferCtx.closePath();
    bufferCtx.fill();
    // Right
    bufferCtx.beginPath();
    bufferCtx.moveTo(width,0);
    bufferCtx.lineTo(width - width*0.04,0);
    bufferCtx.lineTo(width,height*0.4);
    bufferCtx.closePath();
    bufferCtx.fill();

    // 중앙선
    bufferCtx.fillStyle = "rgb(255, 192, 0)";  
    bufferCtx.fillRect (width * 0.485 - (width*0.014)/2, 0, width*0.014, height);
    bufferCtx.fillRect (width * 0.515 - (width*0.014)/2, 0, width*0.014, height);

    const lineLen = height*0.208;
    const rightGap = height*0.152;
    // 차선
    bufferCtx.fillStyle = "rgb(255, 255, 255)"; 
    // Left
    bufferCtx.rotate((5/180)*Math.PI);
    for(let i=0; i<5; i++){
        bufferCtx.fillRect (width * 0.27 - (width*0.014)/2, lineLen * i, width*0.014, height*0.1);    
    }
    bufferCtx.rotate((-5/180)*Math.PI);
    // Right
    bufferCtx.rotate((-5/180)*Math.PI);
    for(let i=0; i<5; i++){
        bufferCtx.fillRect (width * (1-0.28) - (width*0.014)/2, rightGap + lineLen * i, width*0.014, height*0.1);    
    }
    bufferCtx.rotate((5/180)*Math.PI);
}