import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const currentLang = (i18n.language || 'en').startsWith('am') ? 'am' : 'en';

  const greetings = {
    en: "Hello! Welcome to Ke Geberew. How can I help you today?",
    am: "ሰላም! ወደ ከ ገበሬው እንኳን ደህና መጡ። ዛሬ እንዴት ልርዳዎት እችላለሁ?"
  };

  const responses = {
    en: {
      hello: "Hi there! Welcome to Ke Geberew. How can I assist you?",
      products: "You can browse our Products page to see fresh agricultural crops, grains, coffee, and honey from Ethiopian farmers.",
      register: "To register, click on 'Sign Up' or 'Register Now' and select your role (Farmer, Buyer, or Driver).",
      contact: "You can reach us through our Contact page, email info@kegeberew.com, or phone +251 11 123 4567.",
      default: "I'm here to help! You can ask about products, registration, delivery, or contact information."
    },
    am: {
      hello: "ሰላም! ወደ ከ ገበሬው እንኳን ደህና መጡ። እንዴት ልርዳዎት እችላለሁ?",
      products: "የግብርና ምርቶችን፣ እህሎችን፣ ቡናን እና ማርን ለመመልከት 'ምርቶች' ገጻችንን መጎብኘት ይችላሉ።",
      register: "ለመመዝገብ 'ይመዝገቡ' የሚለውን ቁልፍ በመጫን ሚናዎን (ገበሬ፣ ገዢ ወይም ሹፌር) ይምረጡ።",
      contact: "በእውቂያ ገጻችን፣ በኢሜይል info@kegeberew.com ወይም በስልክ +251 11 123 4567 ሊያገኙን ይችላሉ።",
      default: "እርስዎን ለመርዳት ዝግጁ ነኝ! ስለ ምርቶች፣ ምዝገባ፣ ማድረስ ወይም አድራሻ መጠየቅ ይችላሉ።"
    }
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const inputLower = inputValue.toLowerCase();
    setInputValue('');

    // Responsive bot answer
    setTimeout(() => {
      const botResponse = getBotResponse(inputLower);
      const botMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 400);
  };

  const getBotResponse = (input) => {
    const langResponses = responses[currentLang] || responses.en;

    if (input.includes('hello') || input.includes('hi') || input.includes('ሰላም') || input.includes('ጤና')) {
      return langResponses.hello;
    } else if (input.includes('product') || input.includes('ምርት') || input.includes('ጤፍ') || input.includes('ቡና')) {
      return langResponses.products;
    } else if (input.includes('register') || input.includes('መዝገብ') || input.includes('መለያ') || input.includes('login')) {
      return langResponses.register;
    } else if (input.includes('contact') || input.includes('ስልክ') || input.includes('እውቂያ') || input.includes('አድራሻ')) {
      return langResponses.contact;
    } else {
      return langResponses.default;
    }
  };

  const toggleChat = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && messages.length === 0) {
      const greeting = {
        text: greetings[currentLang] || greetings.en,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  };

  return (
    <div className="chatbot">
      <button className="chatbot-toggle" onClick={toggleChat} aria-label="Toggle chat">
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>💬 {t('chatbot.title')}</h3>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chatbot.placeholder')}
            />
            <button onClick={handleSend}>{t('chatbot.send')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
