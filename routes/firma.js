var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');

var firma = {
/**
 * @api {post} /firma firma
 * @apiName firma
 * @apiGroup firma
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {varchar{100}} access_token
 * @apiSuccessExample {json} Success:
*{
*    "success": true,
*    "message": "Uspješno",
*    "status": true,
*    "data": [

*    ]
*}
*/
//* @apiSampleRequest off

firma : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let query = "select * from firma where idfirma =?" ;
            let table =  [req.body.idfirma];
            query = mysql.format(query, table); 
            funkcije.mysql_queryV2(query, function(podaci){
                funkcije.posaljiRes(res, podaci);
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
 * @api {post} /firmaUredi firmaUredi
 * @apiName firmaUredi
 * @apiGroup firma
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {varchar{50}} ime
 * @apiParam {varchar{50}} [adresa]
 * @apiParam {varchar{50}} [broj]
 * @apiParam {int{11}} [korisnickipaket]
 * @apiParam {varchar{50}} [telefon]
 * @apiParam {varchar{50}} [fax]
 * @apiParam {varchar{50}} [email]
 * @apiParam {varchar{50}} [opis]
 * @apiParam {varchar{30}} oib
 * @apiParam {varchar{5}} [posta]
 * @apiParam {varchar{50}} [mjesto]
 * @apiParam {varchar{50}} [email]
 * @apiParam {varchar{50}} [opis]
 * @apiParam {varchar{50}} [url]
 * @apiSuccessExample {json} Success:
*{
*    "success": true,
*    "message": "Uspješno",
*    "status": true,
*    "data": [

*    ]
*}
*/
//* @apiSampleRequest off

firmaUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let firma = { 
                fi_ime: req.body.ime,
                fi_adresa: req.body.adresa,
                fi_broj: req.body.broj,
                //fi_korisnickipaket: req.body.korisnickipaket,
                fi_telefon: req.body.telefon,
                fi_fax: req.body.fax,
                fi_email: req.body.email,
                fi_opis: req.body.opis,
                fi_url: req.body.url,
                fi_oib: req.body.oib,
                /*fi_zaglavlje1: req.body.zaglavlje1,
                fi_zaglavlje2: req.body.zaglavlje2,
                fi_zaglavlje3: req.body.zaglavlje3,
                fi_zaglavlje4: req.body.zaglavlje4,
                fi_zaglavlje5: req.body.zaglavlje5,
                fi_zaglavlje6: req.body.zaglavlje6,
                fi_podnozje1: req.body.podnozje1,
                fi_podnozje2: req.body.podnozje2,
                fi_podnozje3: req.body.podnozje3,
                fi_zaglavljeracuna: req.body.zaglavljeracuna,*/
                fi_posta: req.body.posta,
                fi_mjesto: req.body.mjesto,
                korisnik_idkorisnik_izmjena: req.body.idkorisnik
            };  
            let query = "update firma set ? where idfirma = ?" ;
            let table =  [firma, req.body.idfirma];
            query = mysql.format(query, table); 
            funkcije.mysql_queryV2(query, function(podaci){
                funkcije.posaljiRes(res,podaci);
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


module.exports = firma;
