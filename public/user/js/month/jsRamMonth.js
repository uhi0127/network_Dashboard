
class RAMmonth extends a_MonthBoard{
   constructor(name, parent){
      super(name, parent)
   }
}

const RAMMonth = new RAMmonth('RAMmonth', 'RAMMonth')



const RAMMonthGraph = p => {
   p.setup = () => {
        p.createCanvas(...RAMMonth.getSize());
        p.angleMode(p.DEGREES);
        RAMMonth.getData(RAMMonth.nowTime);
        p.frameRate(40)
   }
   p.draw = () => {
      if( RAMMonth.dataGet === true){
         [width, height] = RAMMonth.getSize()
         p.noStroke()
         p.fill('white')
         p.rect(0,0,width,height)
         p.stroke('black')
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa')
         let usedData = RAMMonth.RAM.USED;
         let totalData = RAMMonth.RAM.TOTAL;
         let dataLength = usedData.length;
         p.fill('black')
         p.textAlign('left','top')
         p.textStyle('normal')
         for(let i=0; i<=10; i++){
            p.stroke('black')
            p.line(0,height*0.1*i,width,height*0.1*i)
            p.noStroke()
            p.textStyle('bold')
            p.text(String(Math.round(totalData[0]*(i+1)/10))+"GB",width*0.01,height - height*0.1*(i+1))
         }
         p.textAlign('right','top')
         p.text('단위:GB',width*0.98,2);
         p.textAlign('center','bottom')
         for(let i=0; i<usedData.length; i++){
            p.stroke(RAMMonth.colorA[0])
            p.strokeWeight(2.5)
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - (0.9*height*usedData[i]/totalData[i])*RAMMonth.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - (0.9*height*usedData[i+1]/totalData[i+1])*RAMMonth.timeCount)
            p.strokeWeight(1.5)
            p.fill('white')
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - (0.9*height*usedData[i]/totalData[i])*RAMMonth.timeCount, width*0.03, width*0.03)
            if(usedData.length < 8){
               p.fill('black')
               p.noStroke()
               p.textSize(width*0.04)
               p.textStyle('bold')
               p.textAlign('center', 'bottom')
               p.text(RAMMonth.dayA[i], width*0.15+0.8*width*i/dataLength, 0.97*height)
               p.line(width*0.15+0.8*width*i/dataLength,height*0.95,width*0.05+0.87*width*i/dataLength,height)
            } else{
               if( i % 2 == 0){
                  p.fill('black')
                  p.noStroke()
                  p.textSize(width*0.04)
                  p.textStyle('bold')
                  p.textAlign('center', 'bottom')
                  p.text(String(i+1), width*0.15+0.8*width*i/dataLength, 0.97*height)
                  p.line(width*0.15+0.8*width*i/dataLength,height*0.95,width*0.05+0.87*width*i/dataLength,height)
               }
            }
            p.strokeWeight(1)
            p.stroke("black")
            p.textAlign('center')
            p.textStyle('bold')
            p.fill(RAMMonth.colorA[0])
            p.text('Memory Average',width*0.52,height*0.07)
         }


         RAMMonth.timeCount += 0.025;
         if(RAMMonth.timeCount > 1){
            RAMMonth.timeCount = 1;
         }
      }
   }
   p.windowResized = () => {
      p.resizeCanvas(...RAMMonth.getSize())
   }
}


new p5(RAMMonthGraph, 'RAMMonth')


let dateText = document.getElementById("dateText")
let year = 2024
let month = 1


dateText.innerHTML =year+"년"+month+"월"

if(month==1){
   document.getElementById("beforeBtn").disabled = true;
}else if(month == 2){
   document.getElementById("afterBtn").disabled = true;
}else{
   document.getElementById("beforeBtn").disabled = false;
   document.getElementById("afterBtn").disabled = false;
}

document.getElementById('afterBtn').onclick = () => {
   month = month+1;
   RAMMonth.timeMonth = year + '0' + String(month)

   dateText.innerHTML =year+"년"+month+"월"

   RAMMonth.getData(RAMMonth.timeMonth)
   RAMMonth.timeCount = 0
   CPUMonth.timeCount = 0
   NetworkMonth.timeCount = 0
   TrafficMonth.timeCount = 0
   DISKMonth.timeCount =0
   EventMonth.timeCount = 0
   if(month==1){
      document.getElementById("beforeBtn").disabled = true;
      document.getElementById("afterBtn").disabled = false;
   }else if(month == 2){
      document.getElementById("afterBtn").disabled = true;
      document.getElementById("beforeBtn").disabled = false;
   }
}

document.getElementById('beforeBtn').onclick = () => {
   month = month-1;
   RAMMonth.timeMonth = year + '0' + String(month)

   dateText.innerHTML =year+"년"+month+"월"

   RAMMonth.getData(RAMMonth.timeMonth)
   RAMMonth.timeCount = 0
   CPUMonth.timeCount = 0
   NetworkMonth.timeCount = 0
   TrafficMonth.timeCount = 0
   DISKMonth.timeCount =0
   EventWeek.timeCount = 0
   if(month==1){
      document.getElementById("beforeBtn").disabled = true;
      document.getElementById("afterBtn").disabled = false;
   }else if(month == 2){
      document.getElementById("afterBtn").disabled = true;
      document.getElementById("beforeBtn").disabled = false;
   }
}
