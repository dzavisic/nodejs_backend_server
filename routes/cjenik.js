var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');

var cjenik = {

/**
 * @api {post} /cjenikPopis cjenikPopis
 * @apiName cjenikPopis
 * @apiGroup cjenik
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
cjenikPopis : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let query = "SELECT cjenik.*, artikl.ar_sifra, artikl.ar_naziv, poslovnica.po_sifra, poslovnica.po_naziv FROM cjenik inner join artikl on cjenik.artikl_idartikl = artikl.idartikl left join poslovnica on cjenik.poslovnica_idposlovnica = poslovnica.idposlovnica where cjenik.firma_idfirma =?" ;
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
 * @api {post} /cjenik cjenik
 * @apiName cjenik
 * @apiGroup cjenik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idcjenik
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
cjenik : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idcjenik){
            let query = "SELECT cjenik.*, artikl.ar_sifra, artikl.ar_naziv, poslovnica.po_sifra, poslovnica.po_naziv FROM cjenik inner join artikl on cjenik.artikl_idartikl = artikl.idartikl left join poslovnica on cjenik.poslovnica_idposlovnica = poslovnica.idposlovnica where cjenik.idcjenik = ? and cjenik.firma_idfirma =?" ;
            let table =  [req.body.idcjenik, req.body.idfirma];
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
 * @api {post} /cjenikDodaj cjenikDodaj
 * @apiName cjenikDodaj
 * @apiGroup cjenik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idartikl
 * @apiParam {date} datumod
 * @apiParam {date} datumdo
 * @apiParam {decimal{15,2}} cijena
 * @apiParam {varchar{50}} [cjenik] naziv cjenika
 * @apiParam {varchar{3}} [valuta]
 * @apiParam {varchar{200}} [napomena]
 * @apiParam {int} [idposlovnica]
 * @apiParam {int} [vrsta]   default 1 - Prodajni, 2 - Nabavni
 * @apiParam {int} [aktivan] default 1
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
cjenikDodaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idartikl && req.body.cijena &&  req.body.datumod && req.body.datumdo){
            let aktivan = 1;
            if(req.body.aktivan === 0){ aktivan = 0;}
            let cjenik = { 
                cj_cjenik       : req.body.cjenik,
                cj_datumod      : req.body.datumod,
                cj_datumdo      : req.body.datumdo,
                cj_valuta       : req.body.valuta,
                cj_napomena     : req.body.napomena,
                artikl_idartikl : req.body.idartikl,
                poslovnica_idposlovnica : req.body.idposlovnica,
                cj_cijena       : req.body.cijena,
                cj_vrsta        : req.body.vrsta,
                cj_aktivan      : aktivan,
                firma_idfirma   : req.body.idfirma
            };    
            let query = "insert into cjenik SET ?"        
            let table =  [cjenik];
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
 * @api {post} /cjenikUredi cjenikUredi
 * @apiName cjenikUredi
 * @apiGroup cjenik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idcjenik
 * @apiParam {int} idartikl
 * @apiParam {date} datumod
 * @apiParam {date} datumdo
 * @apiParam {decimal{15,2}} cijena
 * @apiParam {varchar{50}} [cjenik] naziv cjenika
 * @apiParam {varchar{3}} [valuta]
 * @apiParam {varchar{200}} [napomena]
 * @apiParam {int} [idposlovnica]
 * @apiParam {int} [vrsta]   default 1 - Prodajni, 2 - Nabavni
 * @apiParam {int} [aktivan] default 1
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
cjenikUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idcjenik && req.body.idartikl && req.body.cijena &&  req.body.datumod && req.body.datumdo){
            let aktivan = 1;
            if(req.body.aktivan === 0){ aktivan = 0;}
            let cjenik = { 
                cj_cjenik       : req.body.cjenik,
                cj_datumod      : req.body.datumod,
                cj_datumdo      : req.body.datumdo,
                cj_valuta       : req.body.valuta,
                cj_napomena     : req.body.napomena,
                artikl_idartikl : req.body.idartikl,
                poslovnica_idposlovnica : req.body.idposlovnica,
                cj_cijena       : req.body.cijena,
                cj_vrsta        : req.body.vrsta,
                cj_aktivan      : aktivan,
                firma_idfirma   : req.body.idfirma
            };       
            let query = "update cjenik set ? where idcjenik = ? and firma_idfirma = ?"        
            let table =  [cjenik, req.body.idcjenik, req.body.idfirma];
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
 * @api {post} /cjenikObrisi cjenikObrisi
 * @apiName cjenikObrisi
 * @apiGroup cjenik
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idcjenik
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
cjenikObrisi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idcjenik){
            let query = "delete from cjenik where idcjenik=? and firma_idfirma=?" ;
            let table =  [req.body.idcjenik, req.body.idfirma];
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


module.exports = cjenik;
