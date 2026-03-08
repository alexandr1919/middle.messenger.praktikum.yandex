export const ChangePasswordTemplate = `
{{#if error}}<p class="form-message form-message--error">{{error}}</p>{{/if}}
{{#if successMessage}}<p class="form-message form-message--success">{{successMessage}}</p>{{/if}}
<div class='settings__item'>
  <label for='oldPassword'>Current Password</label>
  {{{oldPassword}}}
</div>
<div class='settings__item'>
  <label for='newPassword'>New Password</label>
  {{{newPassword}}}
</div>
  {{{button}}}
`;
