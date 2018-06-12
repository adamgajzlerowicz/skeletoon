import {
    withAuth,
    getToken,
    resolvers,
} from './index';
import jwt from 'jsonwebtoken';

test('get token', () => {
    const username = 'foo';
    const email = 'bar';

    const result = getToken({ username, email });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('refresh');
    expect(result).toHaveProperty('ttl');
});

test('token decodable', () => {
    const username = 'foo';
    const email = 'bar';
    const result = getToken({ username, email });

    expect(jwt.verify(result.token, process.env.HASH)).toHaveProperty('email');
    expect(jwt.verify(result.token, process.env.HASH).email).toBe(email);
    expect(jwt.verify(result.token, process.env.HASH).username).toBe(username);
    expect(jwt.verify(result.refresh, process.env.HASH).email).toBe(email);
    expect(jwt.verify(result.refresh, process.env.HASH).username).toBe(username);
});

test('withAuth', () => {
    const spy = jest.fn();

    const result = withAuth(spy)(null, null, {});
    console.log(result);
    // expect(spy).toHaveBeenCalled();

});
