//DATA 관리 추상클래스
class a_DataBoard{
    constructor(name, parent){
        this.name = name; 
        this.now = {}; // getData 메소드를 통한 최신 데이터값
        this.total = 0;
        this.nowV = 0;
        this.drawA = [];
        this.pastV = 0;
        this.pastA = [];
        this.parent = document.getElementById(parent)
        this.btnArray = [];
        this.timeCount = 0;
        this.realTime = 0;
        this.dataGet = false;
        this.colorA = ['#FF86B6','#E586FF', '#A686FF', '#869EFF', '#86D1FF','#86FF86',  '#FFB486', '#FF8686'] // 진한색
        this._colorA = ['#FFCCE0', '#F6D5FF', '#D6C7FF', '#CBD5FF', '#D6F0FF','#DAFFDA',  '#FFDDC7', '#FFCDCD'] // 연한색
    }
    // parent Element의 사이즈값 리턴
    getSize(){
        let tempArr = [];
        tempArr.push(this.parent.offsetWidth);
        tempArr.push(this.parent.offsetHeight);
        return tempArr;
    }
    // Data 수신 method
    getData(){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://kkms4001.iptime.org:33153/NOW/NOW")
        xhr.send()
        xhr.onreadystatechange = (e) => {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status == 200){
                this.now = JSON.parse(xhr.responseText);
                this.dataGet = true // Data수신여부 check 
            }
        }
    }
    /*
    postData(Obj){
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "kkms4001.iptime.org:33153/TODAY");
        xhr.setRequestHeader( 'Content-type', 'application/data');
        xhr.send(JSON.stringify(Obj)) 
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
        if(xhr.status === 201){
            console.log('success to send');
            console.log(Obj)
        } else {
            console.log('fail to send');
        }
    }*/
}

