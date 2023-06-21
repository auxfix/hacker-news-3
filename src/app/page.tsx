import NewsApi from '@/services/api/news';
import { HackerStory } from '@/types';
import Link from 'next/link';

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
  const news = (await getListOfNews());

  return (
    <main className="flex w-full flex-col items-center justify-between p-24">
        { news.map(n => (
          <Link key={n.id} className='w-full' href={`story/${n.id}`}><div
              className='border-2 rounded-xl border-gray-400 my-2 w-full p-6 cursor-pointer' 
              key={n.id}>
              <h3>{'Title: ' + n.title}</h3>
              <p>{'id: ' + n.id}</p>
              <p>{'time: ' + n.time}</p>
            </div>
          </Link>
          )
        )
          
       }
    </main>
  )
}
