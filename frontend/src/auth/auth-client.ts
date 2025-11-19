import { createAuthClient } from "better-auth/react";

// Crie o cliente de autenticação
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // URL do seu backend
});

// Exporte o hook useSession do authClient
export const { useSession } = authClient;