interface Config {
    body?: string;
    headers: Record<string, string>;
    method: string;
  }
  
  export default class API {
    private api_url: string;
  
    constructor(api_url: string) {
      this.api_url = api_url;
    }
  
    async doFetch(path: string, method = 'GET', data?: Record<string, any>) {
      const config: Config = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      if (data) {
        config.body = JSON.stringify(data);
      }
  
      const response = await fetch(`${this.api_url}/${path}`);
  
      return response.json();
    }
  }