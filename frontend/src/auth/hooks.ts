import { authClient, useSession } from "./auth-client";


export const register = async (email: string, password: string, name: string) => {
    try {
        const res = await authClient.signUp.email({email, password, name })
        return res
    } catch (err: any) {
        throw new Error(err.message || "Erro ao registrar")
    }
}

export const login = async ( email:string, password:string) => {
    try {
        const res = await authClient.signIn.email({email, password})
        return res
    } catch (err: any) {
        throw new Error(err.message || "Erro ao logar")
    }
}

export const logout = async () => {
    await authClient.signOut()
}

//função para pegar a sessão atual

export function useUser() {
    const { data: session, isPending, error, refetch } = useSession();
    
    return {
        user: session?.user ?? null,
        session: session ?? null,
        isPending: isPending,
        error: error ?? null,
        refetch: refetch,
    };
}