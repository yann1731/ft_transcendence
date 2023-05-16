import ContactContainer from './Contacts';
import ConversationContainer from './Conversation';
import BackgroundContainer from './Background';


export default function DividerStack() {
  return (
    <div>
      <BackgroundContainer>
            <ContactContainer></ContactContainer>
            <ConversationContainer></ConversationContainer>
      </BackgroundContainer>
    </div>
  );
}