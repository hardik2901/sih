const express = require('express');
const path = require('path');
const app = express();
var multer = require('multer')

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.get('/', function (req, res) {
    res.sendFile('/Users/newuser/Desktop/playground/image.JPG');
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), function (req, res, next) {
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
})

app.listen(5050, console.log('App listening on port 5050'));
