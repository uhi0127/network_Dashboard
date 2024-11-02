// Traffic Week data 파생 클래스 선언
class Trafficweek extends a_WeekBoard {
   constructor( name, parent){
      super(name, parent);
   }
}
const TrafficWeek = new Trafficweek('TrafficWeek', 'trafficWeek');
const TrafficWeekGraph = p => {
   p.setup = () => {
        p.createCanvas(...TrafficWeek.getSize());
        p.angleMode(p.DEGREES);
        p.frameRate(40);
   }
   p.draw = () => {
      if( RAMWeek.dataGet === true){
         [width, height] = TrafficWeek.getSize();
         p.noStroke();
         p.fill('white');
         p.rect(0,0,width,height);
         p.stroke('black');
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa');
         let usedData = [];
         for(let key in RAMWeek.TRAFFIC){
            usedData.push(RAMWeek.TRAFFIC[key]);
         }
         usedData[1] = usedData[1].map((v,i,a)=>{
            return Math.round(v/350*100)/100;
         })
         usedData[0] = usedData[0].map((v,i,a)=>{
            return Math.round(v/350*100)/100;
         })
         let dataLength = usedData[0].length;
         p.fill('black');
         p.textAlign('left','top');
         p.textStyle('normal');
         for(let i=0; i<10; i++){
            p.line(0,height*0.1*i,width,height*0.1*i);
            p.text(String(Math.round(350*(i+1)/10))+"MB",width*0.01,height*0.905 - height*0.1*(i));
         };
         p.textAlign('right','top');
         p.text('단위:MB',width*0.95,5);
         for(let i=0; i<usedData[0].length; i++){
         p.strokeWeight(3);
            p.stroke(TrafficWeek.colorA[0]);
            p.line(width*0.1 + 0.9*width*i/dataLength,0.9*height - 0.9*height*usedData[0][i]*TrafficWeek.timeCount, width*0.1 +  0.9*width*(i+1)/dataLength,0.9*height - 0.9*height*usedData[0][i+1]*TrafficWeek.timeCount);
            p.fill('white');
            p.ellipse(width*0.1 + 0.9*width*i/dataLength, 0.9*height - 0.9*height*usedData[0][i]*TrafficWeek.timeCount, width*0.01, width*0.01);
            p.stroke(TrafficWeek.colorA[4]);
            p.line(width*0.1 + 0.9*width*i/dataLength,0.9*height - 0.9*height*usedData[1][i]*TrafficWeek.timeCount, width*0.1 +  0.9*width*(i+1)/dataLength,0.9*height - 0.9*height*usedData[1][i+1]*TrafficWeek.timeCount);
            p.fill('white');
            p.ellipse(width*0.1 + 0.9*width*i/dataLength, 0.9*height - 0.9*height*usedData[1][i]*TrafficWeek.timeCount, width*0.01, width*0.01);
            if(usedData[0].length < 8){
               p.fill('black');
               p.noStroke();
               p.textSize(width*0.02);
               p.textStyle('bold');
               p.textAlign('center', 'bottom');
               p.text(RAMWeek.dayA[i], width*0.1+0.9*width*i/dataLength, 0.97*height);
               p.line(width*0.1+0.9*width*i/dataLength,height*0.95,width*0.05+0.87*width*i/dataLength,height);
            } else{
               if( i % 2 == 0){
                  p.fill('black');
                  p.noStroke();
                  p.textSize(width*0.01);
                  p.textStyle('bold');
                  p.textAlign('center', 'bottom');
                  p.text(String(i+1), width*0.1+0.9*width*i/dataLength, 0.97*height);
                  p.line(width*0.1+0.9*width*i/dataLength,height*0.95,width*0.05+0.87*width*i/dataLength,height);
               };
            };
         };
            p.strokeWeight(1);
            p.textAlign('center');
            p.textStyle('bold');
            p.stroke('black');
            p.strokeWeight(1.5);
            p.textSize(width*0.015);
            p.fill(TrafficWeek.colorA[0]);
            p.text('Data Upload',width*0.12,height*0.07);
            p.fill(TrafficWeek.colorA[4]);
            p.text('Data Download',width*0.25,height*0.07);
            p.textSize(width*0.01);

         if(DISKWeek.timeCount > 0.5){
         TrafficWeek.timeCount += 0.025;
         }
         if(TrafficWeek.timeCount > 1){
            TrafficWeek.timeCount = 1;
         };
      };
   };
   p.windowResized = () => {
      p.resizeCanvas(...TrafficWeek.getSize());
   };
};
new p5(TrafficWeekGraph, 'trafficWeek');

