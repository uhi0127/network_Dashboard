// Event Data 파생클래스 선언
class EventBoard extends a_DataBoard{
   constructor( name, parent){
       super(name, parent);
       this.attack = 0;
       this.safe = 0;
       this.update = 0;
       this.network = 0;
       this.innerText =''; //event area 텍스트 박스에 들어갈 text
   }
   //event data parsing method
   parseData(data){
       this.attack = data.ATTACK;
       this.safe = data.SAFEWALL;
       this.update = data.OSUPDATE;
       this.network = data.NETWORKONOFF;
   }
}
// event instance
const EventChart = new EventBoard( 'EventChart', 'textBox');
const EventGraph = p => {
   p.setup = () => {
       p.createCanvas(...EventChart.getSize());
       p.frameRate(1);
   }
   p.draw = () => {
       let now = new Date();// timestamp 출력을 위한 Date객체 선언
       let nowtime = String(now.getMonth()+1) +"/" +String(now.getDate()) + " " + String(now.getHours()) + ":" +String(now.getMinutes()) + ":" + String(now.getSeconds());

       if(RAMChart.dataGet === true){
 	if(EventChart.timeCount ===0 ) {     
           EventChart.parseData(RAMChart.now.EVENT);
         
           if( EventChart.attack === 1){
               EventChart.innerText += `<div style="position: relative; left: 3vw; width:90%; color: ${EventChart.colorA[0]};height:20%; font-size:2vh; font-weight:'bold';margin-top:5%; display:inline-block; ">공격이 감지 되었습니다.<br>${nowtime}</div>`;
           }
           if( EventChart.safe === 1){
               EventChart.innerText += `<div style="position: relative; left: 3vw; width:90%; height:20%; color: ${EventChart.colorA[2]};font-size:2vh; margin-top:5%; font-weight:'bold';display:inline-block; ">방화벽이 꺼져있습니다.<br>${nowtime}</div>`;
           }

           if( EventChart.network === 1){
               EventChart.innerText += `<div style="position: relative; left: 3vw; width:90%; height:20%; color: ${EventChart.colorA[3]};font-size:2vh; margin-top:5%;font-weight:'bold'; display:inline-block; ">네트워크 연결이 필요합니다.<br>${nowtime}</div>`;
           }

           if( EventChart.update === 1){
               EventChart.innerText += `<div style="position: relative; left: 3vw; width:90%; height:20%; font-size:2vh; color: ${EventChart.colorA[7]};margin-top:5%; font-weight:'bold';display:inline-block; ">OS업데이트가 필요합니다.<br>${nowtime}</div>`;
           }
      EventChart.innerText = EventChart.innerText;
      document.getElementById('textBox').innerHTML = EventChart.innerText;
           document.getElementById('textBox').scrollTo({left:0, top:2000});
           }
           }
           EventChart.timeCount += 1;
           // timeCount 초기화
           if(EventChart.timeCount > 30 ) {
              EventChart.timeCount = 0;
              EventChart.innerText = '';
      }
       
   }
   p.windowResized = () => {
       p.resizeCanvas(...NetworkChart.getSize());
   }
}
new p5(EventGraph, 'textBox');

