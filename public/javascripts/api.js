const url = '34.64.253.156:3000'

const getStatus = () => {
    $.ajax({
        url: `http://${url}/status`,
        type: 'get',
        success: (data) => {
            const stat = data.doc;
            playerUnit.atk = stat.atk;
            playerUnit.def = stat.def;
            playerUnit.agi = stat.agi;
            playerUnit.exp = stat.exp;
            playerUnit.lv = stat.level;
            playerUnit.hp = stat.curHp;
            playerUnit.maxHp = stat.hp;
            playerUnit.stat = stat.skillPoint;
        }
    });
}

const getinven = () =>{
    $.ajax({
        url: `http://${url}/inventorys`,
        type: 'get',
        success: (data) => {
            const inven = data.doc;
            for(let i=0; i<13; i++){
                const item = inven[i+1]; 
                if(item != 0) inventory[i].id = item;
                else inventory[i].id = undefined;
            }
            console.log('inventory');
            console.log(inventory);
        }
    });
    
}

const setInven = () =>{
    //console.log(arr);
    const arr = [];

    for(let i=0; i<13; i++){
        if(inventory[i].id == undefined || inventory[i].id == null){
            arr[i] = 0;
        }
        else arr[i] = inventory[i].id;
    }
    console.log(inventory);
    $.ajax({
        url: `http://${url}/inventorys`,
        type: 'post',
        data: { 
            1: arr[0],
            2: arr[1],
            3: arr[2],
            4: arr[3],
            5: arr[4],
            6: arr[5],
            7: arr[6],
            8: arr[7],
            9: arr[8],
            10: arr[9],
            11: arr[10],
            12: arr[11],
            13: arr[12],
         },
        success: (r) => {
            console.log(r);
        }
    });
}

const setStat = (mode) => {
    let data = {};
    if(mode == 'exp') data.exp = playerUnit.exp;
    else if(mode == 'lv') data.level = playerUnit.lv;
    else if(mode == 'skillPoint') data.skillPoint = playerUnit.stat;
    else if(typeof mode == 'object') data = mode;
    else if(mode == 'stats'){
        data.atk = playerUnit.atk
        data.def = playerUnit.def
        data.agi = playerUnit.agi
        data.hp = playerUnit.maxHp
    };

    $.ajax({
        url: `http://${url}/status`,
        type: 'post',
        data: data,
        success: (r) => {
            console.log(r);
        }
    });
};

const setItem = () => {
    for(let i=1; i<=16; i++){
        $.ajax({
            url: `http://${url}/items`,
            type: 'get',
            data: {
                itemID: i
            },
            success: (item) => {
                //console.log(i,item);
                let tmpInfo = {};
                if(item.atk != 0)       tmpInfo.type = 'weapon';
                else if(item.def != 0)  tmpInfo.type = 'armor';
                else if(item.agi != 0)  tmpInfo.type = 'shoes';
                else if(item.hp != 0)  tmpInfo.type = 'pants';
                tmpInfo.atk = item.atk;
                tmpInfo.def = item.def;
                tmpInfo.agi = item.agi;
                tmpInfo.hp = item.hp;
                tmpInfo.drop = item.drop;
                itemInfo[i-1] = tmpInfo;
            }
        });    
    }
    console.log(itemInfo);
    
    //?itemID=3
};

let redirectFlg = false;

const setRoad = () => {
    if(!redirectFlg){
        location.href = '/';
        redirectFlg = true;
    }
}

const setVillage = () => {
    if(!redirectFlg){
        location.href = '/village';
        redirectFlg = true;
    }
}