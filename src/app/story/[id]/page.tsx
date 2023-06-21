
"use client"
import Link from 'next/link'
import { useGetStory } from '@/common/hooks';
import './styles.css';


function getStoryId(context: any) {
    const id = context.params.id;
    return id;
}

export default async function Story(context: any) {
  const storyId = getStoryId(context);

  const [storyWithUser, isLoading, isError] = useGetStory(storyId);
  
  if(isLoading) return <div className="story-loading">Loading</div>;
  if(isError) return <div className="story-error">Error</div>;

  return (
    <main className="story-conainer">
        {!!storyWithUser && 
          (<div className='story' 
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
