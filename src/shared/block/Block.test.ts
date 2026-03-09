import { expect } from 'chai';

import { Block } from './Block';

class TestBlock extends Block {
  constructor(props = {}) {
    super('div', props);
  }
  render() {
    return document.createDocumentFragment();
  }
}

describe('Block', () => {
  it('should create an instance', () => {
    const block = new TestBlock();
    expect(block).to.be.instanceOf(Block);
  });

  it('should generate a unique id', () => {
    const a = new TestBlock();
    const b = new TestBlock();
    expect(a._id).to.be.a('string');
    expect(a._id).to.not.equal(b._id);
  });

  it('getContent should return an HTMLElement', () => {
    const block = new TestBlock();
    expect(block.getContent()).to.be.instanceOf(HTMLElement);
  });

  it('should create element with the tag name', () => {
    const block = new Block('section');
    expect(block.getContent()?.tagName.toLowerCase()).to.equal('section');
  });

  it('should set attributes on the element', () => {
    const block = new TestBlock({ attributes: { class: 'my-class' } });
    expect(block.getContent()?.getAttribute('class')).to.equal('my-class');
  });

  it('show should set display to block and isMounted to true', () => {
    const block = new TestBlock();
    block.show();
    expect(block.isMounted).to.equal(true);
    expect(block.getContent()?.style.display).to.equal('block');
  });

  it('hide should set display to none and isMounted to false', () => {
    const block = new TestBlock();
    block.show();
    block.hide();
    expect(block.isMounted).to.equal(false);
    expect(block.getContent()?.style.display).to.equal('none');
  });

  it('dispatchComponentDidMount should set isMounted to true', () => {
    const block = new TestBlock();
    expect(block.isMounted).to.equal(false);
    block.dispatchComponentDidMount();
    expect(block.isMounted).to.equal(true);
  });

  it('getChild should return the child by key', () => {
    const child = new TestBlock();
    const parent = new TestBlock({ children: { inner: child } });
    expect(parent.getChild('inner')).to.equal(child);
  });

  it('getChild should return undefined for unknown key', () => {
    const block = new TestBlock();
    expect(block.getChild('missing')).to.equal(undefined);
  });
});
