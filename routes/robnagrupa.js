var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');

var robnagrupa = {

/**
 * @api {post} /robnagrupaPopis robnagrupaPopis
 * @apiName robnagrupaPopis
 * @apiGroup robnagrupa
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
*        {
*        }    
*    ]
*}
*/
//* @apiSampleRequest off
robnagrupaPopis : function(req, res, next){
    try{
        if(req.body.idkorisnik && req.body.idfirma){
            var query = "SELECT robnagrupa.* FROM robnagrupa where firma_idfirma =?";
            var table = [req.body.idfirma];
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res, podaci);
            });
        }else{
            funkcije.posaljiRes(res, funkcije.err_data);
        }
    }catch(err){
        funkcije.posaljiRes(res, funkcije.err_unknown(err));
    }
},

/**
 * @api {post} /robnagrupa robnagrupa
 * @apiName robnagrupa
 * @apiGroup robnagrupa
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idrobnagrupa
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
robnagrupa : function(req, res, next){
    try{
        if(req.body.idkorisnik && req.body.idrobnagrupa && req.body.idfirma){
            let query = "SELECT * from robnagrupa where idrobnagrupa=?";
            let table = [req.body.idrobnagrupa];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res,podaci);
            });
        }else{
            funkcije.posaljiRes(res,funkcije.err_data);
        }
    }catch(err){
        funkcije.posaljiRes(res,funkcije.err_unknown(err));
    }
},


/**
 * @api {post} /robnagrupaDodaj robnagrupaDodaj
 * @apiName robnagrupaDodaj
 * @apiGroup robnagrupa
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
* @apiParam {varchar{8}} sifra
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
robnagrupaDodaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let robnagrupa = { 
                rg_sifra: req.body.sifra,
                rg_naziv : req.body.naziv,
                firma_idfirma : req.body.idfirma
            };    
            let query = "insert into robnagrupa SET rg_datumunosa=CURRENT_TIMESTAMP, ?";
            let table = [robnagrupa];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res,podaci);
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
        }
    }catch(err){
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }

},

/**
 * @api {put} /robnagrupaUredi robnagrupaUredi
 * @apiName robnagrupaUredi
 * @apiGroup robnagrupa
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idrobnagrupa
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
robnagrupaUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idrobnagrupa && req.body.naziv){
            let robnagrupa = { 
                //rg_sifra: req.body.sifra,
                rg_naziv : req.body.naziv
            };   
            let query = "UPDATE robnagrupa SET ? WHERE idrobnagrupa = ?";
            let table = [robnagrupa, req.body.idrobnagrupa];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res,podaci);
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
        }
    }catch(err){
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }

},

/**
 * @api {post} /robnagrupaObrisi robnagrupaObrisi
 * @apiName robnagrupaObrisi
 * @apiGroup robnagrupa
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idrobnagrupa
* @apiParam {varchar{100}} access_token
* @apiSuccessExample {json} Success:
*{
*    "success": true,
*    "message": "Uspješno",
*    "status": true,
*    "data": [
*        {
*   
*        }
*    ]
*}
*/
//* @apiSampleRequest off
robnagrupaObrisi: function (req, res, next) {
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idrobnagrupa){
            let query = "DELETE FROM robnagrupa where idrobnagrupa=? firma_idfirma =?";
            let table = [req.body.idrobnagrupa, req.body.idfirma];  
            query = mysql.format(query,table);
            funkcije.mysql_query(query,function(podaci){
                funkcije.posaljiRes(res,podaci);
            });
        }else{
            funkcije.posaljiRes(res,funkcije.err_data);
        }
    }catch(err){
        funkcije.posaljiRes(res,funkcije.err_unknown(err));
    }
}

};

module.exports = robnagrupa;
