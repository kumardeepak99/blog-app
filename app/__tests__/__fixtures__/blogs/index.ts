import { Blog } from "@/app/dashboard/page";
import { faker } from "@faker-js/faker";

export function createBlog(): Blog {
  return {
    id: faker.string.uuid(),
    title: faker.music.songName(),
    description: faker.music.genre(),
    date: faker.date.recent(),
  };
}

export const mockBlogList: Blog[] = faker.helpers.multiple(createBlog, {
  count: 5,
});
