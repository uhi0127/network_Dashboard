//json 값 가져오기
function jsonServer(){const xhr = new XMLHttpRequest();
xhr.open('GET','http://kkms4001.iptime.org:33153/NOW/RANGE')
xhr.send();
xhr.onreadystatechange = function(e) {
    console.log(xhr)
    if(xhr.readyState !== XMLHttpRequest.DONE) return;
    if(xhr.status === 200){
        let tempObj = JSON.parse(xhr.responseText)
        console.log(tempObj)
        let CPU = tempObj.CPU;
        let RAM = tempObj.RAM;
        let DISK = tempObj.DISK;
        let NETWORK = tempObj.NETWORK;
        let EVENT = tempObj.EVENT

        document.getElementById("coreValueMin1").value = CPU.eachCPU.CPU1[0]
        document.getElementById("coreValueMax1").value = CPU.eachCPU.CPU1[1]
        document.getElementById("coreValueMin2").value = CPU.eachCPU.CPU2[0]
        document.getElementById("coreValueMax2").value = CPU.eachCPU.CPU2[1]
        document.getElementById("coreValueMin3").value = CPU.eachCPU.CPU3[0]
        document.getElementById("coreValueMax3").value = CPU.eachCPU.CPU3[1]
        document.getElementById("coreValueMin4").value = CPU.eachCPU.CPU4[0]
        document.getElementById("coreValueMax4").value = CPU.eachCPU.CPU4[1]
        document.getElementById("coreValueMin5").value = CPU.eachCPU.CPU5[0]
        document.getElementById("coreValueMax5").value = CPU.eachCPU.CPU5[1]
        document.getElementById("coreValueMin6").value = CPU.eachCPU.CPU6[0]
        document.getElementById("coreValueMax6").value = CPU.eachCPU.CPU6[1]
        document.getElementById("coreValueMin7").value = CPU.eachCPU.CPU7[0]
        document.getElementById("coreValueMax7").value = CPU.eachCPU.CPU7[1]
        document.getElementById("coreValueMin8").value = CPU.eachCPU.CPU8[0]
        document.getElementById("coreValueMax8").value = CPU.eachCPU.CPU8[1]
        document.getElementById("ramTotalValue").value = RAM.TOTAL
        document.getElementById("ramUsingValueMax").value = RAM.USEDMAX
        document.getElementById("ramUsingValueMin").value = RAM.USEDMIN
        document.getElementById("speedMaxValue").value = NETWORK.SPEED.SPEEDMAXMAX
        document.getElementById("speedMinValue").value = NETWORK.SPEED.SPEEDMAXMIN
        document.getElementById("speedDownloadValueMax").value = NETWORK.SPEED.DOWNLOADMAX
        document.getElementById("speedDownloadValueMin").value = NETWORK.SPEED.DOWNLOADMIN
        document.getElementById("speedUploadValueMax").value = NETWORK.SPEED.UPLOADMAX
        document.getElementById("speedUploadValueMin").value = NETWORK.SPEED.UPLOADMIN
        document.getElementById("sentMaxValue").value = NETWORK.TRAFFIC.DATAOUTMAX
        document.getElementById("sentMinValue").value = NETWORK.TRAFFIC.DATAOUTMIN
        document.getElementById("receivedMaxValue").value = NETWORK.TRAFFIC.DATAINMAX
        document.getElementById("receivedMinValue").value = NETWORK.TRAFFIC.DATAINMIN
        document.getElementById("diskValue1").value = DISK.LOCAL.LOCALMAIN.TOTAL
        document.getElementById("diskValue2").value = DISK.LOCAL.LOCALMAIN.USED
        document.getElementById("subDiskValue1").value = DISK.LOCAL.LOCALSUB.TOTAL
        document.getElementById("subDiskValue2").value =DISK.LOCAL.LOCALSUB.USED
        document.getElementById("usbValue1").value = DISK.USB.USBMAIN.TOTAL
        document.getElementById("usbValue2").value = DISK.USB.USBMAIN.USED
        document.getElementById("subUsbValue1").value = DISK.USB.USBSUB.TOTAL
        document.getElementById("subUsbValue2").value = DISK.USB.USBSUB.USED
        document.getElementById("webValue1").value = DISK.WEB.WEBMAIN.TOTAL
        document.getElementById("webValue2").value = DISK.WEB.WEBMAIN.USED
        document.getElementById("subWebValue1").value = DISK.WEB.WEBMAIN.TOTAL
        document.getElementById("subWebValue2").value = DISK.WEB.WEBMAIN.USED
        document.getElementById("safeBtn").value = EVENT.SAFEWALL
        document.getElementById("updateBtn").value = EVENT.OSUPDATE
        document.getElementById("networkBtn").value = EVENT.NETWORKONOFF
        document.getElementById("attrackBtn").value = EVENT.ATTACK

        if(document.getElementById("safeBtn").value == 1){
            myBtn.onclick(safeBtn);
        }else{
            myBtn.noclick(safeBtn);
        }
        if(document.getElementById("updateBtn").value == 1){
            myBtn.onclick(updateBtn);
        }else{
            myBtn.noclick(updateBtn);
        }
        if(document.getElementById("networkBtn").value == 1){
            myBtn.onclick(networkBtn);
        }else{
            myBtn.noclick(networkBtn);
        }
        if(document.getElementById("attrackBtn").value == 1){
            myBtn.onclick(attackBtn);
        }else{
            myBtn.noclick(attackBtn);
        }
    }
}
}

