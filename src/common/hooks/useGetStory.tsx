import {fetcherStory, fetcherUser} from '@/common/fetchers';
import { User } from '@/types';
import useSWR from 'swr';

export function useGetStory(storyId: string) {
    const { data: story, error: isErrorStory, isLoading: isLoadingStory } = useSWR(`${process.env.HACKER_API}/item/${storyId}.json`, fetcherStory);
    const { data: user, error, isLoading } = useSWR<User>(story ? [`${process.env.HACKER_API}/user/${story && story.by}.json`, story]: null, fetcherUser);
    if(story){
        story.karma = user?.karma;
    }

    return [story, isLoading || isLoadingStory, error || isErrorStory] 
}

