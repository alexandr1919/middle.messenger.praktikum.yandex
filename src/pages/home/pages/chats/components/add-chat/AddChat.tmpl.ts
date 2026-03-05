export const AddChatTemplate = `
{{#if error}}<p class="form-message form-message--error">{{error}}</p>{{/if}}
{{#if successMessage}}<p class="form-message form-message--success">{{successMessage}}</p>{{/if}}
<div class="add-chat__field">
  {{{title}}}
</div>
{{{button}}}
`;
