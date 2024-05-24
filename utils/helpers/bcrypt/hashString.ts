import bcrypt from 'bcrypt';
import { config } from '../../server';

export default async (string: string): Promise<string> => {
    const hashedString = await bcrypt.hashSync(string, Number(config.BYCRYPT_SALT_ROUND));
    return hashedString;
};