
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
          (<div className='story flex' 
            key={storyWithUser.id}>
              <img className='story__img mr-3' src="https://placehold.co/600x600?text=Fancy+Image"></img>
              <div className='flex flex-col justify-between w-full'>
                <p><span className='story__id'>{'id: '}</span>{storyWithUser.id}</p>
                <a className='story__title' target="_blank" href={storyWithUser.url}>{storyWithUser.title}</a>
                <p><span className=''>{'karma: '}</span>{storyWithUser?.karma}</p>
                <div className = 'flex'>
                  <Link href="/" className='my-2 flex-1'>
                    <span className='story__btn text-slate-950 rounded-xl  py-2 px-8 border-2 border-gray-400 inline-block'>Back</span>
                  </Link>
                  <p className='self-end'>{'time: ' + storyWithUser.time}</p>
              </div>
            </div>

        </div>)
        }

          
    </main>
  )
}
