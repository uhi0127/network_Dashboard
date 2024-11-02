class CPUmonth extends a_MonthBoard{
   constructor(name, parent){
      super(name, parent)
   }
}
const CPUMonth = new CPUmonth('CPUMonth', 'cpuMonth')


const CPUMonthGraph = p => {
   p.setup = () => {
        p.createCanvas(...CPUMonth.getSize());
        p.angleMode(p.DEGREES);
        p.frameRate(40)
   }
   p.draw = () => {
      if( RAMMonth.dataGet === true){
         [width, height] = CPUMonth.getSize()
         p.noStroke()
         p.fill('white')
         p.rect(0,0,width,height)
         p.stroke('black')
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa')
         let usedData = RAMMonth.CPU.eachCPU
         let usedA = [];
         let dataLength = usedData.CPU1.length;
         p.fill('black')
         p.textAlign('left','top')
         p.textStyle('normal')
         for(let i=1; i<=10; i++){
            p.noStroke()
            p.textSize(width*0.04)
            p.text(String(Math.round((i*10)))+"%",width*0.01,height*1.02 - height*0.1*(i))
            p.stroke('black')
            p.line(0,height*0.1*i,width,height*0.1*i)
         }
         for(let k=0; k<dataLength; k++){
            usedA.push(0)
            for(let key in usedData){
               usedA[k] += usedData[key][k]/8/100
            }
         }
         for(let i=0; i<usedA.length; i++){
            p.stroke(CPUMonth.colorA[3])
            p.strokeWeight(2.5)
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*usedA[i]*CPUMonth.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - (0.9*height*usedA[i+1])*CPUMonth.timeCount)
            p.fill('white')
            p.strokeWeight(1.5)
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*usedA[i]*CPUMonth.timeCount, width*0.03, width*0.03)
            if(usedA.length < 8){
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
            p.fill(CPUMonth.colorA[3])
            p.text('Core Average',width*0.52,height*0.07)
            
         }
         p.noStroke()
         p.fill('black')
         p.textAlign('right','top')
         p.text('단위:%',width*0.98,2);
         if(RAMMonth.timeCount > 0.5){
         CPUMonth.timeCount += 0.025;
         }
         if(CPUMonth.timeCount > 1){
            CPUMonth.timeCount = 1;
         }
      }
   }
   p.windowResized = () => {
      p.resizeCanvas(...CPUMonth.getSize())
   }
}


new p5(CPUMonthGraph, 'cpuMonth')
