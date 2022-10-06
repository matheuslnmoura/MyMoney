import { faker } from '@faker-js/faker';
const user = (valid) => {
    return {
        name: !valid ? faker.datatype.string(2) : faker.name.fullName(),
        email: !valid ? faker.datatype.string() : faker.internet.email(),
        password: !valid ? faker.internet.password(3) : faker.internet.password(),
        birthday: !valid ?
            faker.date.birthdate({ min: 150, max: 200, mode: 'age' })
            :
                faker.date.birthdate({ min: 10, max: 100, mode: 'age' })
    };
};
export const userFactory = {
    user
};
export default userFactory;
