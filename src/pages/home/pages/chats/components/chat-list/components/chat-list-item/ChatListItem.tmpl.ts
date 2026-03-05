export const ChatListItemTemplate = `
<div class="chat-list__item-inner">
  <span>{{title}} - {{preview}}</span>
  {{#if unreadCount}}
  <span class="chat-list__item-badge">{{unreadCount}}</span>
  {{/if}}
</div>
`;
