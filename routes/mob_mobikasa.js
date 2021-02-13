var mysql       = require('mysql');
var apiToken    = require('api-token');
var pool        = require('../connection');
var log_prijava = require('./log_prijava.js');
var funkcije    = require('./funkcije.js');

function pushing(a,b){
	a.push(b);
}

var tableman = {
    
/*
za uspješnu prijavu potrebno je da postoje korisnik u tablici operater ali također je potrebno da postoji poslovnica za firmu iz koje je operater
*/


    /**
 * @api {post} /fiskal_prijava Fiskal prijava
 * @apiName Fiskal prijava
 * @apiGroup Fiskal
 * @apiVersion 0.0.1
 * @apiParam {int} idfirma
 * @apiParam {varchar{6}} korime
 * @apiParam {varchar{6}} lozinka
 * @apiParam {varchar{50}} uuid
 * @apiParam {varchar{50}} model
 * @apiParam {varchar{50}} manufacturer
 * @apiParam {varchar{500}} [devicetoken]
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

prijava: function(req, res, next){	
    console.log('/prijava');
    function f_login(a, callback){
        let firma = req.body.idfirma || null;
        //var query = "CALL loginFiskal(?,?,?,?,?,?)";
        //var table = [req.body.korime, req.body.lozinka , firma, req.body.uuid, req.body.manufacturer, req.body.model];
        var query = "CALL loginMobilna(?,?,?,?,?,?,?)";
        var table = [req.body.korime, req.body.lozinka , firma, req.body.uuid, req.body.manufacturer, req.body.model, req.body.devicetoken || null];
        query = mysql.format(query, table);        
        funkcije.mysql_queryV2(query, function(podaci){
            console.log(podaci)
            if(podaci.success != true){
                callback(podaci.success, podaci.message, podaci.status, podaci.data)
            }else{
                //callback(podaci.success, podaci.data);
                if(podaci.data[0].rezultat == 2) {
                    var firmaaa = podaci.data[0].idfirma;
                    var user = apiToken.addUser(req.body.korime+'tableman');
                    podaci.data[0].token = user.token;
                    /* dohvaća samo one poslovnice koje nemaju dodan naplatni uređaj za tu firmu */
                    //connection.query('SELECT poslovnica.idposlovnica as  idposlovnica, poslovnica.po_sifra as  sifra, poslovnica.po_naziv as naziv, poslovnica.po_adresa as adresa, poslovnica.po_mjesto as mjesto, poslovnica.firma_idfirma as idfirma FROM poslovnica inner join uredjaj on poslovnica.idposlovnica = uredjaj.poslovnica_idposlovnica where poslovnica.firma_idfirma  = ? and uredjaj.ur_uuid = ?', [firmaaa, req.body.uuid],
                    callback(true, 'Uspješno', false, podaci)
                    log_prijava.prijava('MOB',req.body.uuid, req.body.korime, 1, req, function(rezultat, podaci){/*console.log('Upisivanje prijave:'+rezultat, podaci);*/});
                }else if(podaci.data[0].rezultat == 1){
                    callback(888, 'Prijava neuspješna, uredjaj nije autoriziran!', true, podaci.data);
                    log_prijava.prijava('MOB',req.body.uuid, req.body.korime, 0, req, function(rezultat, podaci){/*console.log('Upisivanje prijave:'+rezultat, podaci);*/});
                }else if(podaci.data[0].rezultat == 1.5){
                    callback(777, 'Prijava neuspješna, uredjaj nema poslovni prostor!', true, podaci.data);
                    log_prijava.prijava('MOB',req.body.uuid, req.body.korime, 0, req, function(rezultat, podaci){/*console.log('Upisivanje prijave:'+rezultat, podaci);*/});
                
                }else if(podaci.data[0].rezultat == 1.7){
                    callback(776, 'Prijava neuspješna, uredjaj nema naplatnibroj!', true, podaci.data);
                    log_prijava.prijava('MOB',req.body.uuid, req.body.korime, 0, req, function(rezultat, podaci){/*console.log('Upisivanje prijave:'+rezultat, podaci);*/});
                }else {
                    callback(false, 'Prijava neuspješna, nije pronađen korisnik s poslanim podacima!', true, podaci.data);
                    log_prijava.prijava('MOB',req.body.uuid, req.body.korime, 0, req, function(rezultat, podaci){/*console.log('Upisivanje prijave:'+rezultat, podaci);*/});
                }
            }
        });
    }

    try{
        if(req.body.korime && req.body.lozinka && req.body.uuid && req.body.model && req.body.manufacturer){
            f_login(req.body, function(rezultat, poruka, cekam_autorizaciju, podaci){
                if(rezultat == true){
                    funkcije.posaljiRes(res,{ success: true, message: poruka, status: rezultat, data:podaci, cekam_autorizaciju:cekam_autorizaciju });
                }else{
                    funkcije.posaljiRes(res,{ success: false, message: poruka, status: rezultat, data:podaci, cekam_autorizaciju:cekam_autorizaciju });
                }
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[], cekam_autorizaciju: true });
        }
    }catch(err){
        console.log(err);
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err, cekam_autorizaciju: true });
    }

},

