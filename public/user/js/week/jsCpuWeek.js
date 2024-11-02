// CPU Data 파생클래스
class CPUweek extends a_WeekBoard{
   constructor(name, parent){
      super(name, parent);
   };
};
// CPU =============================================================================
const CPUWeek = new CPUweek('cpuWeek', 'cpuWeek');


const CPUWeekGraph = p => {
   p.setup = () => {
        p.createCanvas(...CPUWeek.getSize());
        p.angleMode(p.DEGREES);
        p.frameRate(40);
   }
   p.draw = () => {
      if( RAMWeek.dataGet === true){
         [width, height] = CPUWeek.getSize();
         p.noStroke();
         p.fill('white');
         p.rect(0,0,width,height);
         p.stroke('black');
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa');
         let usedData = RAMWeek.CPU.eachCPU;
         let usedA = [];
         let dataLength = usedData.CPU1.length;
         p.fill('black');
         p.textAlign('left','top');
         p.textStyle('normal');
         for(let i=1; i<=10; i++){
            p.text(String(Math.round((i*10)))+"%",width*0.01,height - height*0.1*(i));
            p.line(0,height*0.1*i,width,height*0.1*i);
         }
         for(let k=0; k<dataLength; k++){
            usedA.push(0);
            for(let key in usedData){
               usedA[k] += usedData[key][k]/8/100;
            }
         }
         for(let i=0; i<usedA.length; i++){
            p.stroke(CPUWeek.colorA[3]);
            p.strokeWeight(2.5);
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*usedA[i]*CPUWeek.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - (0.9*height*usedA[i+1])*CPUWeek.timeCount);
            p.fill('white');
            p.strokeWeight(1.5);
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*usedA[i]*CPUWeek.timeCount, width*0.03, width*0.03);
            if(usedA.length < 8){
               p.fill('black');
               p.noStroke();
               p.textSize(width*0.04);
               p.textStyle('bold');
               p.textAlign('center', 'bottom');
               p.text(RAMWeek.dayA[i], width*0.15+0.8*width*i/dataLength, 0.97*height);
               p.line(width*0.15+0.8*width*i/dataLength,height*0.95,width*0.05+0.87*width*i/dataLength,height);
            } else{
               if( i % 2 == 0){
                  p.fill('black');
                  p.noStroke();
                  p.textSize(width*0.04);
                  p.textStyle('bold');
                  p.textAlign('center', 'bottom');
                  p.text(String(i+1), width*0.15+0.8*width*i/dataLength, 0.97*height);
                  p.line(width*0.15+0.8*width*i/dataLength,height*0.95,width*0.05+0.87*width*i/dataLength,height);
               }
            }
            p.strokeWeight(1);
            p.stroke("black");
            p.textAlign('center');
            p.textStyle('bold');
            p.fill(CPUWeek.colorA[3]);
            p.text('Core Average',width*0.52,height*0.07);
            
         }
         p.fill('black');
         p.noStroke();
         p.textAlign('right','top');
         p.text('단위:%',width*0.98,2);
         if(RAMWeek.timeCount > 0.5){
         CPUWeek.timeCount += 0.025;
         }
         if(CPUWeek.timeCount > 1){
            CPUWeek.timeCount = 1;
         }
      }
   }
   p.windowResized = () => {
      p.resizeCanvas(...CPUWeek.getSize());
   }
}

new p5(CPUWeekGraph, 'cpuWeek');
// =================================================================================
