import crypto from 'crypto';

export const authentication = (salt: string, password: string) =>{
    return crypto.createHmac('sha256',[salt,password].join('/')).update(process.env.SECRET_KEY!).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');