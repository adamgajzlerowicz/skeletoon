import bcrypt from 'bcrypt';
import User from './models/user';

// sync resets the db
User.sync({ force: true }).then(() => {
    bcrypt.hash('dupa', 10, (err, hash) => {
        User.create({
            username: 'nelf',
            password: hash,
            email: 'nelf86@gmail.com',
        });
    });

    bcrypt.hash('dupa', 10, (err, hash) => {
        User.create({
            username: 'jh',
            password: hash,
            email: 'foo.bar.com',
        });
    });
});

