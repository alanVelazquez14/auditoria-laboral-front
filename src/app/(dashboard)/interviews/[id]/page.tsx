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
import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";
import type {
  BackendInterviewAnswerResponse,
  BackendInterviewFinishResponse,
  BackendInterviewHistoryResponse,
  BackendInterviewMessage,
  BackendInterviewPrepareResponse,
} from "@/types/backend";

export default function InterviewChatPage() {
  const { id: jobId } = useParams();
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<BackendInterviewMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const loadInterview = async () => {
      if (messages.length > 0 || status !== "authenticated" || !jobId) {
        setLoading(status === "loading");
        return;
      }

      if (!isInitialMount.current) {
        return;
      }
      isInitialMount.current = false;

      try {
        const history = await apiClientRequest<BackendInterviewHistoryResponse>(
          `/api/interviews/history/${jobId}`,
          {
            auth: true,
            session,
          },
        );

        if (history.messages && history.messages.length > 0) {
          setMessages(history.messages);
          if (history.status === "COMPLETED") {
            setIsCompleted(true);
          }
          return;
        }

        const dataInit = await apiClientRequest<BackendInterviewPrepareResponse>(
          `/api/interviews/prepare/${jobId}`,
          {
            auth: true,
            session,
          },
        );

        const userName =
          session?.user?.fullName || session?.user?.name || "candidato";

        setMessages([
          {
            role: "assistant",
            content:
              dataInit.suggestedFirstQuestion ||
              `Hola ${userName.split(" ")[0]}, ¿listo para empezar?`,
          },
        ]);
      } catch (err) {
        handleApiError(err, "No pudimos cargar la entrevista");
      } finally {
        setLoading(false);
      }
    };

    void loadInterview();
  }, [jobId, messages.length, session, status]);

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
      const data = await apiClientRequest<BackendInterviewAnswerResponse>(
        `/api/interviews/answer/${jobId}`,
        {
        method: "POST",
        auth: true,
        session,
        body: {
          answer: userMessage,
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${data.feedback}\n\n${data.nextQuestion}`,
        },
      ]);
    } catch (err) {
      handleApiError(err, "No pudimos enviar tu respuesta");
    } finally {
      setIsTyping(false);
    }
  };

  const handleFinishInterview = async () => {
    if (
      !window.confirm(
        "¿Estás seguro de finalizar la entrevista? Recibirás un análisis detallado.",
      )
    ) {
      return;
    }

    setIsTyping(true);
    try {
      const report = await apiClientRequest<BackendInterviewFinishResponse>(
        `/api/interviews/finish/${jobId}`,
        {
          method: "POST",
          auth: true,
          session,
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `ENTREVISTA FINALIZADA\n\n${report.feedback}\n\nPuntaje final: ${report.score}/100`,
        },
      ]);
      setIsCompleted(true);
    } catch (err) {
      handleApiError(err, "No pudimos finalizar la entrevista");
    } finally {
      setIsTyping(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-purple-500" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background text-zinc-100">
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
              Sesión activa
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleFinishInterview}
            disabled={messages.length < 2 || isTyping || isCompleted}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold uppercase tracking-widest"
          >
            <CheckCircle2 size={14} />
            <span>Finalizar</span>
          </button>

          <div className="bg-purple-600/10 border border-purple-500/20 px-3 py-1 rounded-full flex items-center gap-2">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs font-bold text-purple-300">
              AI Recruiter
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8 max-w-5xl mx-auto w-full scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } animate-in fade-in slide-in-from-bottom-3 duration-500`}
          >
            <div
              className={`flex gap-4 max-w-[85%] ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
                  msg.role === "user"
                    ? "bg-zinc-800 border-white/10 group-hover:border-purple-500/50"
                    : "bg-purple-600/10 border-purple-500/20 text-purple-400"
                }`}
              >
                {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
              </div>

              <div
                className={`relative p-5 rounded-2xl text-sm leading-relaxed shadow-2xl border ${
                  msg.role === "user"
                    ? "bg-[#1c1c24] border-white/5 text-zinc-100 rounded-tr-none"
                    : "bg-card-bg border-white/10 text-zinc-300 rounded-tl-none"
                }`}
              >
                <div className="whitespace-pre-wrap font-medium tracking-tight opacity-90">
                  {msg.role === "assistant" &&
                  idx === messages.length - 1 &&
                  isTyping ? (
                    <span className="animate-pulse">Escribiendo análisis...</span>
                  ) : (
                    msg.content
                  )}
                </div>

                <span
                  className={`text-[9px] mt-2 block opacity-30 font-bold tracking-widest ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {msg.role === "user" ? "Tu respuesta" : "Feedback reclutador"}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start items-center gap-3 ml-14">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              Procesando respuesta técnica...
            </span>
          </div>
        )}
        <div ref={scrollRef} />
      </main>

      <footer className="p-6 border-t border-white/5 bg-background">
        {isCompleted ? (
          <div className="max-w-4xl mx-auto p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-center">
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest">
              Entrevista finalizada y guardada
            </p>
          </div>
        ) : (
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
        )}
        <p className="text-[10px] text-zinc-600 text-center mt-4 uppercase tracking-[0.2em] font-bold">
          DepurApp Intelligence • NestJS + Gemini Engine
        </p>
      </footer>
    </div>
  );
}
