import { Block } from '../block';

export function render(parentSelector: string, block: Block) {
  const root = document.querySelector(parentSelector);
  const content = block.getContent();
  if (root && content) {
    root.appendChild(content);
  }
  block.dispatchComponentDidMount();
  return root;
}
