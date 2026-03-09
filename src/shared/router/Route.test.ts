import { expect } from 'chai';

import Route from './Route';

describe('Route', () => {
  it('should create an instance with defaults', () => {
    const route = new Route();
    expect(route).to.be.instanceOf(Route);
    expect(route._pathname).to.equal('');
    expect(route._isPublic).to.equal(false);
  });

  it('should set pathname from config', () => {
    const route = new Route({ pathname: '/login' });
    expect(route._pathname).to.equal('/login');
  });

  it('should set isPublic to true', () => {
    const route = new Route({ pathname: '/login', isPublic: true });
    expect(route._isPublic).to.equal(true);
  });

  it('match should return true for correct pathname', () => {
    const route = new Route({ pathname: '/login' });
    expect(route.match('/login')).to.equal(true);
  });

  it('match should return false for wrong pathname', () => {
    const route = new Route({ pathname: '/login' });
    expect(route.match('/settings')).to.equal(false);
  });

  it('navigate should not render if pathname not correct', () => {
    let renderCalled = false;
    const route = new Route({ pathname: '/login' });
    route.render = () => {
      renderCalled = true;
    };
    route.navigate('/settings');
    expect(renderCalled).to.equal(false);
  });

  it('navigate should render if pathname correct', () => {
    let renderCalled = false;
    const route = new Route({ pathname: '/login' });
    route.render = () => {
      renderCalled = true;
    };
    route.navigate('/login');
    expect(renderCalled).to.equal(true);
  });
});
