// RAM data 파생클래스 선언
class RAMweek extends a_WeekBoard{
   constructor(name, parent){
      super(name, parent);
   }
}
// RAM week data 인스턴스 생성
const RAMWeek = new RAMweek('RAMWeek', 'RAMWeek');
const RAMWeekGraph = p => {
   p.setup = () => {
        p.createCanvas(...RAMWeek.getSize());
        p.angleMode(p.DEGREES);
        RAMWeek.getData(RAMWeek.nowTime);
        p.frameRate(40);
   }
   p.draw = () => {
      if( RAMWeek.dataGet === true){
         [width, height] = RAMWeek.getSize();
         p.noStroke();
         p.fill('white');
         p.rect(0,0,width,height);
         p.stroke('black');
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa');
         let usedData = RAMWeek.RAM.USED;
         let totalData = RAMWeek.RAM.TOTAL;
         let dataLength = usedData.length;
         p.fill('black');
         p.textAlign('left','top');
         p.textStyle('normal');
         for(let i=0; i<=10; i++){
            p.line(0,height*0.1*i,width,height*0.1*i);
            p.text(String(Math.round(totalData[0]*(i+1)/10))+"GB",width*0.01,height - height*0.1*(i+1));
         };
         p.textAlign('right','top');
         p.text('단위:GB',width*0.98,2);
         p.textAlign('center','bottom');
         for(let i=0; i<usedData.length; i++){
            p.stroke(RAMWeek.colorA[0]);
            p.strokeWeight(2.5);
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - (0.9*height*usedData[i]/totalData[i])*RAMWeek.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - (0.9*height*usedData[i+1]/totalData[i+1])*RAMWeek.timeCount);
            p.strokeWeight(1.5);
            p.fill('white');
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - (0.9*height*usedData[i]/totalData[i])*RAMWeek.timeCount, width*0.03, width*0.03);
            if(usedData.length < 8){
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
            p.fill(RAMWeek.colorA[0]);
            p.text('Memory Average',width*0.52,height*0.07);
         }
         RAMWeek.timeCount += 0.025;
         if(RAMWeek.timeCount > 1){
            RAMWeek.timeCount = 1;
         };
      };
   };
   p.windowResized = () => {
      p.resizeCanvas(...RAMWeek.getSize());
   };
};
new p5(RAMWeekGraph, 'RAMWeek');

// data 이동 버튼 
let dateText = document.getElementById("dateText");
let year = RAMWeek.nowTime.split('_')[0];
let week = Number(RAMWeek.nowTime.split('_')[1]);
dateText.innerHTML =year+"년"+week+"주차";
if(week==1){
   document.getElementById("beforeBtn").disabled = true;
}else if(week == 11){
   document.getElementById("afterBtn").disabled = true;
}else{
   document.getElementById("beforeBtn").disabled = false;
   document.getElementById("afterBtn").disabled = false;
}

document.getElementById('afterBtn').onclick = () => {
   week = week+1;
   RAMWeek.nowTime = year + '_' + String(week);
   dateText.innerHTML =year+"년"+week+"주차";
   RAMWeek.getData(RAMWeek.nowTime);
   RAMWeek.timeCount = 0;
   CPUWeek.timeCount = 0;
   NetworkWeek.timeCount = 0;
   TrafficWeek.timeCount = 0;
   DISKWeek.timeCount =0;
   EventWeek.timeCount = 0;
   console.log(week);
   if(week==1){
      document.getElementById("beforeBtn").disabled = true;
   }else if(week == 11){
      document.getElementById("afterBtn").disabled = true;
   }else{
      document.getElementById("beforeBtn").disabled = false;
      document.getElementById("afterBtn").disabled = false;
   };
};

document.getElementById('beforeBtn').onclick = () => {
   week = week-1;
   RAMWeek.nowTime = year + '_' + String(week);
   dateText.innerHTML =year+"년"+week+"주차";
   RAMWeek.getData(RAMWeek.nowTime);
   RAMWeek.timeCount = 0;
   CPUWeek.timeCount = 0;
   NetworkWeek.timeCount = 0;
   TrafficWeek.timeCount = 0;
   DISKWeek.timeCount =0;
   EventWeek.timeCount = 0;
   if(week==1){
      document.getElementById("beforeBtn").disabled = true;
   }else if(week == 11){
      document.getElementById("afterBtn").disabled = true;
   }else{
      document.getElementById("beforeBtn").disabled = false;
      document.getElementById("afterBtn").disabled = false;
   };
};
