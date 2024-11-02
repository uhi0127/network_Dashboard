    //Chart Data abstract_Class
   class a_DataBoard {
      constructor(name, parent){
         this.name = name;
         this.nowData = {};
         this.drawArr = [];
         this.pastArr = [];
         this.total = 0;
         this.Max = 0;
         this.Min = 0;
         this.parent = document.getElementById(parent);
         this.timeCount = 0;
      }
      
      postPast(){
         const nowDate = new Date();
         let timeId = String(nowDate.getFullYear()) + String(nowDate.getMonth()) + String(nowDate.getDate()) + String(nowDate.getHours()) + String(nowDate.getMinute()-1);
         let tempValue = 0
         this.pastArr.forEach((v,i,a) => {
            tempValue += v/(a.length);
         })
         const xhr = new XMLHttpRequest();
         xhr.open('POST', 'http://kkms4001.iptime.org:33152/TODAY')
         xhr.setRequestHeader('Content-type', 'application/data');
         xhr.send(JSON.stringify({"id":timeId, "RAM":{"TOTAL":DataBoard.nowData.TOTAL, "USED": tempValue}}))
         xhr.onreadystatechange = function() {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 201 ){
            } else {
            };
         };
      };
   }

   // RAM Data 파생클래스
   class RAMBoard extends a_DataBoard {
      constructor(name, parent){
         super(name, parent)
         this.pastDgr = 0;
         this.Used = 0;
      }
      
      //DATA
      getData(){
         const xhr = new XMLHttpRequest();
         xhr.open('GET', 'http://kkms4001.iptime.org:33152/NOW/NOW')
         xhr.send();
         xhr.onreadystatechange = function(e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200){
            RAMChart.nowData = JSON.parse(this.responseText).RAM
            RAMChart.total = RAMChart.nowData.TOTAL;
            RAMChart.Max = RAMChart.nowData.USEDMAX;
            RAMChart.Min = RAMChart.nowData.USEDMIN;
            RAMChart.drawArr[0] = Math.floor(Math.random()*((RAMChart.Max)-RAMChart.Min)/2+RAMChart.Min)
            RAMChart.Used = (RAMChart.drawArr[0])/(RAMChart.total) 
            RAMChart.nowDgr = Math.round(RAMChart.Used*360);
            }
         }
      }
      
   }

   // RAM Data 파생클래스
   class CPUBoard extends a_DataBoard{
      constructor(name, parent){
         super(name, parent)
         this.average = 0;
         this.average_before = 0;
         this.nowDgr = 0;
         this.pastDgr = 135;
         this.drawDgr = 0;
         this.each = {}
         this.drawArr_each = []
         this.pastArr_each = []
      }

      //DATA
      getData(){
         const xhr = new XMLHttpRequest();
         xhr.open('GET', 'http://kkms4001.iptime.org:33152/NOW/NOW')
         xhr.send();
         xhr.onreadystatechange = function() {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200){
               CPUChart.nowData = JSON.parse(this.responseText).CPU
               CPUChart.each = CPUChart.nowData.eachCPU;
               for(let key in CPUChart.each){
                  CPUChart.drawArr_each.push(Math.floor(Math.random()*(CPUChart.each[key][0])))
               }
               CPUChart.average = ( ()=>{
                  let tempSum = 0;
                  CPUChart.drawArr_each.forEach((v,i,a) => {
                     tempSum += v/a.length
                  });
                  return tempSum;
               } )()
            }
         }
      }
   }

   // RAM Data 파생클래스
   class TfBoard extends a_DataBoard{
      constructor(name,parent){
         super(name, parent)
         this.dataArr = [];
         this.drawArr_in = [];
         this.drawArr_out = [];
         this.pastArr_in = [];
         this.pastArr_out =[];
      }

      getData() {
         const xhr = new XMLHttpRequest();
         xhr.open('GET', 'http://kkms4001.iptime.org:33152/NOW/NOW')
         xhr.send()
         xhr.onreadystatechange = function(){
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200){
               TfChart.nowData = JSON.parse(xhr.responseText).NETWORK.TRAFFIC
               for(let key in TfChart.nowData){
                  TfChart.dataArr.push(TfChart.nowData[key])
               }
               TfChart.drawArr_in.push([0,Math.floor(Math.random()*(TfChart.dataArr[0]))])
               TfChart.drawArr_out.push([0,Math.floor(Math.random()*(TfChart.dataArr[2]))])
               TfChart.dataArr = []
            }
         }
      }

      xMove(){
         TfChart.drawArr_in.forEach((v,i,a)=>{
            v[0] += Math.round(TfChart.parent.offsetWidth/100)
         });
         TfChart.drawArr_out.forEach((v,i,a)=>{
            v[0] += Math.round(TfChart.parent.offsetWidth/100)
         })
      }
   }

   const RAMChart = new RAMBoard('RAMChart','memoryGraph')
   const RAMgraph = p => {
      p.setup = function() {
         p.createCanvas(RAMChart.parent.offsetWidth,RAMChart.parent.offsetHeight);
         p.angleMode(p.DEGREES)
         p.frameRate(25)
         RAMChart.getData()
         RAMChart.Used = (RAMChart.drawArr[0])/(RAMChart.total) 
         RAMChart.nowDgr = Math.round(RAMChart.Used*360);
      };

      p.draw = function() {
         p.clear();
         if(RAMChart.timeCount == 0){
            RAMChart.getData();
         }
         
         outerRadius = RAMChart.parent.offsetWidth*0.6;
         innerRadius = RAMChart.parent.offsetWidth*0.3;
         xCenter = RAMChart.parent.offsetWidth/2;
         yCenter = RAMChart.parent.offsetHeight/2;
         xText = RAMChart.parent.offsetWidth*0.41;
         yText = RAMChart.parent.offsetHeight*0.52;
         fontSize = Math.round(RAMChart.parent.offsetWidth/10);
         p.noStroke()
         p.fill('lime')
         p.arc( xCenter, yCenter, outerRadius, outerRadius, 0, 360)
         p.fill('red')
         p.arc( xCenter, yCenter, outerRadius, outerRadius, -90, RAMChart.pastDgr + (RAMChart.nowDgr-RAMChart.pastDgr)*(RAMChart.timeCount/25)-90 )
         p.fill('white')
         p.arc( xCenter, yCenter, innerRadius, innerRadius, 0, 360)   
         p.fill('black')
         p.stroke('black')
         p.textSize(fontSize)
         p.text(String(Math.round(RAMChart.Used*100))+"%", xText, yText)
         RAMChart.timeCount += 1
         if(RAMChart.timeCount >= 25){ 
            RAMChart.timeCount = 0
            RAMChart.pastDgr = RAMChart.nowDgr;
            RAMChart.pastArr.push(RAMChart.drawArr.shift())
         }
      };
      
      p.windowResized = function(){
         p.resizeCanvas(RAMChart.parent.offsetWidth, RAMChart.parent.offsetHeight)
      }
   };

   const CPUChart = new CPUBoard("CPUChart", "cpuGraph")
   const CPUgraph = p => {
      p.setup = function() {
         p.createCanvas(CPUChart.parent.offsetWidth,CPUChart.parent.offsetHeight);
         p.frameRate(25)
         p.angleMode(p.DEGREES)
      };

      p.draw = function() {
         if(CPUChart.timeCount == 0){
            CPUChart.getData()
         }
         let canvasW = CPUChart.parent.offsetWidth;
         let canvasH = CPUChart.parent.offsetHeight;
         CPUChart.nowDgr = 135 + 270*CPUChart.average/101;
         CPUChart.drawDgr = Math.round(CPUChart.pastDgr - (CPUChart.pastDgr - CPUChart.nowDgr)*(CPUChart.timeCount))
         p.noStroke();
         //p.fill('white')
         //p.arc(canvasW/2, canvasH*5/8, canvasW, canvasW, 0, 360)
         p.fill('#B2FFEC')
         p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
         p.fill('#B2FFC0')
         p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, 224)
         p.fill('#CDFFB2')
         p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 226, 269)
         p.fill('#ECFFB2')
         p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 271, 314)
         p.fill('#FFD2B2')
         p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 316, 359)
         p.fill('#FFB2B2')
         p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 361, 404)

         function realtimeArc( degree ){
            if(degree < 179 ){
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, degree)
            } else if(degree < 182){
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
            } else if(degree<=224 ){
               p.fill('#00FFB7')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, degree)
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
            } else if(degree < 227){
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
               p.fill('#00FFB7')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, 224)
            } else if(degree<= 269){
               p.fill('#0CFF08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 226, degree)
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
               p.fill('#00FFB7')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, 224)
            } else if(degree < 272){
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
               p.fill('#00FFB7')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, 224)
               p.fill('#0CFF08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 226, 269)
            } else if(degree<= 314){
               p.fill('#FFE100')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 271, degree)
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
               p.fill('#00FFB7')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, 224)
               p.fill('#0CFF08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 226, 269)
            } else if(degree < 317 ){
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
               p.fill('#00FFB7')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, 224)
               p.fill('#0CFF08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 226, 269)
               p.fill('#FFE100')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 271, 314)
            } else if(degree<= 359){
               p.fill('#FF5E08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 316, degree)
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
               p.fill('#00FFB7')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, 224)
               p.fill('#0CFF08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 226, 269)
               p.fill('#FFE100')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 271, 314)
            } else if(degree < 362){
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
               p.fill('#00FFB7')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, 224)
               p.fill('#0CFF08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 226, 269)
               p.fill('#FFE100')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 271, 314)
               p.fill('#FF5E08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 316, 359)
            } else { 
               p.fill('#FF3908')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 361, degree)
               p.fill('#0000ff')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 135, 179)
               p.fill('#00FFB7')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 181, 224)
               p.fill('#0CFF08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 226, 269)
               p.fill('#FFE100')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 271, 314)
               p.fill('#FF5E08')
               p.arc(canvasW/2, canvasH*5/8, canvasW*3/4, canvasW*3/4, 316, 359)
            }
         }
         realtimeArc(CPUChart.drawDgr)
         CPUChart.timeCount += 0.01;
         p.fill('white')
         p.arc(canvasW/2, canvasH*5/8, canvasW/2, canvasW/2, 0, 360)
         p.fill('black')
         p.textSize(canvasW/6)
         p.textStyle('bold')
         p.text(String(Math.round((CPUChart.drawDgr-135)/270*100))+"%", canvasW*0.34, canvasH*0.65)
         if(CPUChart.timeCount > 1){
            CPUChart.timeCount = 0;
            CPUChart.pastArr.push(CPUChart.average)
            CPUChart.pastArr_each.push(CPUChart.drawArr_each)
            CPUChart.drawArr_each =[];
            CPUChart.pastDgr = CPUChart.nowDgr
         }
      };
      p.windowResized = function(){
      p.resizeCanvas(CPUChart.parent.offsetWidth, CPUChart.parent.offsetHeight)
      }
   };

   const TfChart = new TfBoard('TfChart', 'trafficGraph');
   const Trafficgraph = p => {
      p.setup = function() {
         p.createCanvas(TfChart.parent.offsetWidth,TfChart.parent.offsetHeight);
         let canvasW = TfChart.parent.offsetWidth;
         let canvasH = TfChart.parent.offsetHeight;
         p.angleMode(p.DEGREES)
         p.fill('white')
         p.stroke('black')
         p.rect(0,0,canvasW,canvasH)
         p.line(canvasW*0.01,canvasH/0.4*0.05,canvasW*0.8,canvasH/0.4*0.05)
         p.line(canvasW*0.01,canvasH/0.4*0.1,canvasW*0.8,canvasH/0.4*0.1)
         p.line(canvasW*0.01,canvasH/0.4*0.15,canvasW*0.8,canvasH/0.4*0.15)
         p.line(canvasW*0.01,canvasH/0.4*0.2,canvasW*0.8,canvasH/0.4*0.2)
         p.line(canvasW*0.01,canvasH/0.4*0.25,canvasW*0.8,canvasH/0.4*0.25)
         p.line(canvasW*0.01,canvasH/0.4*0.3,canvasW*0.8,canvasH/0.4*0.3)
         p.line(canvasW*0.01,canvasH*0.875,canvasW*0.8,canvasH*0.875)
      }
      p.draw = function() {
         let canvasW = TfChart.parent.offsetWidth;
         let canvasH = TfChart.parent.offsetHeight;
         if(TfChart.drawArr_in.length < 100){
               p.frameRate(100)
               TfChart.getData()
               TfChart.xMove()
         } else{ 
         p.frameRate(15)
         TfChart.getData()
         TfChart.xMove()
         p.fill('white')
         p.stroke('black')
         p.rect(0,0,canvasW,canvasH)
         p.line(canvasW*0.01,canvasH*0.125,canvasW*0.8,canvasH*0.125)
         p.line(canvasW*0.01,canvasH*0.25,canvasW*0.8,canvasH*0.25)
         p.line(canvasW*0.01,canvasH*0.375,canvasW*0.8,canvasH*0.375)
         p.line(canvasW*0.01,canvasH*0.5,canvasW*0.8,canvasH*0.5)
         p.line(canvasW*0.01,canvasH*0.625,canvasW*0.8,canvasH*0.625)
         p.line(canvasW*0.01,canvasH*0.75,canvasW*0.8,canvasH*0.75)
         p.line(canvasW*0.01,canvasH*0.875,canvasW*0.8,canvasH*0.875)
         for(let k=3; k<100; k++){
         p.stroke('red')

         p.curve(
            canvasW*0.9 - TfChart.drawArr_in[k-3][0], canvasH*0.875 - TfChart.drawArr_in[k-3][1],  
            canvasW*0.9 - TfChart.drawArr_in[k-2][0], canvasH*0.875 - TfChart.drawArr_in[k-2][1],  
            canvasW*0.9 - TfChart.drawArr_in[k-1][0], canvasH*0.875 - TfChart.drawArr_in[k-1][1],  
            canvasW*0.9 - TfChart.drawArr_in[k][0], canvasH*0.875 - TfChart.drawArr_in[k][1]
         )
         p.stroke('blue')
         p.curve(
            canvasW*0.9 - TfChart.drawArr_out[k-3][0], canvasH*0.875 - TfChart.drawArr_out[k-3][1],  
            canvasW*0.9 - TfChart.drawArr_out[k-2][0], canvasH*0.875 - TfChart.drawArr_out[k-2][1],  
            canvasW*0.9 - TfChart.drawArr_out[k-1][0], canvasH*0.875 - TfChart.drawArr_out[k-1][1],  
            canvasW*0.9 - TfChart.drawArr_out[k][0], canvasH*0.875 - TfChart.drawArr_out[k][1]
         )
         }
         TfChart.pastArr_in.push(TfChart.drawArr_in.shift())
         TfChart.pastArr_out.push(TfChart.drawArr_out.shift())
      }
      TfChart.timeCount += 1;
      p.noStroke()
      p.rect(0,0,canvasW*0.01,canvasH)
      p.rect(canvasW*0.8,0,canvasW*0.8,canvasH)
      }
   }
   
   new p5(RAMgraph, 'memoryGraph'); // invoke p5
   new p5(CPUgraph, 'cpuGraph')
   new p5(Trafficgraph, 'trafficGraph')