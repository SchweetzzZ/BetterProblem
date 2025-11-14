# Dockerfile corrigido
FROM oven/bun:latest

WORKDIR /app

# Primeiro copia os arquivos de dependências
COPY package.json bun.lock* ./

# Instala dependências (usa cache se package.json não mudar)
RUN bun install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando de desenvolvimento (já está no compose)
CMD ["bun", "run", "dev"]