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


test('should throw when no token passed', () => {
    const spy = jest.fn();
    const getWithAuth = () => withAuth(spy)(null, null, {});
    expect(getWithAuth).toThrow('Token is missing');
});

test('should throw when incorrect token is passed', () => {
    const spy = jest.fn();
    const getWithAuth = () => withAuth(spy)(null, null, { token: 'blah' });
    expect(getWithAuth).toThrow('Incorrect token');
});

test('should return decoded token along with rest of the data', () => {
    const username = 'foo';
    const email = 'bar';

    const tokenData = getToken({ username, email });
    const spy = jest.fn();
    withAuth(spy)('a', 'b', { token: tokenData.token, c: 'c' }, 'd', 'e');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
        'a',
        'b',
        { token: tokenData.token, user: { username, email }, c: 'c' },
        'd',
        'e',
    );
});
