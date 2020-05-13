const mysql = require('mysql');

db = mysql.createConnection({
    host: '92.249.44.52',
    user: 'u830364575_portfolio_user',
    password: 'matias96',
    database: 'u830364575_portfolio',

});
db.connect(function(error) {
    if (error) {
        throw error;
    } else {
        console.log('Conexion correcta.');
    }
});