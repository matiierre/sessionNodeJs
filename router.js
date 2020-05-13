const bcrypt = require('bcrypt');
const mysql = require ('mysql');



class Router {

    constructor(app,db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
    }

    login(app, db) {

        app.post('/login', (req, res) => {
            
            
            let username = req.body.username;
            let password = req.body.password;
            

            username = username.toLowerCase();
           
            if( username.lenght > 12 || password.lenght >12) {
                res.json({
                    success:false,
                    msg:' Ocurrio un error.'
                })
                return;
            }

            let cols = [username];
            
            db.query('SELECT * from users where username = ? LIMIT 1',cols,  (err,data,fields) => {
                if (err){
                    res.json({
                        success:false,
                        msg: 'Fallo la query'
                    })
                    return;
                }

                if( data   && data[0] !== undefined ){
                    
                    console.log(req.session);
                    bcrypt.compare(password, data[0].password , (bcryptErr, verified) =>{
                        
                        if (verified){

                            req.session.Id= data[0].id;
                            res.json({
                                success: true,
                                username : data[0].username
                            })
                            return ; 
                        }else{
                            res.json({
                                success: false,
                                msg: 'Invalid password'
                            })
                        }

                    });
                }else{
                    res.json({
                        success:false,
                        msg: 'User not found'
                    })
                }
            });
        });

    }

    logout(app, db) {

        app.post('/logout', (req, res) => {
            
            if(req.session.userID){
                req.session.destroy();
                res.json({
                    success:true
                })
                return true;
            }else{
                res.json({
                    success:false
                })
                return false;
            }
        })

    }
    isLoggedIn(app, db) {
        app.post('/isLoggedIn', (req, res) => {
            if(req.session.userID){
                let cols = [req.session.userID];
                db.query('SELECT * FROM  users where id = ? LIMIT 1',cols, (err,data,fields) => {

                    if (data && data[0] !== undefined ){
                        res.json({
                            success:true,
                            username: data[0].username
                        })
                        return true;
                    }else{
                        res.json({
                            success:false
                        })
                    }

                });
            }else{
                res.json({
                    sucess:false
                })
            }
        })
    }


}
module.exports = Router;