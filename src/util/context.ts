import {IUser, userModel as User} from "../models/user"
import bcrypt from "bcrypt"

export const verifyUser = async (req) => {
    req.user = null;

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        throw new Error('Please provide login name and password');
    }
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    const user = await authenticate({email, password});
    if (!user) {
        console.log('user cannot be found')
        throw new Error('Invalid email or password');
    }

    // attach user to request object
    req.user = user

}

async function authenticate({email, password}) {
    const user: IUser = await User.findOne({email});
    //if password is encrypted then check with encrypted password
    const isPasswordValid = await bcrypt.compare(password, user['password']);
    if (user && isPasswordValid) {
        const {id, name, email} = user;
        return {id, name, email}
    }
    return null;
}