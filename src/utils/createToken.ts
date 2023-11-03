import jwt from 'jsonwebtoken';

const secret = process.env.JWT_TOKEN_SECRET || '';
export const creationToken = (id: string) => {
	const payload = { id };
	const token = jwt.sign(payload, secret, {
		expiresIn: '1h',
	});

	return token;
};
