
import NewsApi from '@/services/api/news';
import { HackerStory } from '@/types';
import Link from 'next/link'

async function getStory(id: string | string[] | undefined): Promise<HackerStory> {
  const newsApi = new NewsApi();
  
  const story  = await newsApi.getHackerStory(id as string);
  const user  = await newsApi.getUser(story.by as string);
  story.karma = user.karma;

  return story;
}

function getSlug(context: any) {
    const id = context.params.id;
    return id;
}

export default async function Story(context: any) {
  const slug = getSlug(context);
  const story = (await getStory(slug));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className='border-2 rounded-xl border-gray-400 my-2 w-1/2 p-6 cursor-pointer' 
                key={story.id}>
                <h3>{'Title: ' + story.title}</h3>
                <p>{'id: ' + story.id}</p>
                <p>{'time: ' + story.time}</p>
                <p>{'karma: ' + story.karma}</p>
                <Link href="/" className='my-2'><span className='text-slate-950 rounded-xl  p-2 border-2 border-gray-400 inline-block'>Back</span></Link>
          </div>
          
    </main>
  )
}
