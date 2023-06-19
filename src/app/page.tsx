'use client'

import { useRouter } from 'next/navigation'

import NewsApi from '@/services/api/news';
import { HackerStory } from '@/types';

async function getListOfNews(): Promise<HackerStory[]> {
  const newsApi = new NewsApi();

  const newsIdList = (await newsApi.getTopStories()).slice(0, 10);

  const news =await Promise.all(
    newsIdList.map(async (id) => {
      return await newsApi.getHackerStory(id);
    })
  )
  return news;


}

export default async function Home() {
  const router = useRouter()
  const news = (await getListOfNews());

  const handleClick = (id: number) => {
    router.push(`story/${id}`);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        { news.map(n => (
          <div 
            onClick={() => handleClick(n.id)}
            className='border-2 rounded-xl border-gray-400 my-2 w-1/2 p-6 cursor-pointer' 
            key={n.id}>
            <h3>{'Title: ' + n.title}</h3>
            <p>{'id: ' + n.id}</p>
            <p>{'time: ' + n.time}</p>
          </div>
          )
        )
          
       }
    </main>
  )
}
