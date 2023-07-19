import { UserState } from "@/app/store/features/userSlice";
import { faker } from "@faker-js/faker";

export const LoginFakeData = {
  validCredentials: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },

  invalidCredentials: {
    email: faker.person.fullName(),
    password: faker.airline.aircraftType(),
  },

  invalidEmail: faker.person.fullName(),
  invalidPassword: faker.person.fullName(),
};

export const RegisterFakeData = {
  name: faker.person.fullName(),
  email: faker.internet.email(),

  userData: {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  },
};

export function createUser(): UserState {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
  };
}

export const mockUserList: UserState[] = faker.helpers.multiple(createUser, {
  count: 5,
});
