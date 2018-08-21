var express = require('express');
var router = express.Router();
var loginModule = require('../modules/login');
var bcrypt = require('bcrypt');

//GET login page
router.get('/login', function(req, res, next) {
    res.render('login', {messageErreur:''});
    req.session.authenticated = false;
});

// Login check
router.post('/login', function(req, res, next){
    let userName = req.body.loginUsername;

    /* find the login with the username entered and if the login and password are true, the id_role is check and the user is redirect to the correct view.*/
    loginModule.findLoginWithUsername(userName).then((user) =>{
        if(user !== null){
            bcrypt.compare(req.body.loginPassword, user.password_hash).then((correct) => {
                if(correct === true){
                    req.session.authenticated = true;
                    req.session.user = user;
                    if(user.id_role === 1){
                        res.redirect('/grp17/superadmin/superadmin_reservations');
                    }
                    else if(user.id_role === 2){
                        res.redirect('/grp17/zoneadmin/zoneadmin_reservations');
                    }
                    else if(user.id_role === 3){
                        res.redirect('/grp17/chauffeur');
                    }
                }
                else{
                    res.render('login', {messageErreur:"Le mot de passe est erroné"});
                }
            })
        }
        else{
            res.render('login', {messageErreur:"L'utilisateur n'existe pas "});
        }
    })
});

/* Logout handler */
router.get('/login/logout', function(req, res, next) {
    req.session.destroy((err) =>{
        res.redirect('/grp17/login');
    });
});

module.exports = router;