class a_WeekBoard{
   constructor(name, parent){
      this.name = name;
      this.nowTime = '2024_1';
      this.now = {};
      this.CPU = {};
      this.RAM = {};
      this.SPEED = {};
      this.DISK = {};
      this.TRAFFIC ={};
      this.pastA = [];
      this.parent = document.getElementById(parent);
      this.timeCount = 0;
      this.realTime = 0;
      this.dataGet = false;
      this.colorA = ['#FF86B6','#E586FF', '#A686FF', '#869EFF', '#86D1FF','#86FF86',  '#FFB486', '#FF8686'];
      this._colorA = ['#FFCCE0', '#F6D5FF', '#D6C7FF', '#CBD5FF', '#D6F0FF','#DAFFDA',  '#FFDDC7', '#FFCDCD'];
      this.dayA = ['MON', 'TUE', 'WED','THU','FRI', 'SAT', 'SUN'];// chart 출력시 이용할 day array
   };
   getSize(){
      let tempArr = [];
      tempArr.push(this.parent.offsetWidth);
      tempArr.push(this.parent.offsetHeight);
      return tempArr;
   }
   getData(Week){
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `http://kkms4001.iptime.org:33153/WEEK/${Week}`);
      xhr.send();
      xhr.onreadystatechange = (e) => {
         if(xhr.readyState !== XMLHttpRequest.DONE) return;
         if(xhr.status == 200){
               this.now = JSON.parse(xhr.responseText);
               this.CPU = this.now.CPU;
               this.RAM = this.now.RAM;
               this.TRAFFIC = this.now.NETWORK.TRAFFIC;
               this.SPEED = this.now.NETWORK.SPEED;
               this.DISK = this.now.DISK;
               this.dataGet = true;
         };
      };
   };
};



