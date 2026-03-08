export const UserSettingsTemplate = `
{{#if error}}<p class="form-message form-message--error">{{error}}</p>{{/if}}
{{#if successMessage}}<p class="form-message form-message--success">{{successMessage}}</p>{{/if}}
<div class='settings__item'>
  <label for='login'>Login</label>
  {{{login}}}
</div>
<div class='settings__item'>
  <label for='first_name'>First Name</label>
  {{{firstName}}}
</div>
<div class='settings__item'>
  <label for='second_name'>Second Name</label>
  {{{secondName}}}
</div>
<div class='settings__item'>
  <label for='display_name'>Display Name</label>
  {{{displayName}}}
</div>
<div class='settings__item'>
  <label for='phone'>Phone</label>
  {{{phone}}}
</div>
  {{{button}}}
`;
