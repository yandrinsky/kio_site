import crypto from 'crypto';
// Функция для шифрования данных

export const encrypt = (text: string) => {
    let cipher = crypto.createCipheriv(
        'aes-256-cbc',
        Buffer.from(process.env.KEY as string, 'hex'),
        Buffer.from(process.env.IV as string, 'hex')
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
};

// Функция для дешифрования данных
export const decrypt = (text: string) => {
    let iv = Buffer.from(process.env.IV as string, 'hex');
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.KEY as string, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
