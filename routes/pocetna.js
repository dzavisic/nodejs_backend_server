var mysql = require('mysql');
var apiToken = require('api-token');
var pool = require('../connection');
var funkcije = require('./funkcije.js');

var pocetna = {
    
/**
 * @api {post} /pocetna pocetna
 * @apiName pocetna
 * @apiGroup pocetna
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

pocetna : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let query = "select 1 as  pocetna" ;
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
}

};


module.exports = pocetna;
