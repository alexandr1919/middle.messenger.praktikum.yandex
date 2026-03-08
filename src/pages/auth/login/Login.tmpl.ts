export const LoginFormTemplate = `
    {{{title}}}
    {{#if error}}<p class="form-message form-message--error">{{error}}</p>{{/if}}
    {{{login}}}
    {{{password}}}
    {{{button}}}
    {{{redirectLink}}}
`;
