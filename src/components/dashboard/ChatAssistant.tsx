import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Loader2 } from "lucide-react";
import { useCV } from "../../context/CVContext";
import { cn } from "../../lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const ChatAssistant: React.FC = () => {
  const { result } = useCV();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Sou o teu Kamba de Carreira. Analisei o teu currículo e estou aqui para te ajudar a brilhar nas tuas candidaturas e entrevistas de emprego em Angola. O que gostarias de melhorar ou perguntar sobre o teu CV?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: updatedMessages.slice(-5), // Enviar apenas as últimas 5 para contexto
          context: result 
        })
      });

      if (!response.ok) throw new Error("Falha na conexão.");
      
      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: (data.content || "Desculpa, tive um problema técnico. Podes repetir?").replace(/\*\*/g, "")
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Opa, parece que perdi o sinal. Vamos tentar de novo?"
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
      <div className="p-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
        <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white">
          <User size={16} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 leading-none">Kamba de Carreira</h4>
          <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online agora</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn("flex gap-3 max-w-[85%]", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                    <User size={14} className="text-blue-600" />
                  </div>
                )}
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  m.role === "user" 
                    ? "bg-gray-900 text-white rounded-tr-none" 
                    : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
                )}>
                  {m.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <User size={14} className="text-blue-600" />
            </div>
            <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none border border-gray-200 flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-gray-50 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Faz uma pergunta sobre o teu CV..."
            className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 rounded-xl py-3 pl-4 pr-12 text-sm outline-none transition-all font-medium"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-black disabled:opacity-30 transition-all"
          >
            {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-3 text-center font-medium">
          O Kamba de Carreira responde exclusivamente a dúvidas sobre o teu CV, carta e dicas de entrevista.
        </p>
      </div>
    </div>
  );
};
