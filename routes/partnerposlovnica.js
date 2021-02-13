var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');


var partnerposlovnica = {

/**
 * @api {post} /partnerposlovnicaPopis partnerposlovnicaPopis
 * @apiName partnerposlovnicaPopis
 * @apiGroup partnerposlovnica
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idpartner
 * @apiParam {int} [aktivan] 0 1 
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
partnerposlovnicaPopis : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idpartner){
            let aktivan = 1;
            if(req.body.aktivan === 0){
                ativan = 0;
            }
            var query = "SELECT * FROM partnerposlovnica where partner_idpartner =? and pp_aktivan =?";
            var table = [ req.body.idpartner, aktivan];
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
 * @api {post} /partnerposlovnica partnerposlovnica
 * @apiName partnerposlovnica
 * @apiGroup partnerposlovnica
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idpartnerposlovnica
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
partnerposlovnica : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idpartnerposlovnica){
            var query = "SELECT * FROM partnerposlovnica where idpartnerposlovnica = ?";         
            var table = [req.body.idpartnerposlovnica];
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
 * @api {post} /partnerposlovnicaDodaj partnerposlovnicaDodaj
 * @apiName partnerposlovnicaDodaj
 * @apiGroup partnerposlovnica
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idpartner
 * @apiParam {varchar{6}}  sifra
 * @apiParam {varchar{40}} naziv
 * @apiParam {varchar{50}} [adresa]
 * @apiParam {varchar{30}} [mjesto]
 * @apiParam {varchar{5}}  [posta]
 * @apiParam {varchar{25}} [telefon]
 * @apiParam {varchar{25}} [mobilni]
 * @apiParam {varchar{25}} [email]
 * @apiParam {varchar{50}} [kontaktosoba]
 * @apiParam {varchar{500}} [napomena]
 * @apiParam {int} aktivan
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
partnerposlovnicaDodaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.sifra && req.body.naziv){
            let aktivan = 1;
            if(req.body.aktivan === 0){
                ativan = 0;
            }
            var partnerposlovnica = { 
                pp_sifra: req.body.sifra,
                pp_naziv: req.body.naziv,
                pp_adresa : req.body.adresa,
                pp_mjesto : req.body.mjesto,
                pp_posta : req.body.posta,
                pp_telefon: req.body.telefon,
                pp_mobitel: req.body.mobilni,
                pp_email: req.body.email,
                pp_kontakt_osoba: req.body.kontaktosoba,
                pp_aktivan: aktivan,
                partner_idpartner : req.body.idpartner,
                pp_napomena : req.body.napomena
               
            };  
            var query = "insert into partnerposlovnica SET ?";         
            var table = [partnerposlovnica];
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
 * @api {post} /partnerposlovnicaUredi partnerposlovnicaUredi
 * @apiName partnerposlovnicaUredi
 * @apiGroup partnerposlovnica
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idpartnerposlovnica
 * @apiParam {int} idpartner
 * @apiParam {varchar{6}}  sifra
 * @apiParam {varchar{40}} naziv
 * @apiParam {varchar{50}} [adresa]
 * @apiParam {varchar{30}} [mjesto]
 * @apiParam {varchar{5}}  [posta]
 * @apiParam {varchar{25}} [telefon]
 * @apiParam {varchar{25}} [mobilni]
 * @apiParam {varchar{25}} [email]
 * @apiParam {varchar{50}} [kontaktosoba]
 * @apiParam {varchar{500}} [napomena]
 * @apiParam {int} aktivan
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
partnerposlovnicaUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idpartnerposlovnica && req.body.idpartner && req.body.sifra && req.body.naziv){
            let aktivan = 1;
            if(req.body.aktivan === 0){
                ativan = 0;
            }
            var partnerposlovnica = { 
                //pp_sifra: req.body.sifra,
                pp_naziv: req.body.naziv,
                pp_adresa : req.body.adresa,
                pp_mjesto : req.body.mjesto,
                pp_posta : req.body.posta,
                pp_telefon: req.body.telefon,
                pp_mobitel: req.body.mobilni,
                pp_email: req.body.email,
                pp_kontakt_osoba: req.body.kontaktosoba,
                pp_aktivan: aktivan,
                //partner_idpartner : req.body.idpartner,
                pp_napomena : req.body.napomena
               
            };  
            var query = "update partnerposlovnica set ? where idpartnerposlovnica = ? and partner_idpartner = ?";         
            var table = [partnerposlovnica, req.body.idpartnerposlovnica, req.body.idpartner];
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
 * @api {post} /partnerposlovnicaObrisi partnerposlovnicaObrisi
 * @apiName partnerposlovnicaObrisi
 * @apiGroup partnerposlovnica
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idpartnerposlovnica
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
partnerposlovnicaObrisi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idpartnerposlovnica && req.body.idpartner){
            var query = "DELETE FROM partnerposlovnica where idpartnerposlovnica = ? and partner_idpartner = ?";         
            var table = [req.body.idpartnerposlovnica && req.body.idfirma];
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


module.exports = partnerposlovnica;
