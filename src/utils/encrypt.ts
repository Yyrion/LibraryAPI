import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export async function hashPassword(password: string): Promise<string> {
    const saltHex = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, saltHex, 32)) as Buffer;

    return `${saltHex}.${hash.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, storedHash] = stored.split('.');
  if (!saltHex || !storedHash) return false;
  const hash = (await scrypt(password, saltHex, 32)) as Buffer;
  return hash.toString('hex') === storedHash;
}