const User = require('../models/user');
const bcrypt = require('bcrypt');
const connection = require('../connection');

console.log(connection);
// User.sync({ force: true }).then(() => {
//     bcrypt.hash('dupa', 10, (err, hash) => {
//         User.create({
//             username: 'nelf',
//             password: hash,
//             email: 'nelf86@gmail.com',
//         });
//     });

//     bcrypt.hash('dupa', 10, (err, hash) => {
//         User.create({
//             username: 'jh',
//             password: hash,
//         });
//     });
// });

