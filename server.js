var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

function get_line(filename, line_no, callback) {
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");

    if(+line_no > lines.length){
      throw new Error('File end reached without finding line');
    }

    callback(null, lines[+line_no]);
}
setInterval(function(){
	var maxNumberOfSource = 14530;
	var lineNumber = Math.floor(Math.random() * maxNumberOfSource) + 1;
	get_line('source.json', lineNumber, function(err, line){
	  T.post('statuses/update',
	  	{ status: line },
	  	 function(err, data, response) {
	  		console.log(data)
	  });
	})
}, 10000);