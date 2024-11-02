//moreBtn
let moreWindow = document.getElementById("moreWindow"); 
let moreMessage = document.getElementById("moreMessage"); 
let moreBtn = document.getElementById("moreBtn"); 
let cpuMore = document.getElementById("cpuMore");
let diskMore = document.getElementById("diskMore");
let moreContent = document.getElementById("moteContent")

//CPU 더보기 click event
cpuMore.onclick = ()=> {
   document.getElementById('poprap').style.display = 'flex'
   // 더보기 클릭 시 CPU detail chart p5 생성
   const CPUdetail = new CPUBoard( 'CPUdetail', "pop")
   const CPUdetailGraph = p =>{
      p.setup = () => {
         p.createCanvas(...CPUdetail.getSize());
         p.angleMode(p.DEGREES);
         p.frameRate(40)
      }
      p.draw = () => {

         p.clear();
         if( RAMChart.dataGet ===  true){
               if( CPUdetail.timeCount === 0 ){
                  CPUdetail.parseData(RAMChart.now);
               }

               let [ width, height ] = CPUdetail.getSize()
               p.fill('wthie')
               p.rect(0,0,width,height)
               p.stroke('black')
               p.line(width*0.1,height*0.1,width*0.1,height*0.95)
               p.line(width*0.05,height*0.9, width*0.9, height*0.9)
               CPUdetail.drawA.forEach((v,i,a) => {
                  p.stroke('#999999')
                  p.line(width*0.1,height*0.9*(i+1)/(a.length+1), width*0.9, height*0.9*(i+1)/(a.length+1))
                  p.noStroke()
                  p.fill(CPUdetail.colorA[i])
                  p.rect(width*0.1, height*0.9*(i+1.23)/(a.length+1), width*0.9*(CPUdetail.pastA[0][i]-(CPUdetail.pastA[0][i]-CPUdetail.drawA[i])*CPUdetail.timeCount)/100,height*0.9/(a.length+0.4)/2)
                  p.textAlign('right')
                  p.stroke('white')
                  p.strokeWeight(3)
                  p.textSize(width*0.05)
                  p.text("Core" + String(i+1) +": "+ String(CPUdetail.drawA[i])+"%", width*0.95, height*0.9*(i+1.6)/(a.length+1))
                  p.strokeWeight(1)
               })
               CPUdetail.timeCount += 0.025;
               if( CPUdetail.timeCount > 1){
                  CPUdetail.timeCount = 0
                  CPUdetail.pastA = [];
                  CPUdetail.pastA.push(CPUdetail.drawA);
                  CPUdetail.drawA = []

               }
               p.windowResized = () => {
                  p.resizeCanvas(...CPUdetail.getSize())
               }
         }
      }
      p.windowResized = () => {
         p.resizeCanvas(...CPUdetail.getSize());
      }
      let detailcanvas = document.getElementById('defaultCanvas1')   

      document.getElementById('pop').scrollTo(0,20000)
   }
   new p5(CPUdetailGraph, 'pop')
}

// CPU 더보기 팝업 닫기 버튼
document.getElementById("popexit").onclick=()=>{
   document.getElementById('poprap').style.display = 'none'
}


