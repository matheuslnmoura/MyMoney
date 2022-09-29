import bcrypt from 'bcrypt';

const encryptionUtil = {
	encryptPassword
};

export default encryptionUtil;

function encryptPassword(password: string) {
	const salt = 12;
	return bcrypt.hashSync(password, salt);
}