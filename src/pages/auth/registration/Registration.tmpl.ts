export const RegistrationFormTemplate = `
    {{{title}}}
    {{#if error}}<p class="form-message form-message--error">{{error}}</p>{{/if}}
    {{{firstName}}}
    {{{secondName}}}
    {{{login}}}
    {{{email}}}
    {{{password}}}
    {{{repeatPassword}}}
    {{{phone}}}
    {{{button}}}
    {{{redirectLink}}}
    `;