jsonServer()


class DisabledInput {
    constructor(id) {
        this.id = id;
    }

    disable(input) {
        input.disabled = true;
    };

    activate(input) {
        input.disabled = false;
    };
    
    check(check,text){
        if(check.checked==true){
            text.disabled = false;
            text.value = this.id;
        }else{
            text.disabled = true;
            this.id = text.value;
            text.value = 0;
        }
    };
}

class BtnChecked {
    constructor(id){
        this.id = id;
    }
    onclick(btn){
        btn.style.backgroundColor = "red";
        btn.style.color = "#fff";
        btn.value = 1;
    }
    noclick(btn){
        btn.style.backgroundColor = "#00BEEA";
        btn.style.color = "black";
        btn.value = 0;
    }
}

class CorrectionMinMax{
    constructor(id){
        this.id = id;
    }
    minMax(min,max){
        if(min.value>max.value){
            return parseInt((Math.floor(min.value)-Math.floor(max.value) +1)*Math.random()+Math.floor(max.value))
        }else{
            return parseInt((Math.floor(max.value)-Math.floor(min.value) +1)*Math.random()+Math.floor(min.value))
        }
    }
    MinMax(max){
        return parseInt(Math.floor(Math.random()*max.value))
    }
}

const myMinMax = new CorrectionMinMax("myMinMax");
const myBtn = new BtnChecked("myBtn");
const myDisabledMin = new DisabledInput("myDisabledMin");
const myDisabledMax = new DisabledInput("myDisabledMax");
let cpuLeftRadio = document.getElementById("cpuLeftRadio");
let cpuRightRadio = document.getElementById("cpuRightRadio");
let cpuLeftTextInput = document.getElementById("cpuLeftTextInput");
let coreCheckboxes = document.querySelectorAll(".coreValueBox input[type='checkbox']");
let allInput = document.querySelectorAll(".container input");
let coreCheckBox1 = document.getElementById("coreValueCheck1");
let coreCheckBox2 = document.getElementById("coreValueCheck2");
let coreCheckBox3 = document.getElementById("coreValueCheck3");
let coreCheckBox4 = document.getElementById("coreValueCheck4");
let coreCheckBox5 = document.getElementById("coreValueCheck5");
let coreCheckBox6 = document.getElementById("coreValueCheck6");
let coreCheckBox7 = document.getElementById("coreValueCheck7");
let coreCheckBox8 = document.getElementById("coreValueCheck8");

