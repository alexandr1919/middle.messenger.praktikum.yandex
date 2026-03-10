const { JSDOM } = require('jsdom');

require.extensions['.css'] = () => {};

const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost'
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = jsdom.window.navigator;
global.location = jsdom.window.location;
global.history = jsdom.window.history;
global.HTMLElement = jsdom.window.HTMLElement;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
