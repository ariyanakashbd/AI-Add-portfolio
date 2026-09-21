import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import {
  Bot,
  X,
  Send,
  Loader2,
  Sparkles,
  User,
  ExternalLink,
  CornerDownLeft,
} from 'lucide-react';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize or reset greeting when language changes or first opens
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: t.ai.defaultGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [t.ai.defaultGreeting, messages.length]);

  const suggestedQuestions =
    language === 'bn'
      ? [
          'আপনি কে?',
          'কী কী প্রযুক্তি ও স্কিল জানেন?',
          'কী কী প্রজেক্ট তৈরি করেছেন?',
          'কী কী সেবা বা কাজ করেন?',
          'কীভাবে যোগাযোগ বা হায়ার করব?',
        ]
      : language === 'hi'
      ? [
          'आप कौन हैं?',
          'आप किन तकनीकों का उपयोग करते हैं?',
          'आपने कौन से प्रोजेक्ट्स बनाए हैं?',
          'आप क्या सेवाएं प्रदान करते हैं?',
          'मैं आपसे कैसे संपर्क कर सकता हूँ?',
        ]
      : [
          'Who are you?',
          'What technologies do you use?',
          'What projects have you built?',
          'What services do you offer?',
          'How can I contact or hire you?',
        ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: 'assistant',
        content: t.ai.defaultGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/ai/chat', {
        message: messageText,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
      });

      const isBengaliOrBanglish =
        /[\u0980-\u09FF]/.test(messageText) ||
        /\b(tumi|apni|kemon|acho|koro|kaj|jogajog|phone|number|vai)\b/i.test(messageText);

      const defaultReply = isBengaliOrBanglish
        ? 'আমি আরিয়ান আকাশ, ফুল স্ট্যাক ডেভেলপার। আমার কাজ বা প্রজেক্ট নিয়ে যেকোনো প্রশ্ন করতে পারেন অথবা সরাসরি ariyanakash01303@gmail.com এ ইমেইল করতে পারেন।'
        : "I'm Ariyan Akash, Full Stack Developer. Please let me know if you need details about my work or would like to discuss a project!";

      const replyContent = response.data?.reply || defaultReply;

      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI chat error:', error);
      const isBengaliOrBanglish =
        /[\u0980-\u09FF]/.test(messageText) ||
        /\b(tumi|apni|kemon|acho|koro|kaj|jogajog|phone|number|vai)\b/i.test(messageText);

      const fallbackReply: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: isBengaliOrBanglish
          ? 'আমি আরিয়ান আকাশ, ফুল স্ট্যাক ডেভেলপার। আমি React, Node.js এবং আধুনিক ডেটাবেজ দিয়ে ওয়েবসাইট ও ওয়েব সফটওয়্যার তৈরি করি। সরাসরি যোগাযোগ করুন: ariyanakash01303@gmail.com অথবা ফোন/WhatsApp: 01303489232।'
          : 'I’m Ariyan Akash, Full Stack Developer. I build modern, responsive web applications using React, Node.js, and Express. Feel free to contact me directly at ariyanakash01303@gmail.com.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="ai-agent-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl flex flex-col h-[620px] max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-900/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 shrink-0">
                <img
                  src="/images/ariyan-akash.jpg"
                  alt="Ariyan Akash"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                  Ariyan Akash (আরিয়ান আকাশ)
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Full Stack Developer Representative • বাংলা & English
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="ai-agent-reset-btn"
              type="button"
              onClick={handleResetChat}
              title={t.ai.clearChat}
              className="px-2 py-1 rounded text-[11px] font-mono text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              Reset
            </button>
            <button
              id="ai-agent-close-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multilingual Support Banner */}
        <div className="px-4 py-1.5 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Ask anything in বাংলা, English, or Banglish</span>
          </div>
          <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
            AI Representative
          </span>
        </div>

        {/* Message Container */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-sm bg-neutral-50/30 dark:bg-black/40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-black rounded-tr-none'
                    : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-tl-none shadow-xs'
                }`}
              >
                {m.content}
              </div>
              <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mt-1 px-1">
                {m.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono py-2 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-500" />
              <span>Ariyan is typing / উত্তর লিখছেন...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="shrink-0 px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[11px] font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="flex items-center gap-2">
            <input
              id="ai-agent-input"
              type="text"
              placeholder="Ask in English, বাংলা অথবা Banglish-এ লিখুন..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all disabled:opacity-50"
            />
            <button
              id="ai-agent-send-btn"
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mt-2 px-1">
            <span>Official Portfolio Representative</span>
            <span>Press Enter ↵ to send</span>
          </div>
        </div>
      </div>
    </div>
  );
};
