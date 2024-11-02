// network data 파생 클래스 선언
class Networkweek extends a_WeekBoard{
   constructor(name, parent){
      super(name, parent);
   }
}

const NetworkWeek = new a_WeekBoard("netwrokWeek", "networkWeek");


const NetworkWeekGraph = p => {
   p.setup = () =>{

        p.createCanvas(...NetworkWeek.getSize());
        p.angleMode(p.DEGREES);
        p.frameRate(40);
   }
   p.draw = () => {
      if( RAMWeek.dataGet === true){
         [width, height] = NetworkWeek.getSize();
         p.noStroke();
         p.fill('white');
         p.rect(0,0,width,height);
         p.stroke('black');
         p.line(0,height,width,height);
         p.line(0,0,0,height);
         p.stroke('#aaaaaa');
         NetworkWeek.now = RAMWeek.SPEED;
         p.textAlign('left','top');
         p.fill('black');
         p.textStyle('normal');
         for(let i=1; i<=10; i++){
            p.text(String(Math.round((i*10)))+"%",width*0.01,height - height*0.1*(i));
            p.line(0,height*0.1*i,width,height*0.1*i);
         }
         for(let i=1; i<=10; i++){
            p.text(String(Math.round((i*10)))+"%",width*0.01,height - height*0.1*(i));
            p.line(0,height*0.1*i,width,height*0.1*i);
         }
         let dataLength = NetworkWeek.now.TOTAL.length;
         for(let i=0; i<NetworkWeek.now.TOTAL.length; i++){
            p.strokeWeight(1.5);
            p.stroke(NetworkWeek.colorA[0]);
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkWeek.now.TOTAL[i]/400*NetworkWeek.timeCount, width*0.15 + 0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*NetworkWeek.now.TOTAL[i+1]/400*NetworkWeek.timeCount);
            p.strokeWeight(1.5);
            p.fill('white');
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkWeek.now.TOTAL[i]/400*NetworkWeek.timeCount, width*0.025, width*0.025);
            p.strokeWeight(1.5);
            p.stroke(NetworkWeek.colorA[3]);
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkWeek.now.UPLOAD[i]/400*NetworkWeek.timeCount, width*0.15 + 0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*NetworkWeek.now.UPLOAD[i+1]/400*NetworkWeek.timeCount);
            p.strokeWeight(1.5);
            p.fill('white');
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkWeek.now.UPLOAD[i]/400*NetworkWeek.timeCount, width*0.025, width*0.025);
            p.strokeWeight(1.5);
            p.stroke(NetworkWeek.colorA[5]);
            p.line(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkWeek.now.DOWNLOAD[i]/400*NetworkWeek.timeCount, width*0.15 +0.8*width*(i+1)/dataLength,0.9*height - 0.9*height*NetworkWeek.now.DOWNLOAD[i+1]/400*NetworkWeek.timeCount);
            p.strokeWeight(1.5);
            p.fill('white');
            p.ellipse(width*0.15 + 0.8*width*i/dataLength,0.9*height - 0.9*height*NetworkWeek.now.DOWNLOAD[i]/400*NetworkWeek.timeCount, width*0.025, width*0.025);
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
               };
            };
         };
         p.textAlign('right','top');
         p.text('단위:%',width*0.98,2);
         p.strokeWeight(1);
         p.stroke("black");
         p.strokeWeight(1.5);
         p.textAlign('center');
         p.textStyle('bold');
         p.fill(NetworkWeek.colorA[0]);
         p.text('Maxspeed',width*0.3, height*0.05);
         p.fill(NetworkWeek.colorA[3]);
         p.text('Upload',width*0.5,height*0.05);
         p.fill(NetworkWeek.colorA[5]);
         p.text('Downladd',width*0.7,height*0.05);
         if(CPUWeek.timeCount > 0.5){
         NetworkWeek.timeCount += 0.025;
         }
         if(NetworkWeek.timeCount > 1){
            NetworkWeek.timeCount = 1;
         }
      }
   }
   p.windowResized = () => {
      p.resizeCanvas(...NetworkWeek.getSize());
   }
}
new p5(NetworkWeekGraph, 'networkWeek');
