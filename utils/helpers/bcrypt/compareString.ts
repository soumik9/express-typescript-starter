import bcrypt from 'bcrypt';

export default async (comparableString: string, hashValue: string): Promise<boolean> => {
    const isMatched = await bcrypt.compare(comparableString, hashValue);
    return isMatched;
};