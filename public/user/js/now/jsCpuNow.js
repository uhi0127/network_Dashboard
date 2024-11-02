//CPU data 파생클래스 선언
class CPUBoard extends a_DataBoard {
    constructor( name, parent ){
        super(name, parent);
        this.nowD = 0;
        this.pastD = 0;
        this.pastA = [0,0,0,0,0,0,0,0];
    }
    // CPU차트 데이터 파싱
    parseData(data){
        for(let key in data.CPU.eachCPU){
            this.drawA.push(data.CPU.eachCPU[key]);
        }
        this.nowV = (()=>{
            let tempValue = 0;
            this.drawA.forEach((v,i,a) =>{
                tempValue += v/a.length;
            })
            return Math.round(tempValue)/100;
        })();
    }
}

// CPU data 인스턴스 생성
const CPUChart = new CPUBoard('cpuNow', "cpuNow");

// CPU차트 p5함수
const CPUGraph = p => {
    p.setup = () =>{
        p.createCanvas(...CPUChart.getSize());
        p.angleMode(p.DEGREES);
        p.background('#999999');
        p.frameRate(40);
    }
    p.draw = () => {
        p.clear()
        if( RAMChart.dataGet === true){
            if(CPUChart.timeCount === 0 ){
                CPUChart.parseData(RAMChart.now);
            }
            let [ width, height ] = CPUChart.getSize();
            CPUChart.nowD = 135 + (CPUChart.pastV - (CPUChart.pastV - CPUChart.nowV)*CPUChart.timeCount)*270;
            p.clear();
            p.fill('white');
            p.rect( 0,0,width,height);
            let blockDegree = [[135,179],[181,224],[226,269],[271,314],[316,359],[361,404]];
            // 부채꼴 그리기 함수
            function modiArc(color, radius, start, end){
                p.fill(color);
                p.arc(width/2, height/2, radius*2, radius*2, start, end);
            }
            p.noStroke();
            for(let i=0; i<6; i++){
                modiArc(CPUChart._colorA[5-i], width*4/8, ...blockDegree[i]);
            }
            realtimeArc(CPUChart.nowD);
            function realtimeArc(degree){
                if( degree <= 179){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, degree+1);
                } else if( degree <= 181){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, degree+1);
                    modiArc('white', width*4/8, 179, 181);
                } else if( degree <= 224){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, 179);
                    modiArc('white', width*4/8, 179, 181);
                    modiArc(CPUChart.colorA[4], width*4/8, 181, degree+1);
                } else if( degree <= 226){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, 179);
                    modiArc('white', width*4/8, 179, 181);
                    modiArc(CPUChart.colorA[4], width*4/8, 181, 224);
                    modiArc('white', width*4/8, 224, 226);
                } else if( degree <= 269){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, 179);
                    modiArc('white', width*4/8, 179, 181);
                    modiArc(CPUChart.colorA[4], width*4/8, 181, 224);
                    modiArc('white', width*4/8, 224, 226);
                    modiArc(CPUChart.colorA[3], width*4/8, 226, degree+1);
                } else if( degree <= 271){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, 179);
                    modiArc('white', width*4/8, 179, 181);
                    modiArc(CPUChart.colorA[4], width*4/8, 181, 224);
                    modiArc('white', width*4/8, 224, 226);
                    modiArc(CPUChart.colorA[3], width*4/8, 226, 269);
                    modiArc('white', width*4/8, 269, 271);
                } else if( degree <= 314){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, 179);
                    modiArc('white', width*4/8, 179, 181);
                    modiArc(CPUChart.colorA[4], width*4/8, 181, 224);
                    modiArc('white', width*4/8, 224, 226);
                    modiArc(CPUChart.colorA[3], width*4/8, 226, 269);
                    modiArc('white', width*4/8, 269, 271);
                    modiArc(CPUChart.colorA[2], width*4/8, 271, degree+1);
                } else if( degree <= 316){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, 179);
                    modiArc('white', width*4/8, 179, 181);
                    modiArc(CPUChart.colorA[4], width*4/8, 181, 224);
                    modiArc('white', width*4/8, 224, 226);
                    modiArc(CPUChart.colorA[3], width*4/8, 226, 269);
                    modiArc('white', width*4/8, 269, 271);
                    modiArc(CPUChart.colorA[2], width*4/8, 271, 314);
                    modiArc('white', width*4/8, 314, 316);
                } else if( degree <= 359){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, 179);
                    modiArc('white', width*4/8, 179, 181);
                    modiArc(CPUChart.colorA[4], width*4/8, 181, 224);
                    modiArc('white', width*4/8, 224, 226);
                    modiArc(CPUChart.colorA[3], width*4/8, 226, 269);
                    modiArc('white', width*4/8, 269, 271);
                    modiArc(CPUChart.colorA[2], width*4/8, 271, 314);
                    modiArc('white', width*4/8, 314, 316);
                    modiArc(CPUChart.colorA[1], width*4/8, 316, degree+1);
                } else if( degree <= 361){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, 179);
                    modiArc('white', width*4/8, 179, 181);
                    modiArc(CPUChart.colorA[4], width*4/8, 181, 224);
                    modiArc('white', width*4/8, 224, 226);
                    modiArc(CPUChart.colorA[3], width*4/8, 226, 269);
                    modiArc('white', width*4/8, 269, 271);
                    modiArc(CPUChart.colorA[2], width*4/8, 271, 314);
                    modiArc('white', width*4/8, 314, 316);
                    modiArc(CPUChart.colorA[1], width*4/8, 316, 359);
                    modiArc('white', width*4/8, 359, 361);
                } else if( degree <= 404){
                    modiArc(CPUChart.colorA[5], width*4/8, 135, 179);
                    modiArc('white', width*4/8, 179, 181);
                    modiArc(CPUChart.colorA[4], width*4/8, 181, 224);
                    modiArc('white', width*4/8, 224, 226);
                    modiArc(CPUChart.colorA[3], width*4/8, 226, 269);
                    modiArc('white', width*4/8, 269, 271);
                    modiArc(CPUChart.colorA[2], width*4/8, 271, 314);
                    modiArc('white', width*4/8, 314, 316);
                    modiArc(CPUChart.colorA[1], width*4/8, 316, 359);
                    modiArc('white', width*4/8, 359, 361);
                    modiArc(CPUChart.colorA[0], width*4/8, 361, degree+1);
                }
            }
            modiArc('white', width*0.25, 0,360);
            p.fill('black');
            p.textSize(width*0.2);
            p.textStyle('bold');
            p.textAlign('center');
            p.text(String(Math.round((CPUChart.pastV - (CPUChart.pastV - CPUChart.nowV)*CPUChart.timeCount)*100))+"%", width*0.5, height*0.6);
            p.textSize(width*0.05);
            p.text("CORE: " + String(CPUChart.drawA.length), width*0.5, height*0.4);
            CPUChart.timeCount += 0.025;
            if( CPUChart.timeCount > 1){
                CPUChart.timeCount = 0;
                CPUChart.pastV = CPUChart.nowV;
                CPUChart.drawA = [];    
            }
        }
    }
    p.windowResized = () => {
        p.resizeCanvas(...CPUChart.getSize());
    }
}
new p5(CPUGraph, 'cpuNow');
