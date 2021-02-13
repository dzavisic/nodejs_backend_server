var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');

var porezi = {

/**
 * @api {post} /porezPopis porezPopis
 * @apiName porezPopis
 * @apiGroup porez
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
porezPopis : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let query = "SELECT porez.*, poreznastopa.pzs_naziv as poreznastopaprodajaime FROM porez inner join  poreznastopa on poreznastopa.pzs_ID = porez.poreznastopa_pzs_ID where porez.firma_idfirma =?" ;
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
 * @api {post} /porez porez
 * @apiName porez
 * @apiGroup porez
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} pz_ID
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
porez : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.pz_ID){
            let query = "SELECT porez.*, poreznastopa.pzs_naziv as poreznastopaprodajaime FROM porez inner join  poreznastopa on poreznastopa.pzs_ID = porez.poreznastopa_pzs_ID where porez.pz_ID = ? and porez.firma_idfirma =?";            
            let table =  [req.body.pz_ID, req.body.idfirma];
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
 * @api {post} /porezDodaj porezDodaj
 * @apiName porezDodaj
 * @apiGroup porez
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} pzs_ID poreznastopa id
 * @apiParam {decimal{5,2}} posto
 * @apiParam {date} [datumod]
 * @apiParam {date} [datumdo]
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
porezDodaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.pzs_ID && req.body.posto){
            let porez = { 
                PZ_POSTO: req.body.posto,
                PZ_DATUMOD: req.body.datumod,
                PZ_DATUMDO: req.body.datumdo,
                poreznastopa_pzs_ID: req.body.pzs_ID,
                firma_idfrima: req.body.idfirma
            };    
            let query = "insert into porez SET ?"        
            let table =  [porez];
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
 * @api {post} /porezUredi porezUredi
 * @apiName porezUredi
 * @apiGroup porez
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} pz_ID
 * @apiParam {int} pzs_ID poreznastopa id
 * @apiParam {decimal{5,2}} posto
 * @apiParam {date} [datumod]
 * @apiParam {date} [datumdo]
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
porezUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.pz_ID && req.body.naziv){
            let aktivan = 1;
            if(req.body.aktivan === 0){ aktivan = 0;}
            let porez = { 
                PZ_POSTO: req.body.posto,
                PZ_DATUMOD: req.body.datumod,
                PZ_DATUMDO: req.body.datumdo,
                poreznastopa_pzs_ID: req.body.pzs_ID
            };  
            let query = "update porez set ? where pz_ID = ? and firma_idfirma = ?"        
            let table =  [porez, req.body.pz_ID, req.body.idfirma];
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
 * @api {post} /porezObrisi porezObrisi
 * @apiName porezObrisi
 * @apiGroup porez
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} pz_ID
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
porezObrisi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.pz_ID){
            let query = "delete from porez where pz_ID=? and firma_idfirma=?" ;
            let table =  [req.body.pz_ID, req.body.idfirma];
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


module.exports = porezi;
