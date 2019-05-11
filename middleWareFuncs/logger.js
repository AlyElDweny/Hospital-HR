function log(req, res, next){
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log('logging...');
     next();
}
module.exports = log;