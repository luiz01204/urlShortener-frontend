# 🔗 Encurtador de URL

Aplicação frontend desenvolvida em **React + TypeScript** que consome uma [API própria](https://github.com/luiz01204/urlShortener) para encurtar URLs, permitindo salvar o histórico localmente e acessar/redirecionar links curtos.  
Feita com **TailwindCSS**, ícones do **Lucide** e muito amor pelo código. ❤️

## 🚀 Tecnologias Utilizadas

- ⚛️ **React**
- 🧠 **TypeScript**
- 🎨 **TailwindCSS**
- 🌐 **Axios**
- 🧭 **React Router DOM**
- 💡 **Lucide Icons**

## 💥 Funcionalidades

✅ Encurtar URLs longas via API  
✅ Exibir histórico de links encurtados (armazenado no `localStorage`)  
✅ Copiar link com 1 clique  
✅ Redirecionamento automático  
✅ Limpar histórico facilmente  
✅ Interface escura moderna e responsiva  
✅ Tratamento de erros e feedbacks visuais  

## 📸 Demonstração

![preview](https://github.com/luiz01204/url-shortener-frontend/assets/example.png)

> 💬 *Links encurtados expiram após 7 dias.*

## ⚙️ Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/luiz01204/url-shortener-frontend.git
   ```

2. **Acesse a pasta:**
   ```bash
   cd url-shortener-frontend
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Configure o endpoint da API:**
   No arquivo `src/api/api.ts`, atualize a URL base:
   ```ts
   export const api = axios.create({
     baseURL: "https://seu-backend.com",
   });
   ```

5. **Rode o projeto:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. **Acesse:**
   ```
   http://localhost:5173
   ```

## 🧱 Estrutura do Projeto

```
src/
 ├── api/
 │   └── api.ts
 ├── pages/
 │   ├── Home.tsx
 │   └── NotFound.tsx
 ├── main.tsx
 ├── App.tsx
 └── index.css
```

## 🤝 Contribuindo

Contribuições são super bem-vindas!  
Abra um **Pull Request** com melhorias, ideias ou correções.

## 👨‍💻 Autor

**Luiz Antônio dos Santos Machado**  
💼 [LinkedIn](https://www.linkedin.com/in/luiz-ant%C3%B4nio-dos-santos-machado-393bb314b/)  
💻 [GitHub](https://github.com/luiz01204)

---

⭐ Se curtir o projeto, deixa uma estrela lá no repositório!
