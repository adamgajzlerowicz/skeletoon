import jwt from 'jsonwebtoken';

const decode = (token) => {
    try {
        return jwt.verify(token, process.env.HASH);
    } catch (__) {
        throw new Error('Incorrect token');
    }
};

const withAuth = authed => (_, args, context, ...rest) => {
    if (!context.token) {
        throw new Error('Token is missing');
    }

    const result = decode(context.token);

    const { username, email, id } = result;

    if (!username || !email || !id) {
        throw new Error('Incorrect token');
    }

    return authed(_, args, { ...context, user: { username, email, id } }, ...rest);
};


const getToken = ({ username, email, id }) => ({
    token: jwt.sign({ username, email, id }, process.env.HASH, {
        expiresIn: 60 * 10, // expires in 10 minutes
    }),
    refresh: jwt.sign({ username, email, id }, process.env.HASH, {
        // add to tokens array
        expiresIn: 60 * 60 * 24 * 31, // expires in 31 days
    }),
    ttl: 60 * 10,
});

export {
    getToken, withAuth, decode,
};
