var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');


var partner = {

/**
 * @api {post} /partnerPopis partnerPopis
 * @apiName partnerPopis
 * @apiGroup partner
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} [aktivan] 0 1 default 1 
 * @apiParam {int} [vanjski] 0 1 default 0
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
partnerPopis : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let aktivan = 1;
            if(req.body.aktivan === 0){ativan = 0;}
            let vanjski = 0;
            if(req.body.vanjski === 1){vanjski = 1;}
            
            var query = "SELECT * FROM partner where firma_idfirma =? and pa_aktivan =? and pa_vanjski = ?";
            var table = [ req.body.idfirma, aktivan, vanjski];
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
 * @api {post} /partner partner
 * @apiName partner
 * @apiGroup partner
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idpartner
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
partner : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idpartner){
            var query = "SELECT * FROM partner where idpartner = ? and firma_idfirma =?";         
            var table = [req.body.idpartner, req.body.idfirma];
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
 * @api {post} /partnerDodaj partnerDodaj
 * @apiName partnerDodaj
 * @apiGroup partner
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {varchar{6}}  sifra
 * @apiParam {varchar{40}} naziv
 * @apiParam {varchar{50}} [adresa]
 * @apiParam {varchar{30}} [mjesto]
 * @apiParam {varchar{5}}  [posta]
 * @apiParam {varchar{11}} [oib]
 * @apiParam {varchar{13}} [maticnibr]
 * @apiParam {varchar{25}} [telefon]
 * @apiParam {varchar{25}} [mobilni]
 * @apiParam {varchar{25}} [fax]
 * @apiParam {varchar{25}} [mail]
 * @apiParam {varchar{25}} [web]
 * @apiParam {varchar{50}} [napomena]
 * @apiParam {varchar{50}} [vrsta] 0 - fizicka, 1 - pravna
 * @apiParam {int} [aktivan] 1 default
 * @apiParam {int} [vanjski] 0 1 default 0
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
partnerDodaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let aktivan = 1;
            if(req.body.aktivan === 0){ativan = 0;}
            var partner = { 
                pa_sifra: req.body.sifra,
                pa_naziv: req.body.naziv,
                pa_adresa : req.body.adresa,
                pa_mjesto : req.body.mjesto,
                pa_posta : req.body.posta,
                pa_ziroracun: req.body.ziroracun,
                pa_oib : req.body.oib,
                pa_maticnibr : req.body.maticnibr,
                pa_telefon: req.body.telefon,
                pa_mobilni: req.body.mobilni,
                pa_fax: req.body.fax,
                pa_mail: req.body.mail,
                pa_web: req.body.web,
                pa_napomena: req.body.napomena,
                pa_aktivan: aktivan,
                pa_vrsta: req.body.vrsta,
                pa_vanjski :req.body.vanjski || 0,
                korisnik_idkorisnik_izmjena:  req.body.idkorisnik,
                firma_idfirma : req.body.idfirma
               
            };  
            var query = "insert into partner SET ?";         
            var table = [partner];
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
 * @api {post} /partnerUredi partnerUredi
 * @apiName partnerUredi
 * @apiGroup partner
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idpartner
 * @apiParam {varchar{40}} naziv
 * @apiParam {varchar{50}} [adresa]
 * @apiParam {varchar{30}} [mjesto]
 * @apiParam {varchar{5}}  [posta]
 * @apiParam {varchar{11}} [oib]
 * @apiParam {varchar{13}} [maticnibr]
 * @apiParam {varchar{25}} [telefon]
 * @apiParam {varchar{25}} [mobilni]
 * @apiParam {varchar{25}} [fax]
 * @apiParam {varchar{25}} [mail]
 * @apiParam {varchar{25}} [web]
 * @apiParam {varchar{50}} [napomena]
 * @apiParam {varchar{50}} [vrsta] 0 - fizicka, 1 - pravna
 * @apiParam {int} [aktivan] 1 default
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
partnerUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idpartner){
            let aktivan = 1;
            if(req.body.aktivan === 0){ativan = 0;}
            var partner = { 
                // pa_sifra: req.body.sifra,
                pa_naziv: req.body.naziv,
                pa_adresa : req.body.adresa,
                pa_mjesto : req.body.mjesto,
                pa_posta : req.body.posta,
                pa_ziroracun: req.body.ziroracun,
                pa_oib : req.body.oib,
                pa_maticnibr : req.body.maticnibr,
                pa_telefon: req.body.telefon,
                pa_mobilni: req.body.mobilni,
                pa_fax: req.body.fax,
                pa_mail: req.body.mail,
                pa_web: req.body.web,
                pa_napomena: req.body.napomena,
                pa_aktivan: aktivan,
                pa_vrsta: req.body.vrsta,
                korisnik_idkorisnik_izmjena:  req.body.idkorisnik,
               
            };  
            var query = "update partner set ? where idpartner = ? and firma_idfirma = ?";         
            var table = [partner, req.body.idpartner, req.body.idfirma];
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
 * @api {post} /partnerObrisi partnerObrisi
 * @apiName partnerObrisi
 * @apiGroup partner
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idpartner
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
partnerObrisi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idpartner){
            var query = "DELETE FROM partner where idpartner = ? and firma_idfirma = ?";         
            var table = [req.body.idpartner && req.body.idfirma];
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
}

};


module.exports = partner;
