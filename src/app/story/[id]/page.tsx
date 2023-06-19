
"use client"
import useSWR, { Fetcher }  from 'swr'
import { HackerStory, User } from '@/types';
import Link from 'next/link'
import {fetcherStory, fetcherUser} from '@/services/fetchers'


function getSlug(context: any) {
    const id = context.params.id;
    return id;
}

export default async function Story(context: any) {
  const slug = getSlug(context);  
  const { data: story, error: isErrorStory, isLoading: isLoadingStory } = useSWR(`${process.env.HACKER_API}/item/${slug}.json`, fetcherStory);
  const { data: user, error, isLoading } = useSWR<User>(story ? [`${process.env.HACKER_API}/user/${story && story.by}.json`, story]: null, fetcherUser);

  if(isLoading || isLoadingStory) return <div className="flex h-screen items-center justify-center font-extrabold">Loading</div>;
  if(error || isErrorStory) return <div className="text-red-900 flex h-screen items-center justify-center font-extrabold">Error</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {!!story && 
          (<div className='border-2 rounded-xl border-gray-400 my-2 w-1/2 p-6 cursor-pointer' 
            key={story.id}>
            <h3>{'Title: ' + story.title}</h3>
            <p>{'id: ' + story.id}</p>
            <p>{'time: ' + story.time}</p>
            <p>{'karma: ' + user?.karma}</p>
            <Link href="/" className='my-2'><span className='text-slate-950 rounded-xl  p-2 border-2 border-gray-400 inline-block'>Back</span></Link>
        </div>)
        }

          
    </main>
  )
}
