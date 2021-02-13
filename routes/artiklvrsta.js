var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');

var artiklvrsta = {

/**
 * @api {post} /artiklvrstaPopis artiklvrstaPopis
 * @apiName artiklvrstaPopis
 * @apiGroup artiklvrsta
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
artiklvrstaPopis : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let query = "SELECT artiklvrsta.* FROM artiklvrsta where artiklvrsta.firma_idfirma =?" ;
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
 * @api {post} /artiklvrsta artiklvrsta
 * @apiName artiklvrsta
 * @apiGroup artiklvrsta
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idartiklvrsta
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
artiklvrsta : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idartiklvrsta){
            let query = "SELECT artiklvrsta.* FROM artiklvrsta where artiklvrsta.idartiklvrsta = ? and artiklvrsta.firma_idfirma =?";            
            let table =  [req.body.idartiklvrsta, req.body.idfirma];
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
 * @api {post} /artiklvrstaDodaj artiklvrstaDodaj
 * @apiName artiklvrstaDodaj
 * @apiGroup artiklvrsta
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {varchar{20}} av_sifra
 * @apiParam {varchar{50}} av_naziv
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
artiklvrstaDodaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.av_naziv && req.body.av_sifra){
            let aktivan = 1;
            if(req.body.aktivan === 0){ aktivan = 0;}
            let artiklvrsta = { 
                av_sifra: req.body.av_sifra,
                av_naziv: req.body.av_naziv,
                firma_idfirma: req.body.idfirma
            };    
            let query = "insert into artiklvrsta SET ?"        
            let table =  [artiklvrsta];
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
 * @api {post} /artiklvrstaUredi artiklvrstaUredi
 * @apiName artiklvrstaUredi
 * @apiGroup artiklvrsta
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idartiklvrsta
 * @apiParam {varchar{50}} av_naziv
 * @apiParam {varchar{20}} av_sifra
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
artiklvrstaUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idartiklvrsta && req.body.av_naziv && req.body.av_sifra){
            let artiklvrsta = { 
                av_sifra: req.body.av_sifra,
                av_naziv: req.body.av_naziv
            };      
            let query = "update artiklvrsta set ? where idartiklvrsta = ? and firma_idfirma = ?"        
            let table =  [artiklvrsta, req.body.idartiklvrsta, req.body.idfirma];
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
 * @api {post} /artiklvrstaObrisi artiklvrstaObrisi
 * @apiName artiklvrstaObrisi
 * @apiGroup artiklvrsta
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idartiklvrsta
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
artiklvrstaObrisi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idartiklvrsta){
            let query = "delete from artiklvrsta where idartiklvrsta=? and firma_idfirma=?" ;
            let table =  [req.body.idartiklvrsta, req.body.idfirma];
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


module.exports = artiklvrsta;
