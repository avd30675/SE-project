const express = require('express');

const router = express.Router();


const loginad=require('../controller/login')
//get admin
const viewclass  = require('../controller/adminget/adminclassroom');
const viewguest = require('../controller/adminget/adminguest');
const viewseminar = require('../controller/adminget/adminhall');
const viewsport = require('../controller/adminget/adminsport');
//create admin
const createclass = require('../controller/admincreate/adminclassroom');
const createguest = require('../controller/admincreate/adminguest');
const createhall =require('../controller/admincreate/adminhall');
const createsport = require('../controller/admincreate/adminsport');
//Delete admin
const deleteclass= require('../controller/admindelete/adminclassroom');
const deleteguest= require('../controller/admindelete/adminguest');
const deletehall= require('../controller/admindelete/adminhall');
const deletesports= require('../controller/admindelete/adminsport');
//updates admin
const updateclass= require('../controller/adminupdate/adminclassroom');
const updateguest= require('../controller/adminupdate/adminguest');
const updatehall= require('../controller/adminupdate/adminhall');
const updatesports= require('../controller/adminupdate/adminsport');

//get user
const uvclass  = require('../controller/user/userget/classroom');
const uvseminar  = require('../controller/user/userget/seminar');
const uvguest  = require('../controller/user/userget/guest');
const uvsports  = require('../controller/user/userget/sports');

//user bookin
const ubclass=require('../controller/user/userbooking/class');
const ubseminar=require('../controller/user/userbooking/seminar');
const ubguest=require('../controller/user/userbooking/guest');
const ubsports=require('../controller/user/userbooking/sports');

 //show details imformation

const class_d=require('../controller/showdetails/classroom');
const seminarhall_d = require('../controller/showdetails/seminarhall');
const sports_d = require('../controller/showdetails/sports');
const guest_d = require('../controller/showdetails/guest');

//show users booking 

const user_bc=require('../controller/user/userbooking/userbookings/class');
const user_bs=require('../controller/user/userbooking/userbookings/seminar');
const user_bg=require('../controller/user/userbooking/userbookings/guest');
const user_bsp=require('../controller/user/userbooking/userbookings/sports');

//updating user booking
const user_cu=require('../controller/user/userbooking/updates/class');
const user_su=require('../controller/user/userbooking/updates/hall');
const user_gu=require('../controller/user/userbooking/updates/guest');
const user_spu=require('../controller/user/userbooking/updates/sports');

//deleting user booking

const user_cd=require('../controller/user/userbooking/userbookingdelete/class');
const user_sd=require('../controller/user/userbooking/userbookingdelete/seminar');
const user_gd=require('../controller/user/userbooking/userbookingdelete/guest');
const user_spd=require('../controller/user/userbooking/userbookingdelete/sports');







router.post('/login', loginad.adminlogin);
//admin routers
//get routers
router.get('/adminget/classroom',viewclass.adminclass);
router.get('/adminget/guest',viewguest.adminguest);
router.get('/adminget/hall',viewseminar.adminhall);
router.get('/adminget/sport',viewsport.adminsport);
//create routers
router.post('/adminput/classroom',createclass.adminclass);
router.post('/adminput/guest',createguest.adminguest);
router.post('/adminput/hall',createhall.adminhall);
router.post('/admin/sport',createsport.adminsports);
//delet routers
router.post('/admindel/classroom',deleteclass.adminclass);
router.post('/admindel/guest',deleteguest.adminguest);
router.post('/admindel/hall',deletehall.adminhall);
router.post('/admindel/sports',deletesports.adminsport);
//update routers
router.post('/adminupd/classroom',updateclass.adminclass);
router.post('/adminupd/guest',updateguest.adminguest);
router.post('/adminupd/hall',updatehall.adminhall);
router.post('/adminupd/sports',updatesports.adminsports);



//user routers
router.get('/userget/classroom',uvclass.userclass);
router.get('/userget/seminarhall',uvseminar.userseminar);
router.get('/userget/guesthouse',uvguest.userguest);
router.get('/userget/sports',uvsports.usersports);


//user booking
router.post('/userget/classroom/booking',ubclass.classbook);
router.post('/userget/seminarhall/booking',ubseminar.seminarbook); 
router.post('/userget/guesthouse/booking',ubguest.guestbook);
router.post('/userget/sports/booking',ubsports.sportbook);

//user booking details
router.post('/userget/classroom/booking/userbookings',user_bc.class);
router.post('/userget/seminarhall/booking/userbookings',user_bs.seminar);
router.post('/userget/guesthouse/booking/userbookings',user_bg.guest);
router.post('/userget/sports/booking/userbookings',user_bsp.sports);

//user showing perticular room details

router.get('/userget/classroom/:classid',class_d.adminclass);
router.get('/userget/seminarhall/:hallid',seminarhall_d.adminhall);
router.get('/userget/sports/:sportsid',sports_d.adminsports);
router.get('/userget/guesthouse/:guestid',guest_d.adminguest);

//updateing booking --error
router.post('/userget/classroom/booking_update',user_cu.class);
router.post('/userget/hall/booking_update',user_su.seminar);
router.post('/userget/guesthouse/booking_update',user_gu.guest); 
router.post('/userget/sports/booking_update',user_spu.sports);

//deleting user booking
router.post('/userget/classroom/bookings_delete',user_cd.class);
router.post('/userget/seminarhall/bookings_delete',user_sd.seminar);
router.post('/userget/guesthouse/bookings_delete',user_gd.guest);
router.post('/userget/sports/bookings_delete',user_spd.sports);

module.exports= router;