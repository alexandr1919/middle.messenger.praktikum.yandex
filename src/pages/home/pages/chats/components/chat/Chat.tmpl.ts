export const ChatTemplate = /*html*/ `
  <!-- <div class="chat__user">{{chat.user}}</div> -->
   {{{userBar}}}
  <ul class="chat__messages">
    {{#each messages}}
      {{{this}}}
    {{/each}}
    <!-- {{#each chat.messages}}
      <li class="message">
        <span>{{text}}</span>
        <span class="message__time">{{time}}</span>
      </li>
    {{/each}} -->
  </ul>
  {{{messageInput}}}
  <!-- <form class="chat__form">
    <input class="chat__input" placeholder="Write a message..." name="message"/>
  </form> -->
`;
