//RAM data 파생 클래스 선언
class RAMBoard extends a_DataBoard {
    constructor( name, parent ){
        super(name, parent);
    }
    //data parsing method
    parseData(data){
        this.total = data.RAM.TOTAL;
        this.nowV = data.RAM.USED/data.RAM.TOTAL;
    }
}

//RAM차트 인스턴스 선언
const RAMChart = new RAMBoard('RAMNow', "RAMNow");
//p5 함수 선언
const RAMGraph = p => {
    p.setup = () =>{
        p.createCanvas(...RAMChart.getSize()); // 부모요소 사이즈
        p.angleMode(p.DEGREES); // radian angle => degree
        p.background('#999999')
        RAMChart.getData(); // data획득
        p.frameRate(40); // 초당 40회 랜더링
        
    }
    
    p.draw = () => {
        if( RAMChart.dataGet === true){ // data 수신여부 check
            RAMChart.parseData(RAMChart.now) // data parsing
            p.clear() // canvas 초기화
            let [ width, height ] = RAMChart.getSize();
            let outerRadius = width*0.7;
            let innerRadius = width*0.45;
            let xCenter = width/2;
            let yCenter = height*3/7;
            let fontSize = Math.round(width/7);
            p.noStroke();
            p.fill('white');
            p.rect(0,0,width,height);
            p.fill('#86FF86');
            p.arc( xCenter, yCenter, outerRadius, outerRadius, 0, 360);
            p.fill('#FF8686');
            p.arc( xCenter, yCenter, outerRadius, outerRadius, -90, RAMChart.pastV*360 + ((RAMChart.nowV-RAMChart.pastV)*RAMChart.timeCount)*360-90 );
            p.fill('white');
            p.arc( xCenter, yCenter, innerRadius, innerRadius, 0, 360);
            p.fill('black');
            p.stroke('black');
            p.textSize(fontSize);
            p.textAlign('center','center');
            p.text(String(Math.round((RAMChart.pastV - (RAMChart.pastV - RAMChart.nowV)*RAMChart.timeCount)*100))+"%", xCenter, yCenter);
            p.textSize(fontSize/2);
            p.text("TOTAL: " + String(RAMChart.total) + 'GB', width*0.25, height*0.87);
            p.text("USED: "+String(RAMChart.nowV*RAMChart.total)+"GB", width*0.75, height*0.87);
            RAMChart.timeCount += 0.025;
            if(RAMChart.timeCount >= 1){ 
                RAMChart.timeCount = 0;
                RAMChart.pastV = RAMChart.nowV;
                RAMChart.pastA.push(RAMChart.drawA.shift());
                RAMChart.getData();
            }
        }
    }
    // window size 변경시 반응
    p.windowResized = () => {
        p.resizeCanvas(...RAMChart.getSize());
    }
}
// chart 선언
new p5(RAMGraph, 'RAMNow');


let dateText = document.getElementById("dateText");

now = 1;

dateText.innerHTML = "NOW"
// 조회 화면 now에서 좌우 이동 차단
if(now==1){
   document.getElementById("beforeBtn").disabled = true;
   document.getElementById("afterBtn").disabled = true;
}else{
   document.getElementById("beforeBtn").disabled = false;
   document.getElementById("afterBtn").disabled = false;
}
