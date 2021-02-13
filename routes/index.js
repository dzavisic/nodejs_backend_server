var express 		= require('express');
var router 			= express.Router();

var postavke 		= require('./postavke.js');
var firma 			= require('./firma.js');
var poslovnica		= require('./poslovnica.js');
var korisnik 		= require('./korisnik.js');
var jedinicamjere 	= require('./jedinicamjere.js');
var robnagrupa		= require('./robnagrupa.js');
var artikl			= require('./artikl.js');
var artiklvrsta 	= require('./artiklvrsta.js');
var partner 		= require('./partner.js');
var partnerposlovnica 	= require('./partnerposlovnica.js');
var pocetna 		= require('./pocetna.js');
var izvjestaj		= require('./izvjestaj.js');
var prijavaweb 		= require('./prijavaweb.js');
var fiskalmobikasa 	= require('./mob_mobikasa.js');
var fiskalweb 		= require('./mob_web.js');
var cjenik 			= require('./cjenik.js');
var porez 			= require('./porez.js');
var poreznastopa 	= require('./poreznastopa.js');


/***** firma ********/
router.post('/api/firma', 			firma.firma);
router.post('/api/firmaUredi', 		firma.firmaUredi);

/***** pocetna  ********/
router.post('/api/pocetna', 		pocetna.pocetna);

/***** prijavaweb *****/
router.post('/api/prijavaweb', 		prijavaweb.prijavaweb);

/***** jedinicamjere *****/
router.post('/api/jedinicamjerePopis',jedinicamjere.jedinicamjerePopis);

/***** robnagrupa ********/
router.post('/api/robnagrupa', 		robnagrupa.robnagrupa);
router.post('/api/robnagrupaPopis', robnagrupa.robnagrupaPopis);
router.post('/api/robnagrupaDodaj', robnagrupa.robnagrupaDodaj);
router.post('/api/robnagrupaUredi',	robnagrupa.robnagrupaUredi);
router.post('/api/robnagrupaObrisi',robnagrupa.robnagrupaObrisi);

/***** artikl ********/
router.post('/api/artikl', 			artikl.artikl);
router.post('/api/artiklPopis', 	artikl.artiklPopis);
router.post('/api/artiklDodaj', 	artikl.artiklDodaj);
router.post('/api/artiklUredi', 	artikl.artiklUredi);
router.post('/api/artiklObrisi', 	artikl.artiklObrisi);

/***** cjenik ********/
router.post('/api/cjenik',			cjenik.cjenik);
router.post('/api/cjenikPopis', 	cjenik.cjenikPopis);
router.post('/api/cjenikDodaj', 	cjenik.cjenikDodaj);
router.post('/api/cjenikUredi', 	cjenik.cjenikUredi);
router.post('/api/cjenikObrisi', 	cjenik.cjenikObrisi);

/***** porez ********/
router.post('/api/porez',			porez.porez);
router.post('/api/porezPopis', 		porez.porezPopis);
router.post('/api/porezDodaj', 		porez.porezDodaj);
router.post('/api/porezUredi', 		porez.porezUredi);
router.post('/api/porezObrisi', 	porez.porezObrisi);

/***** poreznastopa ********/
router.post('/api/poreznastopaPopis', 	poreznastopa.poreznastopaPopis);

/***** artiklvrsta ********/
router.post('/api/artiklvrsta', 		artiklvrsta.artiklvrsta);
router.post('/api/artiklvrstaPopis', 	artiklvrsta.artiklvrstaPopis);
router.post('/api/artiklvrstaDodaj', 	artiklvrsta.artiklvrstaDodaj);
router.post('/api/artiklvrstaUredi', 	artiklvrsta.artiklvrstaUredi);
router.post('/api/artiklvrstaObrisi', 	artiklvrsta.artiklvrstaObrisi);

/***** korisnik ********/
router.post('/api/korisnik', 		korisnik.korisnik);
router.post('/api/korisnikPopis', 	korisnik.korisnikPopis);
router.post('/api/korisnikDodaj', 	korisnik.korisnikDodaj);
router.post('/api/korisnikUredi', 	korisnik.korisnikUredi);
router.post('/api/korisnikObrisi', 	korisnik.korisnikObrisi);

/***** poslovnica ********/
router.post('/api/poslovnica', 		poslovnica.poslovnica);
router.post('/api/poslovnicaPopis', poslovnica.poslovnicaPopis);
router.post('/api/poslovnicaDodaj',	poslovnica.poslovnicaDodaj);
router.post('/api/poslovnicaUredi', poslovnica.poslovnicaUredi);
router.post('/api/poslovnicaObrisi',poslovnica.poslovnicaObrisi);

/***** partner ********/
router.post('/api/partner', 	 	partner.partner);
router.post('/api/partnerPopis', 	partner.partnerPopis);
router.post('/api/partnerDodaj', 	partner.partnerDodaj);
router.post('/api/partnerUredi', 	partner.partnerUredi);
router.post('/api/partnerUredi', 	partner.partnerObrisi);

/***** partnerposlovnica ********/
router.post('/api/partnerposlovnica',			partnerposlovnica.partnerposlovnica);
router.post('/api/partnerposlovnicaPopis', 		partnerposlovnica.partnerposlovnicaPopis);
router.post('/api/partnerposlovnicaDodaj', 	partnerposlovnica.partnerposlovnicaDodaj);
router.post('/api/partnerposlovnicaUredi', 		partnerposlovnica.partnerposlovnicaUredi);
router.post('/api/partnerposlovnicaObrisi', 	partnerposlovnica.partnerposlovnicaObrisi);

/***** izvjestaj ********/
router.post('/api/izvjestaj', 		izvjestaj.izvjestaj);

/***********************************
		MOB_WEB
*****************************************/
router.post('/api/uredjaj', 		fiskalweb.uredjaj);
router.post('/api/uredjajPopis', 	fiskalweb.uredjajPopis);
router.post('/api/uredjajuredi', 	fiskalweb.uredjajUredi);

/***********************************
		MOB
*****************************************/
router.post('/api/fiskal_prijava', 				fiskalmobikasa.prijava); 
router.post('/api/fiskal_podaci_sync', 			fiskalmobikasa.podaci_sync); 
router.post('/api/fiskal_podaci_sync_potvrda', 	fiskalmobikasa.podaci_sync_potvrda);

module.exports = router;
