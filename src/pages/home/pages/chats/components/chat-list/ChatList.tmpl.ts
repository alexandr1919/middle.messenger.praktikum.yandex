export const ChatListTemplate = `
  <div class='main-menu__header'> 
    <input class="main-menu__search text-input" placeholder="Search"/>
    {{{addButton}}}
  </div>
  <ul class="chat-list">
    {{#each items}}
      {{{this}}}
    {{/each}}
  </ul>
`;
