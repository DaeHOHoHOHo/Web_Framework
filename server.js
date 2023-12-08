var mongoose = require('mongoose');
var express = require('express'),
    config = require('./server/configure'),
    app = express();
var Image = require('./models/image'); // Image 모델 가져오기


app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);

mongoose.connect('mongodb://localhost/imgPloadr');
mongoose.connection.on('open', function() {
    console.log('Mongoose connected.');
});

app.get('/', function(req, res) {
    Image.find({}).lean().exec(function(err, images) {
        if (err) {
            res.status(500).send('Error occurred: database error.');
        } else {
            res.render('index', { images: images });
        }
    });
});

var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});


