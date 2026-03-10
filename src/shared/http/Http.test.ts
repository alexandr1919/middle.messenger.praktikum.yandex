import { expect } from 'chai';

import { Http } from './Http';

describe('Http', () => {
  it('should create an instance', () => {
    const http = new Http();
    expect(http).to.be.instanceOf(Http);
  });

  it('should create an instance with a base URL', () => {
    const http = new Http('https://example.com');
    expect(http).to.be.instanceOf(Http);
  });

  it('get should return a Promise', () => {
    const http = new Http();
    const result = http.get('/test');
    expect(result).to.be.instanceOf(Promise);
    result.catch(() => {});
  });

  it('get should append data as query string to the URL', () => {
    let capturedUrl = '';
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (_method: string, url: string) {
      capturedUrl = url;
    };
    new Http().get('/search', { data: { query: 'hello', page: 2 } });
    XMLHttpRequest.prototype.open = originalOpen;
    expect(capturedUrl).to.equal('/search?query=hello&page=2');
  });

  it('post should return a Promise', () => {
    const http = new Http();
    const result = http.post('/test');
    expect(result).to.be.instanceOf(Promise);
    result.catch(() => {});
  });

  it('put should return a Promise', () => {
    const http = new Http();
    const result = http.put('/test');
    expect(result).to.be.instanceOf(Promise);
    result.catch(() => {});
  });

  it('delete should return a Promise', () => {
    const http = new Http();
    const result = http.delete('/test');
    expect(result).to.be.instanceOf(Promise);
    result.catch(() => {});
  });
});
