const express = require('express');
const app = express();
const port = 33131;

// indent 정리해서 compile
app.locals.pretty = true;

// static 파일 관리 폴더 지정
app.use(express.static('public'));

// pug 파일 사용
app.set('view engine','pug');

// view 파일 폴더 지정
app.set('views', process.cwd() + '/views');

// 경로 별 Routing =======================
app.get('/',(req , res)=>{
   res.render('./user/now/userNow.pug');
})

app.get('/now',(req , res)=>{
   res.render('./user/now/userNow.pug');
})

app.get('/week',(req , res)=>{
   res.render('./user/week/userWeek.pug');
})

app.get('/month',(req , res)=>{
   res.render('./user/month/userMonth.pug');
})

app.get('/admin',(req , res)=>{
   res.render('./admin/admin.pug');
})
// =======================================

// 해당 포트로 접속
app.listen(port,()=>{
   console.log(`${port} port Server Live...`)
})
