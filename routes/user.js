var express = require('express');
var router = express.Router();
var controller=require('../controllers/method');
var bodyparser=require("body-parser");
var urlencodedparser=bodyparser.urlencoded({extended:false});
router.post('/register', function(req, res) {
    // console.log(req.body);
    controller.getuserdetailes(req,res);
})
router.post('/login', function(req, res) {
 console.log(req.body.password);
    controller.getlogin(req,res);

});
module.exports = router;
