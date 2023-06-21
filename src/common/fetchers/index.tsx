import { Fetcher }  from 'swr';

export const fetcherStory: Fetcher<any, string> = (url: string) => fetch(url).then(res => res.json());
export const fetcherUser: Fetcher<any, string[]> = ([url, user]: any[]) => fetch(url).then(res => res.json());