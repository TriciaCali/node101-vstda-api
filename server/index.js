const server = require('./app');

// write your code here
//tell app to listen for network reqest on port 8484

server.listen(8484, function() {
    console.log('Server is listening on http://localhost:8080');
})