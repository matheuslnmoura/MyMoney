import bcrypt from 'bcrypt';

const encryptionUtil = {
	encryptPassword,
	comparePassword
};

export default encryptionUtil;

function encryptPassword(password: string) {
	const salt = 12;
	return bcrypt.hashSync(password, salt);
}

function comparePassword(password: string, hashPassword: string) {
	const isCorrectPassword = bcrypt.compareSync(password, hashPassword);
	if (!isCorrectPassword) {
		throw {code: 401, message: {password: 'Incorrect email or password.'}};
	}
	return;
}