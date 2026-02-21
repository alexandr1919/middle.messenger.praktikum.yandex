export const SettingsFormTemplate = `
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
