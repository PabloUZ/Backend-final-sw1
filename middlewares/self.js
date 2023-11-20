const self = (req, res, next) => {
	const payload = req.body.payload
	if(payload.email !== req.params.mail){
		return res.status(401).json({
			status: 401,
			type: "error",
			message: "Invalid session"
		});
	}
	next();
}


export default self;