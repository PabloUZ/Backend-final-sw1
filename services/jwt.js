import jwt from "jwt-simple"
import moment from "moment"
const secret = "clave_secreta"


const generateToken = (user) => {
	const payload = {
		id: user._id,
		name: user.name,
		lastname: user.lastname,
		email: user.email,
		avatar: user.avatar,
		address: user.address,
		role: user.role,
		iat: moment().unix(),
		exp: moment().add(1, "day").unix()
	}

	return jwt.encode(payload, secret)
}


export {
	secret,
	generateToken
}