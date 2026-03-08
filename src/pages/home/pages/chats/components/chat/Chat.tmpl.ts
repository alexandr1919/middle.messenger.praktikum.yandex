export const ChatTemplate = `
  {{#if chatId}}
    {{{chatBar}}}
    <ul class="chat__messages">
      {{#each messages}}
        {{{this}}}
      {{else}}
        <li class="chat__empty">No messages</li>
      {{/each}}
    </ul>
    {{{messageInput}}}
  {{else}}
    <p class="chat__empty">Select a chat from the list to start messaging</p>
  {{/if}}
`;
