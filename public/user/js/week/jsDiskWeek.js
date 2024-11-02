class DISKweek extends a_WeekBoard {
   constructor( name, parent){
      super(name, parent);
   }
}


const DISKWeek = new DISKweek('diskWeek', 'diskWeek');


const DISKWeekGraph = p => {
   p.setup = () => {
        p.createCanvas(...DISKWeek.getSize());
        p.angleMode(p.DEGREES);
        p.frameRate(40);
   }
   p.draw = () => {
      if( RAMWeek.dataGet === true){
         [width, height] = DISKWeek.getSize();
         p.noStroke();
         p.fill('white');
         p.rect(0,0,width,height);
         p.stroke('black');
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa');
         DISKWeek.now = RAMWeek.DISK;
         p.textAlign('left','top');
         p.fill('black');
         p.textStyle('normal');
         for(let i=1; i<=10; i++){
            p.text(String(Math.round((i*10)))+"%",width*0.01,height - height*0.1*(i));
            p.line(0,height*0.1*i,width,height*0.1*i);
         }
         let usedData = [
            DISKWeek.now.LOCAL.LOCALMAIN.TOTAL, DISKWeek.now.LOCAL.LOCALMAIN.USED,
            DISKWeek.now.LOCAL.LOCALSUB.TOTAL, DISKWeek.now.LOCAL.LOCALSUB.USED,
            DISKWeek.now.USB.USBMAIN.TOTAL, DISKWeek.now.USB.USBMAIN.USED,
            DISKWeek.now.USB.USBSUB.TOTAL, DISKWeek.now.USB.USBSUB.USED,
            DISKWeek.now.WEB.WEBMAIN.TOTAL, DISKWeek.now.WEB.WEBMAIN.USED,
            DISKWeek.now.WEB.WEBSUB.TOTAL, DISKWeek.now.WEB.WEBSUB.USED
         ];
         let dataLength = usedData[0].length;
         for(let i=0; i<usedData[0].length; i++){
            p.strokeWeight(1.5);
            p.stroke(DISKWeek.colorA[0]);
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*(usedData[1][i]+usedData[3][i])/(usedData[2][i]+usedData[0][i])*DISKWeek.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*(usedData[1][i+1]+usedData[3][i+1])/(usedData[0][i+1]+usedData[2][i+1])*DISKWeek.timeCount);
            p.fill('white');
            p.ellipse(width*0.15 + 0.8*width*i/dataLength, 0.9*height - 0.9*height*(usedData[1][i]+usedData[3][i])/(usedData[2][i]+usedData[0][i])*DISKWeek.timeCount, width*0.02, width*0.02);
            p.stroke(DISKWeek.colorA[3]);
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*(usedData[5][i]+usedData[7][i])/(usedData[4][i]+usedData[6][i])*DISKWeek.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*(usedData[5][i+1]+usedData[7][i+1])/(usedData[4][i+1]+usedData[6][i+1])*DISKWeek.timeCount);
            p.fill('white');
            p.ellipse(width*0.15 + 0.8*width*i/dataLength, 0.9*height - 0.9*height*(usedData[5][i]+usedData[7][i])/(usedData[4][i]+usedData[6][i])*DISKWeek.timeCount, width*0.02, width*0.02);
            p.stroke(DISKWeek.colorA[5]);
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*(usedData[9][i]+usedData[11][i])/(usedData[8][i]+usedData[10][i])*DISKWeek.timeCount, width*0.15 +  0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*(usedData[9][i+1]+usedData[11][i+1])/(usedData[8][i+1]+usedData[10][i+1])*DISKWeek.timeCount);
            p.fill('white');
            p.ellipse(width*0.15 + 0.8*width*i/dataLength, 0.9*height - 0.9*height*(usedData[9][i]+usedData[11][i])/(usedData[8][i]+usedData[10][i])*DISKWeek.timeCount, width*0.02, width*0.02);
            if(NetworkWeek.now.TOTAL.length < 8){
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
         }
         p.textAlign('right','top');
         p.text('단위:%',width*0.98,2);
         p.strokeWeight(1);
         p.stroke("black");
         p.strokeWeight(1.5);
         p.textAlign('center');
         p.textStyle('bold');
         p.fill(DISKWeek.colorA[0]);
         p.text('Local',width*0.3, height*0.05);
         p.fill(DISKWeek.colorA[3]);
         p.text('USB',width*0.5,height*0.05);
         p.fill(DISKWeek.colorA[5]);
         p.text('WEB',width*0.7,height*0.05);
         if(NetworkWeek.timeCount > 0.5){
         DISKWeek.timeCount += 0.025;
         }
         if(DISKWeek.timeCount > 1){
            DISKWeek.timeCount = 1;
         }
      }
   }
   p.windowResized = () => {
      p.resizeCanvas(...CPUWeek.getSize());
   }
}
new p5(DISKWeekGraph, 'diskWeek');
