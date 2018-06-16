import bcrypt from 'bcrypt';
import User from './models/user';

// sync resets the db
User.sync({ force: true }).then(() => {
    bcrypt.hash('123', 10, (err, hash) => {
        User.create({
            username: 'adam',
            password_hash: hash,
            email: 'nelf86@gmail.com',
        });
    });

    bcrypt.hash('00R0%EvBU*4Q%Qdt%84@', 10, (err, hash) => {
        User.create({
            username: 'nelf87',
            password_hash: hash,
            email: 'foo@bar.com',
        });
    });
});

