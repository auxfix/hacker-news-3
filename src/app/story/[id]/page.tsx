
"use client"
import useSWR, { Fetcher }  from 'swr'
import { HackerStory } from '@/types';
import Link from 'next/link'
const fetcher: Fetcher<any, string> = (...args) => fetch(...args).then(res => res.json())

function useStory (id:string) {
    const { data, error, isLoading } = useSWR(`${process.env.HACKER_API}/item/${id}.json`, fetcher);

    return {
      story: data,
      isLoadingStory: isLoading,
      isErrorStory: error
    }
  }

function useUserAndStory (id:string) {
    const { story, isLoadingStory, isErrorStory} = useStory(id as string);
    const { data, error, isLoading } = useSWR<HackerStory>(`${process.env.HACKER_API}/user/${story && story.by}.json`, fetcher);

    if(!(isLoading || isLoadingStory) && data) story.karma = data.karma;

    return {
        userAndStory: story,
        isLoading: isLoading || isLoadingStory,
        isError: error || isErrorStory
    }
}

function getSlug(context: any) {
    const id = context.params.id;
    return id;
}

export default async function Story(context: any) {
  const slug = getSlug(context);  
  const { userAndStory, isLoading, isError } = useUserAndStory(slug);

  if(isLoading) return <div className="flex h-screen items-center justify-center font-extrabold">Loading</div>;
  if(isError) return <div className="text-red-900 flex h-screen items-center justify-center font-extrabold">Error</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {!!userAndStory && 
          (<div className='border-2 rounded-xl border-gray-400 my-2 w-1/2 p-6 cursor-pointer' 
            key={userAndStory.id}>
            <h3>{'Title: ' + userAndStory.title}</h3>
            <p>{'id: ' + userAndStory.id}</p>
            <p>{'time: ' + userAndStory.time}</p>
            <p>{'karma: ' + userAndStory.karma}</p>
            <Link href="/" className='my-2'><span className='text-slate-950 rounded-xl  p-2 border-2 border-gray-400 inline-block'>Back</span></Link>
        </div>)
        }

          
    </main>
  )
}
