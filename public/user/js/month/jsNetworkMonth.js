class Networkmonth extends a_MonthBoard{
   constructor(name, parent){
      super(name, parent)
   }
}


const NetworkMonth = new Networkmonth("NetwrokMonth", "networkMonth");


const NetworkMonthGraph = p => {
   p.setup = () =>{
        p.createCanvas(...NetworkMonth.getSize());
        p.angleMode(p.DEGREES);
        p.frameRate(40)
   }
   p.draw = () => {
      if( RAMMonth.dataGet === true){
         [width, height] = NetworkMonth.getSize()
         p.noStroke()
         p.fill('white')
         p.rect(0,0,width,height)
         p.stroke('black')
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa')
         NetworkMonth.now = RAMMonth.SPEED
         p.textAlign('left','top')
         p.fill('black')
         p.textStyle('normal')
         for(let i=1; i<=10; i++){
            p.noStroke()
            p.textSize(width*0.04)
            p.fill('black')
            p.text(String(Math.round(i*350/10))+"MB",width*0.01,height - height*0.1*(i))
            p.stroke('black')
            p.strokeWeight(1)
            p.line(0,height*0.1*i,width,height*0.1*i)
         }
         let dataLength = NetworkMonth.now.TOTAL.length
         for(let i=0; i<NetworkMonth.now.TOTAL.length; i++){
            p.strokeWeight(1.5)
            p.stroke(NetworkMonth.colorA[0]) 
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkMonth.now.TOTAL[i]/400*NetworkMonth.timeCount, width*0.15 + 0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*NetworkMonth.now.TOTAL[i+1]/400*NetworkMonth.timeCount)
            p.strokeWeight(1.5)
            p.fill('white')
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkMonth.now.TOTAL[i]/400*NetworkMonth.timeCount, width*0.025, width*0.025)
            p.strokeWeight(1.5)
            p.stroke(NetworkMonth.colorA[3])
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkMonth.now.UPLOAD[i]/400*NetworkMonth.timeCount, width*0.15 + 0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*NetworkMonth.now.UPLOAD[i+1]/400*NetworkMonth.timeCount)
            p.strokeWeight(1.5)
            p.fill('white')
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkMonth.now.UPLOAD[i]/400*NetworkMonth.timeCount, width*0.025, width*0.025)
            p.strokeWeight(1.5)
            p.stroke(NetworkMonth.colorA[5])
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkMonth.now.DOWNLOAD[i]/400*NetworkMonth.timeCount, width*0.15 +0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*NetworkMonth.now.DOWNLOAD[i+1]/400*NetworkMonth.timeCount)
            p.strokeWeight(1.5)
            p.fill('white')
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkMonth.now.DOWNLOAD[i]/400*NetworkMonth.timeCount, width*0.025, width*0.025)
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
         p.text('단위:MB',width*0.98,2);
         p.strokeWeight(1)
         p.stroke("black")
         p.strokeWeight(1.5)
         p.textAlign('center')
         p.textStyle('bold')
         p.fill(NetworkMonth.colorA[0])
         p.text('Maxspeed',width*0.3, height*0.05)
         p.fill(NetworkMonth.colorA[3])
         p.text('Upload',width*0.5,height*0.05)
         p.fill(NetworkMonth.colorA[5])
         p.text('Downladd',width*0.7,height*0.05)

         if(CPUMonth.timeCount > 0.5){
         NetworkMonth.timeCount += 0.025;
         }
         if(NetworkMonth.timeCount > 1){
            NetworkMonth.timeCount = 1;
         }
      }
   }
   p.windowResized = () => {
      p.resizeCanvas(...NetworkMonth.getSize())
   }
}


new p5(NetworkMonthGraph, 'networkMonth')