// DISK 더보기 클릭 event
diskMore.onclick=()=>{
   document.getElementById('poprapdisk').style.display = 'flex'
   const DiskDetail = new DISKBoard('DiskDetail', 'popdisk')
   const DiskDetailGraph = p => {
      p.setup = () => {
         p.createCanvas(...DiskDetail.getSize())
         p.angleMode(p.DEGREES)
         p.background('#999999')
         p.frameRate(40)
         DiskDetail.pastA = [0,0,0,0,0,0]
      }
      p.draw = () => {
         p.clear()
         if( RAMChart.dataGet === true){
               DiskDetail.parseDetail(RAMChart.now);

               let [ width, height ] = DiskDetail.getSize();
               p.textAlign('center','center')
               p.noStroke();
               p.fill('white')
               p.rect(0,0,width,height);
               p.stroke(DiskDetail.colorA[0])
               p.fill(DiskDetail._colorA[0])
               p.rect(width*0.3,height*0.1,width*0.7,height*0.1,width*0.025)
               p.rect(width*0.3,height*0.22,width*0.7,height*0.1,width*0.025)
               p.stroke(DiskDetail.colorA[4])
               p.fill(DiskDetail._colorA[4])
               p.rect(width*0.3,height*0.4,width*0.7,height*0.1,width*0.025)
               p.rect(width*0.3,height*0.52,width*0.7,height*0.1,width*0.025)
               p.stroke(DiskDetail.colorA[5])
               p.fill(DiskDetail._colorA[5])
               p.rect(width*0.3,height*0.7,width*0.7,height*0.1,width*0.025)
               p.rect(width*0.3,height*0.82,width*0.7,height*0.1,width*0.025)
               let localWidth1 = width*0.7*(DiskDetail.pastA[0] - (DiskDetail.pastA[0] - DiskDetail.valueA[0])*DiskDetail.timeCount);
               let localWidth2 = width*0.7*(DiskDetail.pastA[1] - (DiskDetail.pastA[1] - DiskDetail.valueA[1])*DiskDetail.timeCount);
               let usbWidth1 = width*0.7*(DiskDetail.pastA[2] - (DiskDetail.pastA[2] - DiskDetail.valueA[2])*DiskDetail.timeCount);
               let usbWidth2 = width*0.7*(DiskDetail.pastA[3] - (DiskDetail.pastA[3] - DiskDetail.valueA[3])*DiskDetail.timeCount);
               let webWidth1 = width*0.7*(DiskDetail.pastA[4] - (DiskDetail.pastA[4] - DiskDetail.valueA[4])*DiskDetail.timeCount);
               let webWidth2 = width*0.7*(DiskDetail.pastA[5] - (DiskDetail.pastA[5] - DiskDetail.valueA[5])*DiskDetail.timeCount);
               p.textAlign('left')
               p.textSize(width*0.08)
               p.stroke(DiskDetail.colorA[0])
               p.fill(DiskDetail.colorA[0])
               p.text('LOCAL',0,height*0.1)
               p.rect(width*0.3,height*0.1,localWidth1,height*0.1,width*0.025)
               p.rect(width*0.3,height*0.22,localWidth2,height*0.1,width*0.025)
               p.textSize(width*0.05)
               p.textAlign('right')
               p.text('main',width*0.25,height*0.17)
               p.text('sub',width*0.25,height*0.29)
               p.stroke(DiskDetail.colorA[4])
               p.fill(DiskDetail.colorA[4])
               p.textSize(width*0.08)
               p.textAlign('left')
               p.text('USB',0,height*0.4)
               p.textSize(width*0.05)
               p.textAlign('right')
               p.text('main',width*0.25,height*0.47)
               p.text('sub',width*0.25,height*0.59)
               p.rect(width*0.3,height*0.4,usbWidth1,height*0.1,width*0.025)
               p.rect(width*0.3,height*0.52,usbWidth2,height*0.1,width*0.025)
               p.stroke(DiskDetail.colorA[5])
               p.fill(DiskDetail.colorA[5])
               p.textSize(width*0.08)
               p.textAlign('left')
               p.text('WEB',0,height*0.7)
               p.textSize(width*0.05)
               p.textAlign('right')
               p.text('main',width*0.25,height*0.77)
               p.text('sub',width*0.25,height*0.89)
               p.rect(width*0.3,height*0.7,webWidth1,height*0.1,width*0.025)
               p.rect(width*0.3,height*0.82,webWidth2,height*0.1,width*0.025)
               p.fill('#444444')
               p.noStroke()
               p.textAlign('left')
               p.text(String(Math.round(DiskDetail.valueA[0]*100))+"%",width*0.35,height*0.15)
               p.text(String(Math.round(DiskDetail.valueA[1]*100))+"%",width*0.35,height*0.27)
               p.text(String(Math.round(DiskDetail.valueA[2]*100))+"%",width*0.35,height*0.45)
               p.text(String(Math.round(DiskDetail.valueA[3]*100))+"%",width*0.35,height*0.57)
               p.text(String(Math.round(DiskDetail.valueA[4]*100))+"%",width*0.35,height*0.75)
               p.text(String(Math.round(DiskDetail.valueA[5]*100))+"%",width*0.35,height*0.87)
               p.textAlign('right')
               p.noStroke()
               p.fill('#444444')
               p.text(String(Math.round(DiskDetail.drawA[1]))+"GB/" + String(DiskDetail.drawA[0])+"GB", width*0.95,height*0.15)
               p.text(String(Math.round(DiskDetail.drawA[3]))+"GB/" + String(DiskDetail.drawA[2])+"GB", width*0.95,height*0.27)
               p.text(String(Math.round(DiskDetail.drawA[5]))+"GB/" + String(DiskDetail.drawA[4])+"GB", width*0.95,height*0.45)
               p.text(String(Math.round(DiskDetail.drawA[7]))+"GB/" + String(DiskDetail.drawA[6])+"GB", width*0.95,height*0.57)
               p.text(String(Math.round(DiskDetail.drawA[9]))+"GB/" + String(DiskDetail.drawA[8])+"GB", width*0.95,height*0.75)
               p.text(String(Math.round(DiskDetail.drawA[11]))+"GB/" + String(DiskDetail.drawA[10])+"GB", width*0.95,height*0.87)
               DiskDetail.timeCount += 0.025;
         }
         if( DiskDetail.timeCount > 1){
               DiskDetail.timeCount = 0;
               DiskDetail.pastA = DiskDetail.valueA;
               DiskDetail.valueA = [];
         }
      }
      p.windowResized = () => {
         p.resizeCanvas(...DiskDetail.getSize())
      }
   }
   new p5(DiskDetailGraph, 'popdisk')
}
// disk 더보기 닫기 버튼
document.getElementById("popexitdisk").onclick=()=>{
   document.getElementById('poprapdisk').style.display = 'none'
}

