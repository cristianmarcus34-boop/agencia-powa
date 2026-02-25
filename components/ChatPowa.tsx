'use client';

import { useState, useRef, useEffect } from 'react';
import { IoChatbubblesSharp, IoSend, IoClose } from 'react-icons/io5';
import styles from './ChatPowa.module.css';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export default function ChatPowa() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: '¡Hola! Soy el estratega digital de Powa. 🚀 ¿Tienes una idea brillante o un negocio que quieras escalar con tecnología de vanguardia?' 
    }
  ]);
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- APERTURA AUTOMÁTICA (Marketing Dinámico) ---
  useEffect(() => {
    const hasOpenedBefore = sessionStorage.getItem('powaChatAutoOpened');
    if (!hasOpenedBefore) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('powaChatAutoOpened', 'true');
      }, 4000); // 4 segundos es el sweet spot para retención
      return () => clearTimeout(timer);
    }
  }, []);

  // --- SCROLL AUTOMÁTICO ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen]);

  // --- FUNCIÓN DE ENVÍO ---
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }), 
      });

      if (!res.ok) throw new Error("Error en servidor");

      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'bot',
        text: data.text || "He analizado tu propuesta. ¿Podrías darme más detalles para darte una solución exacta?"
      }]);
    } catch (error) {
      console.error("Error en el ChatPowa:", error);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "Parece que hubo una interferencia en la red. Pero no te preocupes, en Powa resolvemos cualquier desafío técnico. ¿Intentamos de nuevo?"
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Botón Flotante con Badge de Notificación si está cerrado */}
      {!isOpen && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-10 animate-bounce"></div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.chatToggleButton}
        aria-label="Abrir consultoría IA"
      >
        {isOpen ? <IoClose size={28} /> : <IoChatbubblesSharp size={28} />}
      </button>

      {/* Ventana de Chat */}
      {isOpen && (
        <div className={`${styles.chatWindow} animate-in fade-in slide-in-from-bottom-4 duration-300`}>

          {/* Header con estilo de Agencia */}
          <div className={styles.header}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]"></div>
                <div className="absolute top-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs uppercase tracking-tighter text-white">Powa AI Lab</span>
                <span className="text-[10px] text-cyan-300 leading-none">Online - Especialista en Growth</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <IoClose size={20} />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className={styles.messagesArea}>
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={m.role === 'user' ? styles.userBubble : styles.botBubble}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/50 text-cyan-400 px-4 py-2 rounded-2xl text-[10px] font-mono tracking-widest border border-cyan-900/30">
                  <span className="inline-block animate-bounce">.</span>
                  <span className="inline-block animate-bounce [animation-delay:0.2s]">.</span>
                  <span className="inline-block animate-bounce [animation-delay:0.4s]">.</span>
                  ANALIZANDO ESTRATEGIA
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de Input */}
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="¿Qué proyecto tienes en mente?"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500 shadow-inner"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="ml-2 p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl text-white disabled:opacity-30 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-90"
            >
              <IoSend size={20} />
            </button>
          </div>
          
          {/* Footer del chat (Sutil Marketing) */}
          <div className="text-[9px] text-center py-1 text-slate-500 border-t border-slate-800">
            Powered by <strong>Powa Digital Infrastructure</strong>
          </div>
        </div>
      )}
    </div>
  );
}