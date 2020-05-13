const bcrypt = require('bcrypt');

let password = bcrypt.hashSync('matias', 9);
console.log(password);