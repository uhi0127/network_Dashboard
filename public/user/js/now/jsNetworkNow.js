// Network data 파생클래스 선언
class NetworkBoard extends a_DataBoard{
    constructor(name, parent){
        super(name,parent);
        this.nowDA = [];
        this.pastTotal = 1;
        this.pastUp =0;
        this.pastDown = 0;
        this.nowDown = 0;
        this.nowUp = 0;
        this.nowTotal = 1;
    }
    //Network data parsing method
    parseData(data){
        this.nowTotal = data.TOTAL;
        this.nowUp = data.UPLOAD;
        this.nowDown = data.DOWNLOAD;
    }
}
const NetworkChart = new NetworkBoard('networkNow', 'networkNow');
const NetworkGraph = p =>{
    p.setup = () =>{
        p.createCanvas(...NetworkChart.getSize());
        p.angleMode(p.DEGREES);
        p.background('#999999');
        p.frameRate(40);
    }
    p.draw = () => {
        p.clear();
            if(RAMChart.dataGet === true){
		    let [ width, height ] = NetworkChart.getSize();
		    p.noStroke();
		    p.fill('white');
		    p.rect(0,0,width,height);
		    NetworkChart.parseData(RAMChart.now.NETWORK.SPEED);
		    let outerRadius = width*0.9;
		    let innerRadius = width*0.6;
		    let xCenter = width/2;
		    let yCenter = height / 2;
		    p.fill(NetworkChart.colorA[0]);
		    p.circle(xCenter, yCenter, innerRadius);
		    p.fill('#000000');
		    p.circle(xCenter, yCenter, innerRadius / 2);
		    p.fill(NetworkChart.colorA[3]);
		    p.stroke('#dddddd');
		    p.arc(xCenter, yCenter, outerRadius,outerRadius, 0, 360);
		    p.fill('white');
		    p.circle(xCenter, yCenter, outerRadius -30);
		    for(let i=0; i <  NetworkChart.colorA.length; i++){
		        p.noStroke();
		        p.fill(NetworkChart.colorA[i]);
		        p.arc(xCenter, yCenter, outerRadius*0.5, outerRadius*0.5, 150 + 30*i, 150 + 30*(i+1));
		    }
		    p.fill("black");
		    p.circle(xCenter, yCenter, width*0.05);
		    p.stroke('black');
		    p.strokeWeight(3);
		    let speedRate = NetworkChart.nowDown / NetworkChart.nowTotal;
		    let nowDegree = (150+240*speedRate);
		    let pastDegree = (150+240*(NetworkChart.pastDown/NetworkChart.pastTotal));
		    let xCord = xCenter + width * 0.3 * Math.cos((pastDegree - (pastDegree - nowDegree) * NetworkChart.timeCount)*Math.PI/180);
		    let yCord = yCenter + width * 0.3 * Math.sin((pastDegree - (pastDegree - nowDegree)*NetworkChart.timeCount)*Math.PI/180);
		    
		    p.line( xCord, yCord, xCenter, yCenter);
		    NetworkChart.timeCount += 0.025;
		    p.strokeWeight(1);
		    p.textAlign('center');
		    p.textSize(width/15);
   		    p.text('Upload: ' + String(Math.round(NetworkChart.pastUp - ( NetworkChart.pastUp - NetworkChart.nowUp)*NetworkChart.timeCount)) + 'MB', width/2, height*0.68);
   		    p.text('Download: ' + String(Math.round(NetworkChart.pastDown - ( NetworkChart.pastDown - NetworkChart.nowDown)*NetworkChart.timeCount))+ 'MB', width/2, height*0.77);
	    }
	    if(NetworkChart.timeCount > 1){
	        NetworkChart.timeCount = 0;
	        NetworkChart.pastTotal = NetworkChart.nowTotal;
	        NetworkChart.pastDown = NetworkChart.nowDown;
	        NetworkChart.pastUp = NetworkChart.nowUp;
	    }
       	    

    }
    p.windowResized = () => {
        p.resizeCanvas(...NetworkChart.getSize());
    }
}
new p5(NetworkGraph, 'networkNow');
