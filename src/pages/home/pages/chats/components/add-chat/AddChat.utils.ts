import { Button } from '../../../../../../shared/ui/components/button/Button';
import { TextInput } from '../../../../../../shared/ui/components/text-input';

export const getAddChatFormChildren = () => ({
  title: new TextInput({
    name: 'title',
    placeholder: 'Chat title'
  }),
  button: new Button({ text: 'Save', type: 'submit' })
});
