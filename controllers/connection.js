
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://angular:angular@ds151820.mlab.com:51820/myname');

var userregisterSchema = mongoose.Schema({
	name: String,
    email: String,
    username:String,
    password:String,
    file:String,
   
});


var user = mongoose.model("register",userregisterSchema);
module.exports = user;