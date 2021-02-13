var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');



var tablemanweb = {

/**
* @api {post} /uredjajPopis uredjajPopis
* @apiName uredjajPopis
* @apiGroup uredjaj
* @apiVersion 0.0.1
* @apiParam {int} idfirma
* @apiParam {int} idkorisnik idsecusers
* @apiParam {varchar{100}} access_token
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

uredjajPopis : function(req, res, next){

    function f_uredjaji(a, callback){
        var query = "SELECT uredjaj.*, korisnik.ko_ime, korisnik.ko_prezime, korisnik.ko_kor_ime, poslovnica.po_sifra, poslovnica.po_naziv  from uredjaj left join korisnik on uredjaj.korisnik_idkorisnik = korisnik.idkorisnik left join poslovnica on uredjaj.poslovnica_idposlovnica = poslovnica.idposlovnica  where uredjaj.firma_idfirma =?" ;
        var table =  [req.body.idfirma];
        query = mysql.format(query, table); 
        funkcije.mysql_queryV2(query, function(podaci){
            //console.log(podaci)
            if(podaci.success == true){
                //console.log(user.token)
                callback(true, podaci)
            }else{
                callback(false, podaci)
            }
        });       
    }

    try{
        if(req.body.idfirma && req.body.idkorisnik){
            f_uredjaji(req.body, function(rezultat, podaci){
                if(rezultat == true){
                    funkcije.posaljiRes(res,{ success: true, message: podaci.message, status: podaci.status, data:podaci.data});
                }else{
                    funkcije.posaljiRes(res,{ success: false, message: 'Podaci nisu dohvaćeni', status: podaci.status, data:podaci.data});
                }
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[]});
        }
    }catch(err){
        console.log(err);
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
    }
},

/**
* @api {post} /uredjaj uredjaj
* @apiName uredjaj
* @apiGroup uredjaj
* @apiVersion 0.0.1
* @apiParam {int} idfirma
* @apiParam {int} idkorisnik idsecusers
* @apiParam {int} iduredjaj
* @apiParam {varchar{100}} access_token
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

uredjaj : function(req, res, next){

    function f_uredjaji(a, callback){
        var query = "SELECT uredjaj.*, korisnik.ko_ime, korisnik.ko_prezime, korisnik.ko_kor_ime, poslovnica.po_sifra, poslovnica.po_naziv  from uredjaj left join korisnik on uredjaj.korisnik_idkorisnik = korisnik.idkorisnik left join poslovnica on uredjaj.poslovnica_idposlovnica = poslovnica.idposlovnica  where uredjaj.iduredjaj = ? and uredjaj.firma_idfirma =?" ;
        var table =  [req.body.iduredjaj, req.body.idfirma];
        query = mysql.format(query, table); 
        console.log(query);
        funkcije.mysql_queryV2(query, function(podaci){
            //console.log(podaci)
            if(podaci.success == true){
                //console.log(user.token)
                callback(true, podaci)
            }else{
                callback(false, podaci)
            }
        });       
    }

    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.iduredjaj){
            f_uredjaji(req.body, function(rezultat, podaci){
                if(rezultat == true){
                    funkcije.posaljiRes(res,{ success: true, message: podaci.message, status: podaci.status, data:podaci.data});
                }else{
                    funkcije.posaljiRes(res,{ success: false, message: 'Podaci nisu dohvaćeni', status: podaci.status, data:podaci.data});
                }
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[]});
        }
    }catch(err){
        console.log(err);
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
    }
},

/**
* @api {post} /uredjajUredi uredjajUredi
* @apiName uredjajUredi
* @apiGroup uredjaj
* @apiVersion 0.0.1
* @apiParam {int} idfirma
* @apiParam {int} idkorisnik idsecusers
* @apiParam {int} iduredjaj
* @apiParam {int} [aktivan] default 0
* @apiParam {varchar{3}} [naplatnibroj] default null
* @apiParam {int} [idposlovnice] default null
* @apiParam {varchar{100}} access_token
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

//uredjajuredi
uredjajUredi : function(req, res, next){

    function f_uredjaji(a, callback){
        var uredjaj = {
            //rg_sifra: req.body.sifra,
            ur_aktivan : req.body.aktivan || 0,
            poslovnica_idposlovnica: req.body.idposlovnice || null,
            ur_naplatnibroj : req.body.naplatnibroj || null
        };

        var query = "update uredjaj set ? where iduredjaj = ?" ;
        var table =  [uredjaj, req.body.iduredjaj];
        query = mysql.format(query, table); 
        funkcije.mysql_queryV2(query, function(podaci){
            //console.log(podaci)
            if(podaci.success == true){
                //console.log(user.token)
                callback(true, podaci)
            }else{
                callback(false, podaci)
            }
        });       
    }

    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.iduredjaj){

            //if(funkcije.provjera(null, req.body.naplatnibroj, 'number', 1, 99999999999999999999, null)){}

            f_uredjaji(req.body, function(rezultat, podaci){
                if(rezultat == true){
                    funkcije.posaljiRes(res,{ success: true, message: podaci.message, status: podaci.status, data:podaci.data});
                }else{
                    funkcije.posaljiRes(res,{ success: false, message: 'Podaci nisu dohvaćeni', status: podaci.status, data:podaci.data});
                }
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[]});
        }
    }catch(err){
        console.log(err);
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
    }

}

};

module.exports = tablemanweb;
