class DISKmonth extends a_MonthBoard {
   constructor( name, parent){
      super(name, parent)
   }
}

const DISKMonth = new DISKmonth('DISKMonth', 'diskMonth')




const DISKMonthGraph = p => {
   p.setup = () => {
        p.createCanvas(...DISKMonth.getSize());
        p.angleMode(p.DEGREES);
        p.frameRate(40)
   }
   p.draw = () => {
      if( RAMMonth.dataGet === true){
         [width, height] = DISKMonth.getSize()
         p.noStroke()
         p.fill('white')
         p.rect(0,0,width,height)
         p.stroke('black')
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa')

         DISKMonth.now = RAMMonth.DISK
         p.textAlign('left','top')
         p.fill('black')
         p.textStyle('normal')
         for(let i=1; i<=10; i++){
            p.text(String(Math.round((i*10)))+"%",width*0.01,height - height*0.1*(i))
            p.line(0,height*0.1*i,width,height*0.1*i)
         }
         let usedData = [
            DISKMonth.now.LOCAL.LOCALMAIN.TOTAL, DISKMonth.now.LOCAL.LOCALMAIN.USED,
            DISKMonth.now.LOCAL.LOCALSUB.TOTAL, DISKMonth.now.LOCAL.LOCALSUB.USED,
            DISKMonth.now.USB.USBMAIN.TOTAL, DISKMonth.now.USB.USBMAIN.USED,
            DISKMonth.now.USB.USBSUB.TOTAL, DISKMonth.now.USB.USBSUB.USED,
            DISKMonth.now.WEB.WEBMAIN.TOTAL, DISKMonth.now.WEB.WEBMAIN.USED,
            DISKMonth.now.WEB.WEBSUB.TOTAL, DISKMonth.now.WEB.WEBSUB.USED
         ]
         let dataLength = usedData[0].length
         for(let i=0; i<usedData[0].length; i++){
            p.strokeWeight(1.5)
            p.stroke(DISKMonth.colorA[0])
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*(usedData[1][i]+usedData[3][i])/(usedData[2][i]+usedData[0][i])*DISKMonth.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*(usedData[1][i+1]+usedData[3][i+1])/(usedData[0][i+1]+usedData[2][i+1])*DISKMonth.timeCount)
            p.fill('white')
            p.ellipse(width*0.15 + 0.8*width*i/dataLength, 0.9*height - 0.9*height*(usedData[1][i]+usedData[3][i])/(usedData[2][i]+usedData[0][i])*DISKMonth.timeCount, width*0.02, width*0.02)
            p.stroke(DISKMonth.colorA[3])
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*(usedData[5][i]+usedData[7][i])/(usedData[4][i]+usedData[6][i])*DISKMonth.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*(usedData[5][i+1]+usedData[7][i+1])/(usedData[4][i+1]+usedData[6][i+1])*DISKMonth.timeCount)
            p.fill('white')
            p.ellipse(width*0.15 + 0.8*width*i/dataLength, 0.9*height - 0.9*height*(usedData[5][i]+usedData[7][i])/(usedData[4][i]+usedData[6][i])*DISKMonth.timeCount, width*0.02, width*0.02)
            p.stroke(DISKMonth.colorA[5])
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*(usedData[9][i]+usedData[11][i])/(usedData[8][i]+usedData[10][i])*DISKMonth.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*(usedData[9][i+1]+usedData[11][i+1])/(usedData[8][i+1]+usedData[10][i+1])*DISKMonth.timeCount)
            p.fill('white')
            p.ellipse(width*0.15 + 0.8*width*i/dataLength, 0.9*height - 0.9*height*(usedData[9][i]+usedData[11][i])/(usedData[8][i]+usedData[10][i])*DISKMonth.timeCount, width*0.02, width*0.02)
            if(NetworkMonth.now.TOTAL.length < 8){
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
         }
         p.textAlign('right','top')
         p.text('단위:%',width*0.98,2);
         p.strokeWeight(1)
         p.stroke("black")
         p.strokeWeight(1.5)
         p.textAlign('center')
         p.textStyle('bold')
         p.fill(DISKMonth.colorA[0])
         p.text('Local',width*0.3, height*0.05)
         p.fill(DISKMonth.colorA[3])
         p.text('USB',width*0.5,height*0.05)
         p.fill(DISKMonth.colorA[5])
         p.text('WEB',width*0.7,height*0.05)
         if(NetworkMonth.timeCount > 0.5){
         DISKMonth.timeCount += 0.025;
         }
         if(DISKMonth.timeCount > 1){
            DISKMonth.timeCount = 1;
         }
      }
   }
   p.windowResized = () => {
      p.resizeCanvas(...DISKMonth.getSize())
   }
}


new p5(DISKMonthGraph, 'diskMonth')
