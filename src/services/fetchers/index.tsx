import useSWR, { Fetcher }  from 'swr'

export const fetcherStory: Fetcher<any, string> = (url) => fetch(url).then(res => res.json());
export const fetcherUser: Fetcher<any, string[]> = ([url, user]) => fetch(url).then(res => res.json());