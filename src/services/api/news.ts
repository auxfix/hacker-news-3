import API from '@/services/api/common';
import { HackerStory, User } from '@/types';

export default class News extends API {
  constructor() {
    super(process.env.HACKER_API);
  }

  async getUser(id: string): Promise<User> {
    return this.doFetch(`user/${id}.json`);
  }

  async getTopStories(): Promise<Array<string>> {
    return this.doFetch(`topstories.json`);
  }

  async getHackerStory(id: string): Promise<HackerStory> {
    return this.doFetch(`item/${id}.json`);
  }
}