export const ChatTemplate = `
   {{{userBar}}}
  <ul class="chat__messages">
    {{#each messages}}
      {{{this}}}
    {{/each}}
  </ul>
  {{{messageInput}}}
`;