console.log(allInput[0])
//cpuValue
let coreValueMin1 = document.getElementById("coreValueMin1");
let coreValueMax1 = document.getElementById("coreValueMax1");
let coreValueMin2 = document.getElementById("coreValueMin2");
let coreValueMax2 = document.getElementById("coreValueMax2");
let coreValueMin3 = document.getElementById("coreValueMin3");
let coreValueMax3 = document.getElementById("coreValueMax3");
let coreValueMin4 = document.getElementById("coreValueMin4");
let coreValueMax4 = document.getElementById("coreValueMax4");
let coreValueMin5 = document.getElementById("coreValueMin5");
let coreValueMax5 = document.getElementById("coreValueMax5");
let coreValueMin6 = document.getElementById("coreValueMin6");
let coreValueMax6 = document.getElementById("coreValueMax6");
let coreValueMin7 = document.getElementById("coreValueMin7");
let coreValueMax7 = document.getElementById("coreValueMax7");
let coreValueMin8 = document.getElementById("coreValueMin8");
let coreValueMax8 = document.getElementById("coreValueMax8");

let subDiskCheck = document.getElementById("subDiskCheck");
let subUsbCheck = document.getElementById("subUsbCheck");
let subWebCheck = document.getElementById("subWebCheck");
let subDiskValue1 = document.getElementById("subDiskValue1");
let subDiskValue2 = document.getElementById("subDiskValue2");
let subUsbValue1 = document.getElementById("subUsbValue1");
let subUsbValue2 = document.getElementById("subUsbValue2");
let subWebValue1 = document.getElementById("subWebValue1");
let subWebValue2 = document.getElementById("subWebValue2");

let safeBtn = document.getElementById("safeBtn");
let updateBtn = document.getElementById("updateBtn");
let networkBtn = document.getElementById("networkBtn");
let attackBtn = document.getElementById("attrackBtn");

//ram value
let ramTotalValue = document.getElementById("ramTotalValue");
let ramUsingValueMax = document.getElementById("ramUsingValueMax");
let ramUsingValueMin = document.getElementById("ramUsingValueMin");

//disk value
let totalDiskValue = document.getElementById("diskValue1");
let useDiskValue = document.getElementById("diskValue2");
let totalDiskValueSub = document.getElementById("subDiskValue1");
let useDiskValueSub = document.getElementById("subDiskValue2");
let totalUsbValue = document.getElementById("usbValue1");
let useUsbValue = document.getElementById("usbValue2");
let totalUsbValueSub = document.getElementById("subUsbValue1");
let useUsbValueSub = document.getElementById("subUsbValue2");
let totalWebValue = document.getElementById("webValue1");
let useWebValue = document.getElementById("webValue2");
let totalWebValueSub = document.getElementById("subWebValue1");
let useWebValueSub = document.getElementById("subWebValue2");

//network value
let networkSpeedMax = document.getElementById("speedMaxValue");
let networkSpeedMin = document.getElementById("speedMinValue");
let networkSpeedDownloadMax = document.getElementById("speedDownloadValueMax");
let networkSpeedDownloadMin = document.getElementById("speedDownloadValueMin");
let networkSpeedUploadMax = document.getElementById("speedUploadValueMax");
let networkSpeedUploadMin = document.getElementById("speedUploadValueMin");
let networkSentMax = document.getElementById("sentMaxValue");
let networkSentMin = document.getElementById("sentMinValue");
let networkReceivedMax = document.getElementById("receivedMaxValue");
let networkReceivedMin = document.getElementById("receivedMinValue");

//save btn
let saveOutBtn = document.getElementById("saveOut");

//stop btn
let stopStartBtn = document.getElementById("stopStartBtn");
let stopIcon = document.getElementById("stopIcon");
let startIcon = document.getElementById("startIcon");

//waarning btn
let warningWindow = document.getElementById("warningWindow");
let warningMessage = document.getElementById("warningMessage");
let warningBtn = document.getElementById("warningBtn")


