var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var log_prijava = require('./log_prijava.js');
var funkcije    = require('./funkcije.js');

function pushing(a,b){
	a.push(b);
}

var prijavaweb = {

/**
 * @api {post} /prijavaweb PrijavaWEB
 * @apiName prijavaweb
 * @apiGroup Prijava
 * @apiVersion 0.0.1
 * @apiParam {varchar{30}} korime ukoliko netko 10 puta pogriješi lozinku korisnik postaje neaktivan i potrebno je u log_sync promjeniti zadnju prijavu na 1 te ko_aktivan prebaciti u 1
 * @apiParam {varchar{30}} password
 * @apiSuccessExample {json} Success:
*{
*    "success": true,
*    "message": "Uspješno",
*    "status": true,
*    "data": [
*        {
*        }
*    ]
*}
*/
//* @apiSampleRequest off

prijavaweb : function(req, res, next){
    //console.log('/prijavaweb');
        function f_prijavaweb(a, callback){
            var query = "SELECT * FROM ?? WHERE binary ?? = ? AND binary ?? = ? AND korisnik.ko_aktivan = 1 AND korisnik.ko_admin = 1";
            var table = ['korisnik', 'korisnik.ko_kor_ime', req.body.korime, 'korisnik.ko_lozinka', req.body.password];
            query = mysql.format(query, table); 
            funkcije.mysql_queryV2(query, function(podaci){
                //console.log(podaci)
                if(podaci.success == true){
                    var user = apiToken.addUser(req.body.korime);
                    podaci.data[0].token = user.token;
                    //console.log(user.token)
                    callback(true, podaci)
                }else{
                    callback(false, podaci)
                }
            });       
        }
    
        function f_prijava_log_provjera(a, callback){

            var query = 'call loginProvjeraLog(?)';
            var table = [req.body.korime];			
            query = mysql.format(query, table);        
            funkcije.mysql_queryV2(query, function(podaci){
                //console.log(podaci)
                if(podaci.success == true){
                    if(podaci.data[0].dozvola == 1){
                        callback(true, 'Ok');
                    }else{
                        callback(false, 'Korisnik deaktiviran!');
                    }
                    //console.log(user.token)
                }else{
                    callback(false, podaci)
                }
            });       
        }
    
        try{
            if(req.body.korime && req.body.password){
                f_prijava_log_provjera(req.body, function(rezultat1, podaci1){
                    if(rezultat1 == true){
                        f_prijavaweb(req.body, function(rezultat, podaci){
                            if(rezultat == true){
                                log_prijava.prijava('WEB',null, req.body.korime, 1, req, function(rezultat, podaci){/*console.log('Upisivanje prijave:'+rezultat, podaci);*/});
                                funkcije.posaljiRes(res, { success: true, message: 'Uspješno', status: rezultat, data: podaci.data });
                            }else{
                                log_prijava.prijava('WEB',null, req.body.korime, 0, req, function(rezultat, podaci){/*console.log('Upisivanje prijave:'+rezultat, podaci);*/});
                                funkcije.posaljiRes(res, { success: false, message: 'Korisnik ne postoji ili je deaktiviran!', status: podaci.status, podaci:podaci.data });
                            }
                        });
                    }else{
                        log_prijava.prijava('WEB',null, req.body.korime, 0, req, function(rezultat, podaci){/*console.log('Upisivanje prijave:'+rezultat, podaci);*/});
                        funkcije.posaljiRes(res, { success: false, message: 'Greška kod provjere', status: rezultat1, data:podaci1 });
                    }
                });
            }else{
                funkcije.posaljiRes(res, { success: false, message: "Nisu poslani svi podaci za prijavu!", status:502, data: [] });
            }
        }catch(err){
            console.log(err);
            funkcije.posaljiRes(res, { success: false, message: "Greška, provjerite podatke koje šaljete.", status:503, data: [] });
        }
    }

};


module.exports = prijavaweb;
