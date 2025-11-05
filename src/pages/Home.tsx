import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { LinkIcon, Trash2, Copy, Github, Linkedin } from "lucide-react";

interface UrlResponse {
  url: string;
}

interface UrlItem {
  original: string;
  short: string;
  createdAt: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("shortenedUrls");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setUrls(parsed);
      }
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
      localStorage.removeItem("shortenedUrls");
    }
  }, []);

  useEffect(() => {
    if (urls.length > 0) {
      localStorage.setItem("shortenedUrls", JSON.stringify(urls));
    } else {
      localStorage.removeItem("shortenedUrls");
    }
  }, [urls]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post<UrlResponse>("/shorten-url", { url });
      const newItem = {
        original: url,
        short: response.data.url,
        createdAt: new Date().toLocaleString("pt-BR"),
      };
      setUrls([newItem, ...urls]);
      setUrl("");
    } catch (err) {
      console.error(err);
      setError("Erro ao encurtar a URL 😢");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      alert("Falha ao copiar!");
    }
  };

  const handleRedirect = async (shortUrl: string) => {
    try {
      const id = shortUrl.split("/").pop();
      const response = await api.get(`/${id}`);
      window.open(response.data.redirectTo, "_blank");
    } catch {
      navigate("/not-found");
    }
  };

  const handleClear = () => {
    setUrls([]);
    localStorage.removeItem("shortenedUrls");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-6 text-white">
      <h1 className="text-4xl font-bold mt-10 mb-4 flex items-center gap-2 text-blue-400">
        <LinkIcon className="text-blue-400 w-8 h-8" />
        Encurtador de URL
      </h1>
      <p className="text-gray-400 mb-8">Links válidos por 7 dias</p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <input
          type="url"
          placeholder="Cole sua URL aqui..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? "Encurtando..." : "Encurtar"}
        </button>
      </form>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {/* HISTÓRICO */}
      {urls.length > 0 && (
        <div className="mt-10 w-full max-w-md bg-gray-800 p-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-blue-400">Histórico</h2>
            <button
              onClick={handleClear}
              className="text-sm text-red-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Limpar tudo
            </button>
          </div>

          <ul className="flex flex-col gap-3">
            {urls.map((item, i) => (
              <li
                key={i}
                className="bg-gray-700 p-3 rounded-lg flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleRedirect(item.short)}
                    className="text-blue-400 text-sm break-all hover:underline text-left flex items-center gap-1 cursor-pointer"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {item.short}
                  </button>
                  <button
                    onClick={() => handleCopy(item.short)}
                    className="text-xs bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  Criado em: {item.createdAt}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* RODAPÉ */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Desenvolvido por Luiz Antônio dos Santos Machado 💻</p>
        <div className="flex gap-6 justify-center mt-3">
          <a
            href="https://github.com/luiz01204"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/luiz-ant%C3%B4nio-dos-santos-machado-393bb314b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-all flex items-center gap-2"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
