"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  Send,
  User,
  Bot,
  ChevronLeft,
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function InterviewChatPage() {
  const { id: jobId } = useParams();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Cargar la simulación inicial
  useEffect(() => {
    const initSimulation = async () => {
      if (!session?.accessToken) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/interviews/prepare/${jobId}`,
          {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          },
        );
        const data = await res.json();
        const userName =
          session?.user?.fullName || session?.user?.name || "candidato";
        const firstName = userName.split(" ")[0];

        setMessages([
          {
            role: "assistant",
            content:
              data.initialMessage ||
              `Hola ${firstName}, soy el reclutador. ¿Estás listo para empezar?`,
          },
        ]);
      } catch (err) {
        console.error("Error al preparar entrevista");
      } finally {
        setLoading(false);
      }
    };
    initSimulation();
  }, [jobId, session]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/interviews/answer/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            answer: userMessage,
            history: messages,
          }),
        },
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${data.feedback}\n\n${data.nextQuestion}`,
        },
      ]);
    } catch (err) {
      console.error("Error al enviar respuesta");
    } finally {
      setIsTyping(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-purple-500" size={40} />
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-background text-zinc-100">
      {/* Header del Chat */}
      <header className="p-4 border-b border-white/5 bg-card-bg/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/interviews"
            className="p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h2 className="font-bold text-sm text-white">Simulador Pro</h2>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Sesión Activa
            </p>
          </div>
        </div>
        <div className="bg-purple-600/10 border border-purple-500/20 px-3 py-1 rounded-full flex items-center gap-2">
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-xs font-bold text-purple-300">
            AI Recruiter
          </span>
        </div>
      </header>

      {/* Área de Mensajes */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full scrollbar-hide">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[80%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  msg.role === "user"
                    ? "bg-zinc-800 border-white/10"
                    : "bg-purple-600/20 border-purple-500/30 text-purple-400"
                }`}
              >
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[#1c1c24] border border-white/5 text-zinc-100 rounded-tr-none shadow-xl"
                    : "bg-card-bg border border-white/5 text-zinc-300 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse italic text-zinc-500 text-xs ml-11">
            El reclutador está analizando tu respuesta...
          </div>
        )}
        <div ref={scrollRef} />
      </main>

      {/* Input de Mensaje */}
      <footer className="p-6 border-t border-white/5 bg-background">
        <form
          onSubmit={handleSend}
          className="max-w-4xl mx-auto relative group"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu respuesta..."
            className="w-full bg-card-bg border border-white/10 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-purple-500/50 transition-all text-sm placeholder:text-zinc-600 group-hover:border-white/20"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 bottom-2 px-4 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-xl transition-all flex items-center justify-center"
          >
            {isTyping ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send
                size={18}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            )}
          </button>
        </form>
        <p className="text-[10px] text-zinc-600 text-center mt-4 uppercase tracking-[0.2em] font-bold">
          DepurApp Intelligence • NestJS + Gemini Engine
        </p>
      </footer>
    </div>
  );
}
