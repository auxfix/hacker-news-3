
"use client"
import useSWR, { Fetcher }  from 'swr'
import { HackerStory, User } from '@/types';
import Link from 'next/link'
import { useGetStory } from '@/common/hooks';


function getStoryId(context: any) {
    const id = context.params.id;
    return id;
}

export default async function Story(context: any) {
  const storyId = getStoryId(context);

  const [storyWithUser, isLoading, isError] = useGetStory(storyId);
  
  if(isLoading) return <div className="flex h-screen items-center justify-center font-extrabold">Loading</div>;
  if(isError) return <div className="text-red-900 flex h-screen items-center justify-center font-extrabold">Error</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {!!storyWithUser && 
          (<div className='border-2 rounded-xl border-gray-400 my-2 w-1/2 p-6 cursor-pointer' 
            key={storyWithUser.id}>
            <h3>{'Title: ' + storyWithUser.title}</h3>
            <p>{'id: ' + storyWithUser.id}</p>
            <p>{'time: ' + storyWithUser.time}</p>
            <p>{'karma: ' + storyWithUser?.karma}</p>
            <Link href="/" className='my-2'><span className='text-slate-950 rounded-xl  p-2 border-2 border-gray-400 inline-block'>Back</span></Link>
        </div>)
        }

          
    </main>
  )
}
