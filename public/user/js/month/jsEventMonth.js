class Eventmonth extends a_MonthBoard {
   constructor(name, parent){
      super(name, parent)
      this.attack = 0;
      this.safe = 0;
      this.update = 0;
      this.network = 0;
   }
   parseData(data){
      this.attack = 0;
      this.safe = 0;
      this.update = 0;
      this.network = 0;

      for(let i=0; i<data.ATTACK.length;i++){
         this.attack += data.ATTACK[i];
         this.safe += data.SAFEWALL[i];
         this.update += data.OSUPDATE[i];
         this.network += data.NETWORKONOFF[i];
      }
      return [ this.attack, this.safe, this.update, this.network]
   }
}

const EventMonth = new Eventmonth('EventMonth', 'textBox')

const EventMonthGraph = p => {
   p.setup = () => {
      p.createCanvas(...EventMonth.getSize())
      p.frameRate(40)
   }
   p.draw = () => {
      if( RAMMonth.dataGet === true){
         [width, height] = EventMonth.getSize()
         p.noStroke()
         p.fill('white')
         p.rect(0,0,width,height)
         p.stroke('black')
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa')
         EventMonth.now = RAMMonth.now.EVENT
         let usedData = EventMonth.parseData(EventMonth.now)
         let dataLength = EventMonth.now.ATTACK.length
         p.fill('black')
         p.textAlign('left','top')
         p.textStyle('normal')
         for(let i=0; i<10; i++){
            p.line(0,height*0.1*i,width,height*0.1*i)
         }
         p.textAlign('right','top')
         p.text('단위:회',width*0.95,5);
         for(let i=0; i<usedData.length; i++){
            p.textSize(width*0.08)
            p.strokeWeight(1)
            p.stroke(EventMonth.colorA[i])
            p.fill(EventMonth._colorA[i])
            p.rect(width*0.2*(i+0.5), 0.9*height-0.9*height*usedData[i]/dataLength*EventMonth.timeCount, width*0.2, 0.9*height*usedData[i]/dataLength*EventMonth.timeCount)
            p.textAlign('center','bottom')
            p.text(String(Math.round(usedData[i]*EventMonth.timeCount)), width*0.2*(i+1), 0.9*height-0.9*height*usedData[i]/dataLength*EventMonth.timeCount)
         }
         p.textSize(width*0.035)
         p.stroke(EventMonth.colorA[0])
         p.fill(EventMonth.colorA[0])
         p.text("Attack",  width*0.2, height)
         p.stroke(EventMonth.colorA[1])
         p.fill(EventMonth.colorA[1])
         p.text("Safewall",  width*0.4, height)
         p.stroke(EventMonth.colorA[2])
         p.fill(EventMonth.colorA[2])
         p.text("OSUpdate",  width*0.6, height)
         p.stroke(EventMonth.colorA[3])
         p.fill(EventMonth.colorA[3])
         p.text("Network/Off",  width*0.8, height)
         if(TrafficMonth.timeCount > 0.5){
         EventMonth.timeCount += 0.025;
         }
         if(EventMonth.timeCount > 1){
            EventMonth.timeCount = 1;
         }
      }
   }
   p.windowResized = () => {
   	p.resizeCanvas(...EventMonth.getSize())
   }
}
new p5(EventMonthGraph, 'textBox')
