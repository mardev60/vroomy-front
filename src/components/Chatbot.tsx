import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Car } from 'lucide-react';

interface ChatbotProps {
  onNavigateHome: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({ onNavigateHome }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Bonjour ! Je suis votre assistant IA spécialisé dans l'estimation automobile. Pour vous fournir une évaluation précise, j'aurai besoin de quelques informations sur votre véhicule. Commençons par la marque et le modèle de votre voiture.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Je recherche une Ford Fiesta de 2023. C'est un modèle Manual avec un moteur 1.0L Petrol. Elle a 13427 miles au compteur, consomme 65.7 mpg et a une taxe annuelle de 145 €. Quel est son prix ?",
    "Je recherche une Golf de 2020. C'est un modèle Manual avec un moteur 1.0L Petrol. Elle a 13427 miles au compteur, consomme 65.7 mpg et a une taxe annuelle de 145 £. Quel est son prix ?",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAPICall = async (userMessage: string): Promise<string> => {
    try {
      const apiUrl = import.meta.env.PROD 
        ? 'https://c80d-34-143-184-251.ngrok-free.app/predict'
        : '/api/predict';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ text: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', response.status, errorData);
        throw new Error(errorData?.detail || `Erreur API (${response.status})`);
      }

      const data = await response.json();
      const responseText = data.generated_text || "Je m'excuse, mais je n'ai pas pu obtenir une réponse appropriée.";
      return responseText.replace(/£/g, '€');
    } catch (error) {
      console.error('Erreur API:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return "Je suis hors service pour le moment ! 😴 Marou m'a coupé les vivres car je suis trop gourmand en ressources... Il faut qu'il me réactive ! En attendant, tu peux lui envoyer un petit message pour qu'il me redonne de l'énergie ! 💪";
      }
      return "Je m'excuse, mais je rencontre quelques difficultés techniques. Veuillez réessayer dans un moment.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await simulateAPICall(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Je m'excuse, mais je rencontre quelques difficultés techniques. Veuillez réessayer dans un moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">Assistant IA Vroomy</span>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-3xl ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 ml-3'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 mr-3'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                
                <div
                  className={`rounded-2xl px-6 py-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-100'
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-3xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl px-6 py-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Parlez-moi de votre voiture (marque, modèle, année, kilométrage)..."
              className="flex-1 bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Suggestions */}
          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-2">Suggestions :</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left text-xs text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 rounded-lg px-3 py-1.5 transition-all duration-200 max-w-[300px] truncate"
                  title={suggestion}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;