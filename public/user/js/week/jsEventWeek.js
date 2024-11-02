class Eventweek extends a_WeekBoard {
   constructor(name, parent){
      super(name, parent);
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
      return [ this.attack, this.safe, this.update, this.network];
   }
}


const EventWeek = new Eventweek('EventWeek', 'textBox');
const EventWeekGraph = p => {
   p.setup = () => {
      p.createCanvas(...EventWeek.getSize());
      p.frameRate(40);
   }
   p.draw = () => {
      if( RAMWeek.dataGet === true){
         [width, height] = EventWeek.getSize();
         p.noStroke();
         p.fill('white');
         p.rect(0,0,width,height);
         p.stroke('black');
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa');
         EventWeek.now = RAMWeek.now.EVENT;
         let usedData = EventWeek.parseData(EventWeek.now);
         let dataLength = EventWeek.now.ATTACK.length;
         p.fill('black');
         p.textAlign('left','top');
         p.textStyle('normal');
         for(let i=0; i<10; i++){
            p.line(0,height*0.1*i,width,height*0.1*i);
         }
         p.textAlign('right','top');
         p.text('단위:회',width*0.95,5);
         for(let i=0; i<usedData.length; i++){
            p.textSize(width*0.08);
            p.strokeWeight(1);
            p.stroke(EventWeek.colorA[i]);
            p.fill(EventWeek._colorA[i]);
            p.rect(width*0.2*(i+0.5), 0.9*height-0.9*height*usedData[i]/dataLength*EventWeek.timeCount, width*0.2, 0.9*height*usedData[i]/dataLength*EventWeek.timeCount);
            p.textAlign('center','bottom');
            p.text(String(Math.round(usedData[i]*EventWeek.timeCount)), width*0.2*(i+1), 0.9*height-0.9*height*usedData[i]/dataLength*EventWeek.timeCount);
         }
         p.textSize(width*0.035);
         p.stroke(EventWeek.colorA[0]);
         p.fill(EventWeek.colorA[0]);
         p.text("Attack",  width*0.2, height);
         p.stroke(EventWeek.colorA[1]);
         p.fill(EventWeek.colorA[1]);
         p.text("Safewall",  width*0.4, height);
         p.stroke(EventWeek.colorA[2]);
         p.fill(EventWeek.colorA[2]);
         p.text("OSUpdate",  width*0.6, height);
         p.stroke(EventWeek.colorA[3]);
         p.fill(EventWeek.colorA[3]);
         p.text("Network/Off",  width*0.8, height);
         if(TrafficWeek.timeCount > 0.5){
         EventWeek.timeCount += 0.025;
         }
         if(EventWeek.timeCount > 1){
            EventWeek.timeCount = 1;
         }
      }
   }
   p.windowResized = () => {
   		p.resizeCanvas(...EventWeek.getsize());
   }
}
new p5(EventWeekGraph, 'textBox');
