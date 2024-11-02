// disk data 파생클래스 선언
class DISKBoard extends a_DataBoard {
    constructor( name, parent ){
        super(name, parent);
        this.pastA = [0,0,0];
        this.valueA = [];
    };
    // disk data parsing method
    parseData(data){
        let disk = data.DISK;
        let localValue = Math.round(((disk.LOCAL.LOCALMAIN.USED + disk.LOCAL.LOCALSUB.USED)/(disk.LOCAL.LOCALMAIN.TOTAL + disk.LOCAL.LOCALSUB.TOTAL))*100)/100;
        let localUsed = disk.LOCAL.LOCALMAIN.USED + disk.LOCAL.LOCALSUB.USED;
        let localTotal = disk.LOCAL.LOCALMAIN.TOTAL + disk.LOCAL.LOCALSUB.TOTAL;
        let usbValue = Math.round(((disk.USB.USBMAIN.USED + disk.USB.USBSUB.USED)/(disk.USB.USBMAIN.TOTAL + disk.USB.USBSUB.TOTAL))*100)/100;
        let usbUsed = disk.USB.USBMAIN.USED + disk.USB.USBSUB.USED;
        let usbTotal = disk.USB.USBMAIN.TOTAL + disk.USB.USBSUB.TOTAL;
        let webValue = Math.round(((disk.WEB.WEBMAIN.USED + disk.WEB.WEBSUB.USED)/(disk.WEB.WEBMAIN.TOTAL + disk.WEB.WEBSUB.TOTAL))*100)/100;
        let webUsed = disk.WEB.WEBMAIN.USED + disk.WEB.WEBSUB.USED;
        let webTotal = disk.WEB.WEBMAIN.TOTAL + disk.WEB.WEBSUB.TOTAL;
        this.drawA = [localValue,usbValue,webValue];
        this.valueA =[localUsed, localTotal, usbUsed, usbTotal, webUsed, webTotal];
    };
    parseDetail(data){
        let disk = data.DISK;
        this.drawA= [
            disk.LOCAL.LOCALMAIN.TOTAL, 
            disk.LOCAL.LOCALMAIN.USED, 
            disk.LOCAL.LOCALSUB.TOTAL, 
            disk.LOCAL.LOCALSUB.USED, 
            disk.USB.USBMAIN.TOTAL, 
            disk.USB.USBMAIN.USED, 
            disk.USB.USBSUB.TOTAL,
            disk.USB.USBSUB.USED,
            disk.WEB.WEBMAIN.TOTAL,
            disk.WEB.WEBMAIN.USED,
            disk.WEB.WEBSUB.TOTAL,
            disk.WEB.WEBSUB.USED
        ];
        this.valueA = [this.drawA[1]/this.drawA[0], this.drawA[3]/this.drawA[2], this.drawA[5]/this.drawA[4], this.drawA[7]/this.drawA[6], this.drawA[9]/this.drawA[8], this.drawA[11]/this.drawA[10]];
        this.valueA.forEach( v => {
            v = Math.round(v*100)/100;
        });
    };
};

//disk data instance 생성
const DiskChart = new DISKBoard('diskNow', "diskNow");
const DISKGraph = p => {
    p.setup = () =>{
        p.createCanvas(...DiskChart.getSize());
        p.angleMode(p.DEGREES);
        p.background('#999999');
        p.frameRate(40);
    };
    p.draw = () => {
        p.clear();
        if( RAMChart.dataGet === true){
            DiskChart.parseData(RAMChart.now);
            let [ width, height ] = DiskChart.getSize();
            p.noStroke();
            p.fill('white');
            p.rect(0,0,width,height);
            p.stroke(DiskChart.colorA[0]);
            p.fill(DiskChart._colorA[0]);
            p.rect(width*0.05,height*0.1,width*0.9,height*0.15,width*0.05);
            p.stroke(DiskChart.colorA[4]);
            p.fill(DiskChart._colorA[4]);
            p.rect(width*0.05,height*0.4,width*0.9,height*0.15,width*0.05);
            p.stroke(DiskChart.colorA[5]);
            p.fill(DiskChart._colorA[5]);
            p.rect(width*0.05,height*0.7,width*0.9,height*0.15,width*0.05);
            let localWidth = width*0.9*(DiskChart.pastA[0] - (DiskChart.pastA[0] - DiskChart.drawA[0])*DiskChart.timeCount);
            let usbWidth = width*0.9*(DiskChart.pastA[1] - (DiskChart.pastA[1] - DiskChart.drawA[1])*DiskChart.timeCount);
            let webWidth = width*0.9*(DiskChart.pastA[2] - (DiskChart.pastA[2] - DiskChart.drawA[2])*DiskChart.timeCount);
            p.stroke(DiskChart.colorA[0]);
            p.fill(DiskChart.colorA[0]);
            p.rect(width*0.05,height*0.1,localWidth,height*0.15,width*0.05);
            p.stroke(DiskChart.colorA[4]);
            p.fill(DiskChart.colorA[4]);
            p.rect(width*0.05,height*0.4,usbWidth,height*0.15,width*0.05);
            p.stroke(DiskChart.colorA[5]);
            p.fill(DiskChart.colorA[5]);
            p.rect(width*0.05,height*0.7,webWidth,height*0.15,width*0.05);
            p.textSize(width*0.07);
            p.textStyle('bold');
            p.stroke(DiskChart._colorA[0]);
            p.fill(DiskChart.colorA[0]);
            p.text("Local", width*0.05, height*0.085);
            p.stroke(DiskChart._colorA[4]);
            p.fill(DiskChart.colorA[4]);
            p.text("USB", width*0.05, height*0.385);
            p.stroke(DiskChart._colorA[5]);
            p.fill(DiskChart.colorA[5]);
            p.text("WEB", width*0.05, height*0.685);
            p.stroke('#eeeeee');
            p.textStyle('normal');
            p.fill('white');
            p.text(String(Math.round((DiskChart.pastA[0] - (DiskChart.pastA[0] - DiskChart.drawA[0])*DiskChart.timeCount)*100))+"%", width*0.1, height*0.2);
            p.text(String(Math.round((DiskChart.pastA[1] - (DiskChart.pastA[1] - DiskChart.drawA[1])*DiskChart.timeCount)*100))+"%", width*0.1, height*0.5);
            p.text(String(Math.round((DiskChart.pastA[2] - (DiskChart.pastA[2] - DiskChart.drawA[2])*DiskChart.timeCount)*100))+"%", width*0.1, height*0.8);
            p.textSize(width*0.05);
            p.fill('#444444');
            p.textAlign('right');
            p.text(String(DiskChart.valueA[1])+"GB(Total)", width*0.9, height*0.16);
            p.text(String(DiskChart.valueA[0])+"GB(Used)", width*0.9, height*0.22);
            p.text(String(DiskChart.valueA[3])+"GB(Total)", width*0.9, height*0.46);
            p.text(String(DiskChart.valueA[2])+"GB(Used)", width*0.9, height*0.52);
            p.text(String(DiskChart.valueA[5])+"GB(Total)", width*0.9, height*0.76);
            p.text(String(DiskChart.valueA[4])+"GB(Used)", width*0.9, height*0.82);
            p.textAlign('left');
            DiskChart.timeCount += 0.025;
        }
        if( DiskChart.timeCount > 1){
            DiskChart.timeCount = 0;
            DiskChart.pastA = DiskChart.drawA;
            DiskChart.drawA = [];
        }
    }
    p.windowResized = () => {
        p.resizeCanvas(...DiskChart.getSize());
    }
}
new p5(DISKGraph, 'diskNow');
