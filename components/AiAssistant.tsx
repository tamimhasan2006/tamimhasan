
import React, { useState, useRef, useEffect } from 'react';
import { getSpiritualGuidance } from '../services/geminiService';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'আস-সালামু আলাইকুম! আমি আস-সুন্নাহ ফাউন্ডেশনের এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const botResponse = await getSpiritualGuidance(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[350px] h-[500px] rounded-3xl shadow-2xl flex flex-col border border-emerald-100 overflow-hidden mb-4">
          <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">AS</div>
              <div>
                <p className="font-bold text-sm">এআই অ্যাসিস্ট্যান্ট</p>
                <p className="text-[10px] text-emerald-100">অনলাইন • আপনার সহায়তায়</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-emerald-50/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none' 
                  : 'bg-white border border-emerald-100 text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-100 p-3 rounded-2xl flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="আপনার প্রশ্ন লিখুন..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95 text-white"
        >
          <span className="text-2xl">💬</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}
    </div>
  );
};

export default AiAssistant;