//json 값 생성  
function makeRange(date) {
        let someRange = {
        "id": date,
        "CPU":{
            "eachCPU":{
                "CPU1": [
                    Math.floor(coreValueMin1.value),
                    Math.floor(coreValueMax1.value)
                ],
                "CPU2": [
                    Math.floor(coreValueMin2.value),
                    Math.floor(coreValueMax2.value)
                ],
                "CPU3": [
                    Math.floor(coreValueMin3.value),
                    Math.floor(coreValueMax3.value)
                ],
                "CPU4": [
                    Math.floor(coreValueMin4.value),
                    Math.floor(coreValueMax4.value)
                ],
                "CPU5": [
                    Math.floor(coreValueMin5.value),
                    Math.floor(coreValueMax5.value)
                ],
                "CPU6": [
                    Math.floor(coreValueMin6.value),
                    Math.floor(coreValueMax6.value)
                ],
                "CPU7": [
                    Math.floor(coreValueMin7.value),
                    Math.floor(coreValueMax7.value)
                ],
                "CPU8": [
                    Math.floor(coreValueMin8.value),
                    Math.floor(coreValueMax8.value)
                ]
            }
        },
        "RAM": {
            "TOTAL": Math.floor(ramTotalValue.value),
            "USEDMAX": Math.floor(ramUsingValueMax.value),
            "USEDMIN": Math.floor(ramUsingValueMin.value) 
        },
        "DISK": {
            "LOCAL":{
                "LOCALMAIN": {
                    "TOTAL": Math.floor(totalDiskValue.value),
                    "USED": Math.floor(useDiskValue.value)
                },
                "LOCALSUB":{
                    "TOTAL": Math.floor(totalDiskValueSub.value),
                    "USED": Math.floor(useDiskValueSub.value)
                }
            },
            "USB":{
                "USBMAIN": {
                    "TOTAL": Math.floor(totalUsbValue.value),
                    "USED": Math.floor(useUsbValue.value)
                },
                "USBSUB": {
                    "TOTAL": Math.floor(totalUsbValueSub.value),
                    "USED": Math.floor(useUsbValueSub.value)
                }
            },
            "WEB":{
                "WEBMAIN":{
                    "TOTAL": Math.floor(totalWebValue.value),
                    "USED": Math.floor(useWebValue.value)
                },
                "WEBSUB":{
                    "TOTAL": Math.floor(totalWebValueSub.value),
                    "USED": Math.floor(useWebValueSub.value)
                }
            }
        },
            "NETWORK":{
                "TRAFFIC":{
                    "DATAINMAX": Math.floor(networkSentMax.value),
                    "DATAINMIN": Math.floor(networkSentMin.value),
                    "DATAOUTMAX": Math.floor(networkReceivedMax.value),
                    "DATAOUTMIN": Math.floor(networkReceivedMin.value)
                },
                "SPEED":{
                    "SPEEDMAXMAX": Math.floor(networkSpeedMax.value),
                    "SPEEDMAXMIN": Math.floor(networkSpeedMin.value),
                    "DOWNLOADMAX": Math.floor(networkSpeedDownloadMax.value),
                    "DOWNLOADMIN": Math.floor(networkSpeedDownloadMin.value),
                    "UPLOADMAX": Math.floor(networkSpeedUploadMax.value),
                    "UPLOADMIN": Math.floor(networkSpeedUploadMin.value)
                }
            },
            "EVENT":{
                "OSUPDATE": Math.floor(updateBtn.value),
                "SAFEWALL": Math.floor(safeBtn.value),
                "NETWORKONOFF": Math.floor(networkBtn.value),
                "ATTACK": Math.floor(attackBtn.value)
        }
        }
        return someRange
}

