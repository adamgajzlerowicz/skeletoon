import jwt from 'jsonwebtoken';
import { withAuth, getToken } from './helpers';
import * as index from './index';

const { resolvers } = index;

test('get token', () => {
    const username = 'foo';
    const email = 'bar';
    const id = 'le';

    const result = getToken({ username, email, id });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('refresh');
    expect(result).toHaveProperty('ttl');
});

test('token decodable', () => {
    const username = 'foo';
    const email = 'bar';
    const id = 'le';

    const result = getToken({ username, email, id });

    expect(jwt.verify(result.token, process.env.HASH)).toHaveProperty('email');
    expect(jwt.verify(result.token, process.env.HASH).email).toBe(email);
    expect(jwt.verify(result.token, process.env.HASH).username).toBe(username);
    expect(jwt.verify(result.refresh, process.env.HASH).email).toBe(email);
    expect(jwt.verify(result.refresh, process.env.HASH).username).toBe(username);
    expect(jwt.verify(result.refresh, process.env.HASH).id).toBe(id);
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
    const id = 'le';

    const tokenData = getToken({ username, email, id });
    const spy = jest.fn();
    withAuth(spy)('a', 'b', { token: tokenData.token, c: 'c' }, 'd', 'e');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
        'a',
        'b',
        { token: tokenData.token, user: { username, email, id }, c: 'c' },
        'd',
        'e',
    );
});

test('resolvers are defined', () => {
    expect(resolvers(() => null).Query.users).toBeDefined();
    expect(resolvers(() => null).Mutation.login).toBeDefined();
    expect(resolvers(() => null).Mutation.createUser).toBeDefined();
});

test('user resolver uses auth interceptor', () => {
    const spy = () => 'blah';
    expect(resolvers(spy).Query.users).toBe('blah');
});

test('me resolver uses auth interceptor', () => {
    const spy = () => 'blah';
    expect(resolvers(spy).Query.me).toBe('blah');
});
