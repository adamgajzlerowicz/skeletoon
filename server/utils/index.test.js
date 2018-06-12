import { validateEmail, isStrongPassword } from './index';

test('passes email', () => {
    expect(validateEmail('foo@gmail.com')).toBe(true);
});

test('fails email', () => {
    expect(validateEmail('nelf86gmail.com')).toBe(false);
});

test('passes complex password', () => {
    expect(isStrongPassword('567%@#fdhDFGDF')).toBe(true);
});

test('fails complex password', () => {
    expect(isStrongPassword('567')).toBe(false);
});