/**
 * @api {post} /fiskal_podaci_sync Fiskal sync
 * @apiName Fiskal sync
 * @apiGroup Fiskal
 * @apiVersion 0.0.1
 * @apiParam {int} idkorisnik koji se prijavio na mobilni uredjaj
 * @apiParam {varchar{50}} uuid
 * @apiParam {int} zadnjiidartikla 
 * @apiParam {varchar{50}} imetablice usluge, tipplovila, cjenik, porez
 * @apiParam {varchar{1}} podaciza  U ili I
 * @apiParam {varchar{50}} [verzija] mobilne aplikacije 
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

podaci_sync : function(req, res, next){   
    try{
        if(req.body.idkorisnik && req.body.uuid && req.body.imetablice && req.body.podaciza){
            let verzija = a.verzija || null;
            if(typeof(verzija)=='string'){verzija = verzija.substr(0, 10)};
            let zadnjiidartikla = a.zadnjiidartikla || 0;
            let query = "CALL mobilnaPodaciZaInsert(?,?,?,?,?)"
            if(a.podaciza =="U"){
                query = "CALL mobilnaPodaciZaUpdate(?,?,?,?,?)";
            }
            let table = [a.uuid, zadnjiidartikla, a.imetablice, a.idkorisnik, verzija];
            query = mysql.format(query,table);
            funkcije.mysql_queryV2(query, function(podaci){
                funkcije.posaljiRes(res, podaci);
            })
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
        }
    }catch(err){
        console.log(err);
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }
},


/**
 * @api {post} /fiskal_podaci_sync_potvrda Fiskal podaci sync potvrda
 * @apiName Fiskal podaci sync potvrda
 * @apiGroup Fiskal
 * @apiVersion 0.0.1
 * @apiParam {int} idkorisnik koji se prijavio na mobilni uredjaj
 * @apiParam {varchar{50}} uuid
 * @apiParam {varchar{50}} imetablice usluge, tipplovila, cjenik, porez
 * @apiParam {varchar{1}} podaciza  U ili I
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

podaci_sync_potvrda : function(req, res, next){   
    //console.log('/artikli');
    function f_artikli(a, callback){
        var query = "update uredjajsinkronizacija set us_potvrda = 1 where us_uredjaj_ur_uuid =? and us_tablica =?  and us_akcija = ? order by iduredjajsinkronizacija desc limit 1;";  
        var table = [a.uuid, a.imetablice, a.podaciza];
        query = mysql.format(query,table);
        //console.log(query);
        funkcije.mysql_query(query, function(podaci){
            callback(podaci.success, podaci.data)
        })
    }

    try{
        if(req.body.uuid && req.body.imetablice && req.body.podaciza){
            f_artikli(req.body, function(rezultat, podaci){
                if(rezultat == true){
                    funkcije.posaljiRes(res,{ success: true, message: 'Uspješan dohvat', status: rezultat, data:podaci });
                }else{
                    funkcije.posaljiRes(res,{ success: false, message: 'Greška konekcije ili baze', status: rezultat, data:podaci });
                }
            });
        }else{
            funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 502, data:[] });
        }
    }catch(err){
        console.log(err)
        funkcije.posaljiRes(res,{ success: false, message: 'Greška, provjerite podatke koje šaljete.', status: 503, data:err });
    }
}  

};


module.exports = tableman;
