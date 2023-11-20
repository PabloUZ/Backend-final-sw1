import jwt from 'jwt-simple'
import moment from 'moment';
import { secret } from "../services/jwt.js";



const auth = (req, res, next) => {
	if (!req.headers.authorization){
		return res.status(403).json({
			status: 403,
			type: "error",
			message: "Couldn't find authorization header"
		});
	}

	let token = req.headers.authorization.replace(/['"]+/g, '');
	try{
		const payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()){
			return res.status(404).json({
				status: 404,
				type: "error",
				message: "Token expired"
			});
		}
		req.body.payload = payload
		next()
	}
	catch (e){
		return res.status(404).json({
			status: 404,
			type: "error",
			message: "Token is not valid",
			e
		});
	}
}


export default auth;