// Traffic data 파생클래스 선언
class TfBoard extends a_DataBoard {
    constructor( name, parent ){
        super(name, parent)
        this.nowD = 0;
        this.pastD = 0;
        this.drawA_in = [];
        this.drawA_out = [];
        this.pastA_in = [];
        this.pastA_out = [];
    }
    // Traffic data parsing method
    parseData(data){
        for(let key in data.NETWORK.TRAFFIC){
            this.drawA.push(data.NETWORK.TRAFFIC[key]);
        }
    }
    // 그래프 전체 왼쪽으로 step만큼 이동시키는 method
    xMove(){
        this.drawA_in.forEach( v =>{ v[0] += this.getSize()[0]/60});
        this.drawA_out.forEach( v =>{ v[0] += this.getSize()[0]/60});
    }
}

// Traffic chart instance
const TfChart = new TfBoard('trafficNow', "trafficNow");

// Traffic chart p5
const TfGraph = p => {
    p.setup = () =>{
        p.createCanvas(...TfChart.getSize());
        p.angleMode(p.DEGREES);
        p.background('#999999');
    }
    p.draw = () => {
        p.clear();
        let [ width, height ] = TfChart.getSize();
        if( RAMChart.dataGet === true ){
            if(TfChart.drawA_in.length<20){
                p.frameRate(15);
            } else {
                p.frameRate(8);
            }
            if(TfChart.timeCount === 0){
                TfChart.parseData(RAMChart.now);
                TfChart.drawA_in.push([0,TfChart.drawA[0]*height*0.9/350]);
                TfChart.drawA_out.push([0,TfChart.drawA[1]*height*0.9/350]);
                TfChart.xMove();
            }
            p.noStroke();
            p.rect(0,0,width,height);
            p.fill('white');
            p.stroke('#777777');
            p.strokeWeight(1);
            p.line(0,1,width,1);
            p.line(0,height*0.9*0.125,width,height*0.9*0.125);
            p.line(0,height*0.9*0.25,width,height*0.9*0.25);
            p.line(0,height*0.9*0.375,width,height*0.9*0.375);
            p.line(0,height*0.9*0.5,width,height*0.9*0.5);
            p.line(0,height*0.9*0.625,width,height*0.9*0.625);
            p.line(0,height*0.9*0.75,width,height*0.9*0.75);
            p.line(0,height*0.9*0.875,width,height*0.9*0.875);
            p.fill('#777777');
            p.textSize(width*0.01);
            p.textAlign('center','bottom');
            p.noStroke();
            for(let i=0; i<60; i++){
            	if(i%5 == 0 ) {
            	p.text(String(60-i)+'s', width/60*(i-1), height*0.76);
            	}
            }
            p.fill('white');
            p.noStroke();
            
            if(TfChart.drawA_in.length > 9){
                p.strokeWeight(3);
                p.fill('white');
                for(let k=3; k<TfChart.drawA_in.length; k++){
                    p.stroke(TfChart.colorA[0]);
                    p.curve( 
                        width-TfChart.drawA_in[k-3][0], height*0.9-TfChart.drawA_in[k-3][1]*0.9,
                        width-TfChart.drawA_in[k-2][0], height*0.9-TfChart.drawA_in[k-2][1]*0.9,
                        width-TfChart.drawA_in[k-1][0], height*0.9-TfChart.drawA_in[k-1][1]*0.9,
                        width-TfChart.drawA_in[k][0], height*0.9-TfChart.drawA_in[k][1]*0.9
                    );
                    p.stroke(TfChart.colorA[4]);
                    p.curve( 
                        width-TfChart.drawA_out[k-3][0], height*0.9-TfChart.drawA_out[k-3][1]*0.9,
                        width-TfChart.drawA_out[k-2][0], height*0.9-TfChart.drawA_out[k-2][1]*0.9,
                        width- TfChart.drawA_out[k-1][0], height*0.9-TfChart.drawA_out[k-1][1]*0.9,
                        width-TfChart.drawA_out[k][0], height*0.9-TfChart.drawA_out[k][1]*0.9
                    );
                }
            let length = TfChart.drawA_in.length;
            let inAvg = (()=>{ 
                let tempV = 0; 
                TfChart.drawA_in.forEach((v,i,a)=>{
                    tempV += v[1]/a.length;
                }) 
                return tempV;
            })();
            let outAvg = (()=>{ 
                let tempV = 0; 
                TfChart.drawA_out.forEach((v,i,a)=>{
                    tempV += v[1]/a.length;
                })
                return tempV;
            })()
            p.noStroke();
            p.fill('white');

            p.textAlign('center', 'top');
            p.textSize(height*0.064);
            p.textStyle('bold');
            p.fill(TfChart.colorA[0]);
            p.text("Download: "+String(Math.round(TfChart.drawA_in[length - 9][1]*350/height)) + "MB", width*0.25, height*0.81);
            p.text("Down-AVG: "+String(Math.round(inAvg)) + "MB", width*0.25, height*0.89);
            p.fill(TfChart.colorA[4]);
            p.text("Upload: "+String(Math.round(TfChart.drawA_out[length - 9][1]*350/height)) + "MB", width*0.75, height*0.81);
            p.text("Up-AVG: "+String(Math.round(outAvg)) + "MB", width*0.75, height*0.89);
            p.fill('white');
            }
            TfChart.timeCount += 0.125;
            if(TfChart.timeCount > 1){
                TfChart.timeCount = 0;
                TfChart.drawA = [];
                if(TfChart.drawA_in.length>60){
                    TfChart.pastA_in.push((() => {
                        let tempValue = 0;
                        TfChart.drawA_in.forEach((v,i,a) => {
                            tempValue += v[1]/a.length;
                        })
                        return tempValue;
                    })());
                    TfChart.drawA_in.shift();
                    TfChart.pastA_out.push((() => {
                        let tempValue = 0;
                        TfChart.drawA_out.forEach((v,i,a) => {
                            tempValue += v[1]/a.length;
                        })
                        return tempValue;
                    })());
                    TfChart.drawA_out.shift();
                    TfChart.pastA_in = [];
                    TfChart.pastA_out = [];
                }
            }
        }
    }
    p.windowResized = () => {
        p.resizeCanvas(...TfChart.getSize());
    }
}
new p5(TfGraph, 'trafficNow');