function makeObj(date) {
    let someObj = {
    "id": date,
    "CPU":{
        "eachCPU":{
            "CPU1": 
                myMinMax.minMax(coreValueMin1,coreValueMax1)
            ,
            "CPU2": 
                myMinMax.minMax(coreValueMin2,coreValueMax2)
            ,
            "CPU3":
                myMinMax.minMax(coreValueMin3,coreValueMax3)
            ,
            "CPU4": 
                myMinMax.minMax(coreValueMin4,coreValueMax4)
            ,
            "CPU5": 
                myMinMax.minMax(coreValueMin5,coreValueMax5)
            ,
            "CPU6": 
                myMinMax.minMax(coreValueMin6,coreValueMax6)
            ,
            "CPU7": 
                myMinMax.minMax(coreValueMin7,coreValueMax7)
            ,
            "CPU8": 
                myMinMax.minMax(coreValueMin8,coreValueMax8)
        }
    },
    "RAM": {
        "TOTAL": Math.floor(ramTotalValue.value),
                
        "USED": myMinMax.minMax(ramUsingValueMin,ramUsingValueMax)
    },
    "DISK": {
        "LOCAL":{
            "LOCALMAIN": {
                "TOTAL": Math.floor(totalDiskValue.value),
                "USED": Math.floor(useDiskValue.value)
            },
            "LOCALSUB":{
                "TOTAL": Math.floor(totalDiskValueSub.value),
                "USED": Math.floor(useDiskValueSub.value)
            }
        },
        "USB":{
            "USBMAIN": {
                "TOTAL": Math.floor(totalUsbValue.value),
                "USED": Math.floor(useUsbValue.value)
            },
            "USBSUB": {
                "TOTAL": Math.floor(totalUsbValueSub.value),
                "USED": Math.floor(useUsbValueSub.value)
            }
        },
        "WEB":{
            "WEBMAIN":{
                "TOTAL": Math.floor(totalWebValue.value),
                "USED": Math.floor(useWebValue.value)
            },
            "WEBSUB":{
                "TOTAL": Math.floor(totalWebValueSub.value),
                "USED": Math.floor(useWebValueSub.value)
            }
        }
    },
        "NETWORK":{
            "TRAFFIC":{
                "DATAIN": myMinMax.minMax(networkSentMin,networkSentMax),
                "DATAOUT": myMinMax.minMax(networkReceivedMin,networkReceivedMax)
            },
            "SPEED":{
                "TOTAL": myMinMax.minMax(networkSpeedMin,networkSpeedMax),
                "DOWNLOAD": myMinMax.minMax(networkSpeedDownloadMin,networkSpeedDownloadMax),
                "UPLOAD": myMinMax.minMax(networkSpeedUploadMin,networkSpeedUploadMax)
            }
        },
        "EVENT":{
            "OSUPDATE": Math.floor(updateBtn.value),
            "SAFEWALL": Math.floor(safeBtn.value),
            "NETWORKONOFF": Math.floor(networkBtn.value),
            "ATTACK": Math.floor(attackBtn.value)
        }
    }
    return someObj
}




//data setTimeout
let functionRunning = false;
let stopBtn = false;

