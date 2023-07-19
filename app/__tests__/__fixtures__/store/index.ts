import { UserState } from "@/app/store/features/userSlice";
import { faker } from "@faker-js/faker";

export const mockUserData: UserState = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
};
