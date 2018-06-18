import bcrypt from 'bcrypt';
import { User, Company } from './models';

Company.sync({ force: true }).then(() => {
    Company.create({
        name: 'dupa',
        childrenLimit: 20,
        firstHourRate: 20.50,
        hourRate: 10,
    });

    Company.create({
        name: 'Another company',
        childrenLimit: 3,
        firstHourRate: 20,
        hourRate: 20,
    });

});


User.sync({ force: true }).then(() => {
    const hash = bcrypt.hashSync('123', 10);
    const anotherHash = bcrypt.hashSync('123', 10);

    User.create({
        username: 'adam',
        password_hash: hash,
        email: 'nelf86@gmail.com',
        companyId: 1,
    });

    User.create({
        username: 'nelf87',
        password_hash: anotherHash,
        email: 'foo@bar.com',
        companyId: 1,
    });
});

