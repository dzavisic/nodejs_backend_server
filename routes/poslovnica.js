var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');


var poslovnica = {

/**
 * @api {post} /poslovnicaPopis poslovnicaPopis
 * @apiName poslovnicaPopis
 * @apiGroup poslovnica
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
*    ]
*}
*/
//* @apiSampleRequest off
poslovnicaPopis : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
                let query = "SELECT poslovnica.idposlovnica, poslovnica.po_sifra, poslovnica.po_naziv, poslovnica.po_adresa, poslovnica.po_mjesto, poslovnica.porezneispostave_idporeznaispostava FROM poslovnica where poslovnica.firma_idfirma =? and poslovnica.po_aktivan = 1" ;
                let table =  [req.body.idfirma];
                query = mysql.format(query, table); 
                funkcije.mysql_queryV2(query, function(podaci){
                    funkcije.posaljiRes(res,podaci)
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
 * @api {post} /poslovnica poslovnica
 * @apiName poslovnica
 * @apiGroup poslovnica
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik idsecusers
 * @apiParam {int} idposlovnica
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
poslovnica : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idposlovnica){
            let query = "SELECT poslovnica.idposlovnica, poslovnica.po_sifra, poslovnica.po_naziv, poslovnica.po_adresa, poslovnica.po_mjesto, poslovnica.porezneispostave_idporeznaispostava FROM poslovnica where poslovnica.idposlovnica = ? and poslovnica.firma_idfirma =?" ;
            let table =  [req.body.idposlovnica, req.body.idfirma];
            query = mysql.format(query, table); 
            funkcije.mysql_queryV2(query, function(podaci){
                funkcije.posaljiRes(res,podaci)
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
 * @api {post} /poslovnicaDodaj poslovnicaDodaj
 * @apiName poslovnicaDodaj
 * @apiGroup poslovnica
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {varchar{6}} sifra
 * @apiParam {varchar{50}} naziv
 * @apiParam {varchar{50}} adresa
 * @apiParam {varchar{50}} mjesto
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
poslovnicaDodaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.sifra && req.body.naziv && req.body.adresa && req.body.mjesto){
            var query = "CALL poslovnicaDodaj(?,?,?,?,?)";
            var table = [req.body.sifra, req.body.naziv, req.body.adresa, req.body.mjesto, req.body.idfirma];
            query = mysql.format(query, table);        
            funkcije.mysql_queryV2(query, function(podaci){
                //console.log(podaci)
                if(podaci.success != true){
                    funkcije.posaljiRes(res,podaci);
                }else{
                    //callback(podaci.success, podaci.data);
                    if(podaci.data[0].rezultat == 1){
                        funkcije.posaljiRes(res,{ success:true, message:podaci.message, status:podaci.status, data:podaci.data});
                    }else{
                        funkcije.posaljiRes(res,{ success: false, message: 'Poslovnica nije dodana! Rezultat 0!', status: podaci.status, data:podaci.data});
                    }
                }       
            })
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[]});
        }
    }catch(err){
        console.log(err);
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
    }

},

/**
 * @api {post} /poslovnicaUredi poslovnicaUredi
 * @apiName poslovnicaUredi
 * @apiGroup poslovnica
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik idsecusers
 * @apiParam {int} idposlovnica
 * @apiParam {varchar{50}} adresa
 * @apiParam {varchar{50}} mjesto 
 * @apiParam {varchar{50}} naziv 
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
poslovnicaUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idposlovnica){
            let poslovnica = { 
                //po_sifra: req.body.sifra,
                po_naziv: req.body.naziv,
                po_adresa: req.body.adresa,
                po_mjesto: req.body.mjesto,
                //porezneispostave_idporeznaispostava: req.body.poreznaispostava
            };
            let query = "update poslovnica set ? where poslovnica.idposlovnica = ? and poslovnica.firma_idfirma =?" ;
            let table =  [poslovnica, req.body.idposlovnica,  req.body.idfirma];
            query = mysql.format(query, table);
            funkcije.mysql_queryV2(query, function(podaci){
                funkcije.posaljiRes(res,podaci)
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
 * @api {post} /poslovnicaObrisi poslovnicaObrisi
 * @apiName poslovnicaObrisi
 * @apiGroup poslovnica
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik idsecusers
 * @apiParam {int} idposlovnica Ne briše se nego aktivan 0
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
poslovnicaObrisi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idposlovnica){
            let query = "update poslovnica set poslovnica.po_aktivan = 0 where poslovnica.idposlovnica = ? and poslovnica.firma_idfirma =?" ;
            let table =  [req.body.idposlovnica, req.body.idfirma];
            query = mysql.format(query, table); 
            funkcije.mysql_queryV2(query, function(podaci){
                funkcije.posaljiRes(res,podaci)
            });      
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[]});
        }
    }catch(err){
        console.log(err);
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err});
    }
},

porezneispostave: function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            var query = "SELECT idporeznaispostava as id, pi_sifra as sifra, pi_naziv as naziv FROM ??";
            var table = ["porezneispostave"];
            query = mysql.format(query,table);
            funkcije.mysql_queryV2(query, function(podaci){
                funkcije.posaljiRes(res,podaci)
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


module.exports = poslovnica;
