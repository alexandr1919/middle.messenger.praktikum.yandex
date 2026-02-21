export const ChatListTemplate = `
  <input class="main-menu__search text-input" placeholder="Search"/>
  <ul class="chat-list">
    {{#each items}}
      {{{this}}}
    {{/each}}
  </ul>
`;