//saveOutBtn save out btn onclick warningWindow
saveOutBtn.onclick=()=>{

    let timePut = () =>{
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://kkms4001.iptime.org:33153/NOW/NOW');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(makeObj('NOW')));

        xhr.onreadystatechange = function (e) {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if(xhr.status === 200) {
                console.log('timePut')
                setTimeout( timePut, 950)
            } else {
                console.log("Error!");
            }
        };
    }

    function rangePut(){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://kkms4001.iptime.org:33153/NOW/RANGE');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(makeRange('RANGE')));

        xhr.onreadystatechange = function (e) {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if(xhr.status === 200) {
                console.log('ok');
                console.log(makeRange('RANGE'))
            } else {
                console.log("Error!");
            }
        };
    }

    if(Math.floor(ramTotalValue.value)<Math.floor(ramUsingValueMax.value)||Math.floor(ramTotalValue.value)<Math.floor(ramUsingValueMin.value)){
        warningWindow.style.display = "flex"
        warningMessage.innerHTML = "Ram의 값을 확인해주세요"
        functionRunning = true;
        stopStartBtn.disabled = true;
    }else{
        rangePut();
        timePut();
        stopStartBtn.disabled = false;
        for(let i=0; i<55; i++){
            allInput[i].disabled = true;
        }
    }


    let someArray = [];

    someArray[0] = myMinMax.minMax(coreValueMin1,coreValueMax1);
    someArray[1] = myMinMax.minMax(coreValueMin2,coreValueMax2);
    someArray[2] = myMinMax.minMax(coreValueMin3,coreValueMax3);
    someArray[3] = myMinMax.minMax(coreValueMin4,coreValueMax4);
    someArray[4] = myMinMax.minMax(coreValueMin5,coreValueMax5);
    someArray[5] = myMinMax.minMax(coreValueMin6,coreValueMax6);
    someArray[6] = myMinMax.minMax(coreValueMin7,coreValueMax7);
    someArray[7] = myMinMax.minMax(coreValueMin8,coreValueMax8);
    someArray[8] = Math.floor(ramTotalValue.value);
    someArray[9] = myMinMax.minMax(ramUsingValueMin,ramUsingValueMax);
    someArray[10] = Math.floor(totalDiskValue.value);
    someArray[11] = Math.floor(useDiskValue.value);
    someArray[12] = Math.floor(totalDiskValueSub.value);
    someArray[13] = Math.floor(useDiskValueSub.value);
    someArray[14] = Math.floor(totalUsbValue.value);
    someArray[15] = Math.floor(useUsbValue.value);
    someArray[16] = Math.floor(totalUsbValueSub.value);
    someArray[17] = Math.floor(useUsbValueSub.value);
    someArray[18] = Math.floor(totalWebValue.value);
    someArray[19] = Math.floor(useWebValue.value);
    someArray[20] = Math.floor(totalWebValueSub.value);
    someArray[21] = Math.floor(useWebValueSub.value);
    someArray[22] = myMinMax.minMax(networkSentMin,networkSentMax);
    someArray[23] = myMinMax.minMax(networkReceivedMin,networkReceivedMax);
    someArray[24] = myMinMax.minMax(networkSpeedMin,networkSpeedMax);
    someArray[25] = myMinMax.minMax(networkSpeedDownloadMin,networkSpeedDownloadMax);
    someArray[26] = myMinMax.minMax(networkSpeedUploadMin,networkSpeedUploadMax);
    someArray[27] = Math.floor(updateBtn.value);
    someArray[28] = Math.floor(safeBtn.value);
    someArray[29] = Math.floor(networkBtn.value);
    someArray[30] = Math.floor(attackBtn.value);

    for(let i=0; i<31; i++){
        if(isNaN(someArray[i])){
            warningWindow.style.display = "flex"
            break
        } 
    }


    if(functionRunning == true ){
        functionRunning = false;
    }else if(functionRunning == false){
        saveOutBtn.disabled = true;
        myBtn.onclick(stopStartBtn);
        stopIcon.style.display = "block"
        startIcon.style.display = "none"
        stopStartBtn.style.boxShadow = "none";
    }

    //stop start event
    stopStartBtn.onclick = () =>{
            if(stopBtn == false ){
                myBtn.noclick(stopStartBtn);
                stopIcon.style.display = "none"
                startIcon.style.display = "block"
                saveOutBtn.disabled = false;
                stopBtn = true;
                timePut = () => {return};
                functionRunning = false;
                console.log(stopBtn)
                for(let i=0; i<55; i++){
                    allInput[i].disabled = false;
                }
            }else{
                startIcon.style.display = "none";
                functionRunning == true;
                stopStartBtn.style.boxShadow = "none";
                timePut = () =>{
                    const xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'http://kkms4001.iptime.org:33153/NOW/NOW');
                    xhr.setRequestHeader('Content-type', 'application/json');
                    xhr.send(JSON.stringify(makeObj('NOW')));
    
                    xhr.onreadystatechange = function (e) {
                        if (xhr.readyState !== XMLHttpRequest.DONE) return;
    
                        if(xhr.status === 200) {
                            console.log('timePut')
                            setTimeout( timePut, 950)
                        } else {
                            console.log("Error!");
                        }
                    };
                }
                if(Math.floor(ramTotalValue.value)<Math.floor(ramUsingValueMax.value)){
                    warningWindow.style.display = "flex"
                    warningMessage.innerHTML = "Ram의 Max값이 Total값보다 큽니다"
                    functionRunning = true;
                    startIcon.style.display = "block"
                }else{
                    rangePut();
                    timePut();
                    stopStartBtn.disabled = false;
                    stopBtn = false;
                    myBtn.onclick(stopStartBtn);
                    stopIcon.style.display = "block";
                    saveOutBtn.disabled = true;
                    for(let i=0; i<55; i++){
                        allInput[i].disabled = true;
                    }
                }
            }
        }
}

