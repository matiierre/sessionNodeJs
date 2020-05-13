const express = require('express');
const app = express();
const path = require('path');
const mysql = require ('mysql');
const session = require ('express-session');
const MySQLStore = require ('express-mysql-session')(session);
const Router = require ('./router');


app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//conexion database
const db = mysql.createConnection({
    host: '92.249.44.52',
    user: 'u830364575_portfolio_user',
    password: 'matias96',
    database: 'u830364575_portfolio',
    
});
db.connect(function(err){
    if(err){
        console.log('DB ERROR');
        return false;
    }else{
        console.log('CONEXION EXITOSA')
    }
})
 
const sessionStore = new MySQLStore({
    expiration:(1825*86400*1000),
    endConnectionOnClose : false
}, db);

app.use(session({
    key: 'asdasdasd123123123123',
    secret: 'adksamajdmjaaw3klmadas',
    store: sessionStore,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: (1825*86400*1000),
        httpOnly: false
    }
})); 

new Router(app,db);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);