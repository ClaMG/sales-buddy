# Usa uma imagem estável do Node.js
FROM node:20

# Cria a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o seu backend usa
EXPOSE 3000

# Comando para iniciar a aplicação em modo desenvolvimento
CMD ["npm", "run", "dev"]