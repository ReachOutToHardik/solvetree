import React, { useState, useRef, useEffect } from 'react';
import { createChatSession } from '../services/gemini';
import { ChatMessage } from '../types';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { GenerateContentResponse } from '@google/genai';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null); // Keep session in state
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-fill from URL
  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.split('?')[1];
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const topic = urlParams.get('topic');
      if (topic) {
        setInput(decodeURIComponent(topic));
      }
    }
  }, []);

  // Initialize chat session on mount
  useEffect(() => {
    try {
      const session = createChatSession();
      setChatSession(session);
      // Add initial greeting
      setMessages([{
        id: 'init',
        role: 'model',
        text: "Hello. I'm your AI Consultant. I'm here to help you think through problems, brainstorm ideas, or just provide a second opinion. What's on your mind today?",
        timestamp: Date.now()
      }]);
    } catch (e) {
      console.error("Failed to init chat", e);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessageStream({ message: userMsg.text });
      
      const botMsgId = (Date.now() + 1).toString();
      let fullText = "";

      // Add a placeholder message for the bot
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: "",
        timestamp: Date.now()
      }]);

      for await (const chunk of result) {
         const c = chunk as GenerateContentResponse;
         if (c.text) {
             fullText += c.text;
             setMessages(prev => prev.map(msg => 
                 msg.id === botMsgId ? { ...msg, text: fullText } : msg
             ));
         }
      }

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-50 p-2 md:p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 p-4 md:p-5 flex items-center shadow-sm z-10 justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center text-purple-600 mr-4 shadow-sm border border-purple-100">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                Consultant AI
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              </h2>
              <p className="text-sm text-slate-500">Expert Logic & Reasoning Model</p>
            </div>
          </div>
          <div className="hidden md:flex items-center text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            <Sparkles size={12} className="mr-1" />
            Gemini 2.5 Active
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 bg-slate-50/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 shadow-sm border ${
                  msg.role === 'user' ? 'bg-white border-slate-200 text-slate-600 ml-3' : 'bg-purple-600 border-purple-600 text-white mr-3'
                }`}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>

                {/* Bubble */}
                <div className={`p-5 md:p-6 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}>
                   <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your situation here..."
              disabled={isLoading}
              className="flex-1 p-4 pr-4 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-base shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 transition-all shadow-md hover:shadow-lg transform active:scale-95"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-3">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;