//warningBtn
warningBtn.onclick=()=>{
    warningWindow.style.display = "none"
}

//cpuCheckBox
coreCheckBox1.addEventListener('change', function() {
    myDisabledMin.check(coreCheckBox1,coreValueMin1);
    myDisabledMax.check(coreCheckBox1,coreValueMax1);
});

coreCheckBox2.addEventListener('change', function() {
    myDisabledMin.check(coreCheckBox2,coreValueMin2);
    myDisabledMax.check(coreCheckBox2,coreValueMax2);
});

coreCheckBox3.addEventListener('change', function() {
    myDisabledMin.check(coreCheckBox3,coreValueMin3);
    myDisabledMax.check(coreCheckBox3,coreValueMax3);
});

coreCheckBox4.addEventListener('change', function() {
    myDisabledMin.check(coreCheckBox4,coreValueMin4);
    myDisabledMax.check(coreCheckBox4,coreValueMax4);
});

coreCheckBox5.addEventListener('change', function() {
    myDisabledMin.check(coreCheckBox5,coreValueMin5);
    myDisabledMax.check(coreCheckBox5,coreValueMax5);
});

coreCheckBox6.addEventListener('change', function() {
    myDisabledMin.check(coreCheckBox6,coreValueMin6);
    myDisabledMax.check(coreCheckBox6,coreValueMax6);
});

coreCheckBox7.addEventListener('change', function() {
    myDisabledMin.check(coreCheckBox7,coreValueMin7);
    myDisabledMax.check(coreCheckBox7,coreValueMax7);
});

coreCheckBox8.addEventListener('change', function() {
    myDisabledMin.check(coreCheckBox8,coreValueMin8);
    myDisabledMax.check(coreCheckBox8,coreValueMax8);
});

//diskCheckBox event
subDiskCheck.addEventListener('change', function() {
    if (subDiskCheck.checked) {
        myDisabledMax.check(subDiskCheck,subDiskValue1);
        myDisabledMin.check(subDiskCheck,subDiskValue2);
    } else {
        myDisabledMax.check(subDiskCheck,subDiskValue1);
        myDisabledMin.check(subDiskCheck,subDiskValue2);
    }
});
subUsbCheck.addEventListener('change', function() {
    if (subUsbCheck.checked) {
        myDisabledMax.check(subUsbCheck,subUsbValue1);
        myDisabledMin.check(subUsbCheck,subUsbValue2);
    } else {
        myDisabledMax.check(subUsbCheck,subUsbValue1);
        myDisabledMin.check(subUsbCheck,subUsbValue2);
    }
});
subWebCheck.addEventListener('change', function() {
    if (subWebCheck.checked) {
        myDisabledMax.check(subWebCheck,subWebValue1);
        myDisabledMin.check(subWebCheck,subWebValue2);
    } else {
        myDisabledMax.check(subWebCheck,subWebValue1);
        myDisabledMin.check(subWebCheck,subWebValue2);
    }
});

//eventBtn

safeBtn.onclick = () =>{
    if(safeBtn.value == 1 ){
        myBtn.noclick(safeBtn);
    }else{
        myBtn.onclick(safeBtn);
    }
}

updateBtn.onclick = () =>{
    if(updateBtn.value == 1 ){
        myBtn.noclick(updateBtn);
    }else{
        myBtn.onclick(updateBtn);
    }
}

networkBtn.onclick = () =>{
    if(networkBtn.value == 1 ){
        myBtn.noclick(networkBtn);
    }else{
        myBtn.onclick(networkBtn);
    }
}

attackBtn.onclick = () =>{
    if(attackBtn.value == 1 ){
        myBtn.noclick(attackBtn);
    }else{
        myBtn.onclick(attackBtn);
    }
}


