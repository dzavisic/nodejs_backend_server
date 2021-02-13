var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var funkcije    = require('./funkcije.js');

var artikli = {

/**
 * @api {post} /artiklPopis artiklPopis
 * @apiName artiklPopis
 * @apiGroup artikl
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
artiklPopis : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik){
            let query = "SELECT artikl.*, poreznastopa.pzs_naziv as poreznastopaprodajaime, p2.pzs_naziv as poreznastopanabavaime, pnpgrupe.pnp_opis as pnpgrupeopis,  robnagrupa.rg_naziv as robnagrupanaziv, artiklvrsta.av_naziv, porez.PZ_POSTO, porez.PZ_ID FROM artikl left join robnagrupa  on robnagrupa.idrobnagrupa = artikl.robnagrupa_idrobnagrupa left join  poreznastopa on poreznastopa.pzs_ID = artikl.poreznastopa_pzs_IDprodaja  left join  poreznastopa  p2 on p2.pzs_ID = artikl.poreznastopa_pzs_IDnabava left join pnpgrupe on pnpgrupe.idpnpgrupe =artikl.pnpgrupe_idpnpgrupe left join artiklvrsta on artikl.artiklvrsta_idartiklvrsta = artiklvrsta.idartiklvrsta left join (select porez.* from porez where ( porez.poreznastopa_pzs_ID, porez.PZ_DATUMOD) in (select porez.poreznastopa_pzs_ID, max(porez.PZ_DATUMOD) from porez where porez.PZ_DATUMOD < date(now()) and porez.PZ_DATUMDO >= date(now()) group by porez.poreznastopa_pzs_ID  )  ) porez on artikl.poreznastopa_pzs_IDprodaja =   porez.poreznastopa_pzs_ID  where artikl.firma_idfirma =?" ;
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
 * @api {post} /artikl artikl
 * @apiName artikl
 * @apiGroup artikl
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idartikl
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
artikl : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idartikl){
            let query = "SELECT artikl.*, poreznastopa.pzs_naziv as poreznastopaprodajaime, p2.pzs_naziv as poreznastopanabavaime, pnpgrupe.pnp_opis as pnpgrupeopis,  robnagrupa.rg_naziv as robnagrupanaziv, artiklvrsta.av_naziv, porez.PZ_POSTO, porez.PZ_ID FROM artikl left join robnagrupa  on robnagrupa.idrobnagrupa = artikl.robnagrupa_idrobnagrupa left join  poreznastopa on poreznastopa.pzs_ID = artikl.poreznastopa_pzs_IDprodaja  left join  poreznastopa  p2 on p2.pzs_ID = artikl.poreznastopa_pzs_IDnabava left join pnpgrupe on pnpgrupe.idpnpgrupe =artikl.pnpgrupe_idpnpgrupe left join artiklvrsta on artikl.artiklvrsta_idartiklvrsta = artiklvrsta.idartiklvrsta left join (select porez.* from porez where ( porez.poreznastopa_pzs_ID, porez.PZ_DATUMOD) in (select porez.poreznastopa_pzs_ID, max(porez.PZ_DATUMOD) from porez where porez.PZ_DATUMOD < date(now()) and porez.PZ_DATUMDO >= date(now()) group by porez.poreznastopa_pzs_ID  )  ) porez on artikl.poreznastopa_pzs_IDprodaja =   porez.poreznastopa_pzs_ID  where artikl.idartikl = ? and artikl.firma_idfirma =?";            
            let table =  [req.body.idartikl, req.body.idfirma];
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
 * @api {post} /artiklDodaj artiklDodaj
 * @apiName artiklDodaj
 * @apiGroup artikl
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {varchar{10}} sifra
 * @apiParam {varchar{32}} naziv
 * @apiParam {varchar{32}} [jedinicamjere]
 * @apiParam {int} [poreznastopaprodaja]
 * @apiParam {int} [poreznastopanabava]
 * @apiParam {int} [idpnpgrupe]
 * @apiParam {int} [pnp ]
 * @apiParam {decimal{15,2}} [cijena]
 * @apiParam {int} [prodajni]
 * @apiParam {int} [idrobnagrupa]
 * @apiParam {int} [aktivan] default 1
 * @apiParam {decimal{5,2}} [maxrabat]
 * @apiParam {text} [opis]
 * @apiParam {int} [idartiklvrsta]
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
artiklDodaj : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.sifra && req.body.naziv){
            let aktivan = 1;
            if(req.body.aktivan === 0){ aktivan = 0;}
            let artikl = { 
                ar_sifra: req.body.sifra,
                ar_naziv: req.body.naziv,
                jedinicamjere_JM_SIFRA: req.body.jedinicamjere,
                poreznastopa_pzs_IDprodaja: req.body.poreznastopaprodaja,
                poreznastopa_pzs_IDnabava: req.body.poreznastopanabava,
                pnpgrupe_idpnpgrupe: req.body.idpnpgrupe,
                ar_pnp: req.body.pnp,
                ar_cijena: req.body.cijena || 0,
                ar_prodajni: req.body.prodajni || 0,
                robnagrupa_idrobnagrupa: req.body.idrobnagrupa,

                firma_idfirma: req.body.idfirma,
                //ar_trenutnostanje: req.body.trenutnostanje,
                //ar_nabavnacijena: req.body.nabavnacijena,
                korisnik_idkorisnik_izmjena: req.body.idkorisnik,
                ar_aktivan: aktivan,
                ar_maxrabat: req.body.maxrabat,
                ar_opis: req.body.opis,
                artiklvrsta_idartiklvrsta : req.body.idartiklvrsta
            };    
            let query = "insert into artikl SET ar_datumunosa=CURRENT_TIMESTAMP, ?"        
            let table =  [artikl];
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
 * @api {post} /artiklUredi artiklUredi
 * @apiName artiklUredi
 * @apiGroup artikl
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idartikl
 * @apiParam {varchar{32}} naziv
 * @apiParam {varchar{32}} [jedinicamjere]
 * @apiParam {int} [poreznastopaprodaja]
 * @apiParam {int} [poreznastopanabava]
 * @apiParam {int} [idpnpgrupe]
 * @apiParam {int} [pnp ]
 * @apiParam {decimal{15,2}} [cijena]
 * @apiParam {int} [prodajni]
 * @apiParam {int} [idrobnagrupa]
 * @apiParam {int} [aktivan] default 1
 * @apiParam {decimal{5,2}} [maxrabat]
 * @apiParam {text} [opis]
 * @apiParam {int} [idartiklvrsta]
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
artiklUredi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idartikl && req.body.naziv){
            let aktivan = 1;
            if(req.body.aktivan === 0){ aktivan = 0;}
            let artikl = { 
                //ar_sifra: req.body.sifra,
                ar_naziv: req.body.naziv,
                jedinicamjere_JM_SIFRA: req.body.jedinicamjere,
                poreznastopa_pzs_IDprodaja: req.body.poreznastopaprodaja,
                poreznastopa_pzs_IDnabava: req.body.poreznastopanabava,
                pnpgrupe_idpnpgrupe: req.body.idpnpgrupe,
                ar_pnp: req.body.pnp,
                ar_cijena: req.body.cijena || 0,
                ar_prodajni: req.body.prodajni || 0,
                robnagrupa_idrobnagrupa: req.body.robnagrupa,
                //ar_trenutnostanje: req.body.trenutnostanje,
                //ar_nabavnacijena: req.body.nabavnacijena,
                korisnik_idkorisnik_izmjena: req.body.idkorisnik,
                ar_aktivan: aktivan,
                ar_maxrabat: req.body.maxrabat,
                ar_opis: req.body.opis,
                artiklvrsta_idartiklvrsta : req.body.idartiklvrsta
            };      
            let query = "update artikl set ? where idartikl = ? and firma_idfirma = ?"        
            let table =  [artikl, req.body.idartikl, req.body.idfirma];
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
 * @api {post} /artiklObrisi artiklObrisi
 * @apiName artiklObrisi
 * @apiGroup artikl
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {int} idkorisnik
 * @apiParam {int} idartikl
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
artiklObrisi : function(req, res, next){
    try{
        if(req.body.idfirma && req.body.idkorisnik && req.body.idartikl){
            let query = "delete from artikl where idartikl=? and firma_idfirma=?" ;
            let table =  [req.body.idartikl, req.body.idfirma];
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


module.exports = artikli;
