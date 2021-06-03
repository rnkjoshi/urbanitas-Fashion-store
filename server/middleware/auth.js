const { User } = require('./../models/users');

let auth = (req,res,next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    //console.log(localStorage.getItem('w_auth'));
    let token = localStorage.getItem('w_auth');
    //let token = req.cookies.w_auth;
    // console.log("Token = "+token)

    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        });
        
        req.token = token;
        req.user = user;
        next();
    })

}


module.exports = { auth }