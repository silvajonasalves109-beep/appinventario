# Meu Inventário — versão de teste sem banco de dados

Esta versão salva os produtos no `localStorage` do navegador. Não precisa de Supabase, login ou banco de dados.

## Rodar no computador

1. Instale Node.js 20 ou superior.
2. Extraia o ZIP e abra a pasta `meu-inventario` no terminal.
3. Execute `npm install`.
4. Execute `npm run dev`.
5. Abra `http://localhost:3000`.

## Testar no celular

A câmera do celular exige contexto seguro (HTTPS ou localhost). Para testar no celular, publique esta pasta em um serviço com HTTPS, por exemplo Vercel:

1. Envie o projeto para um repositório GitHub.
2. Importe o repositório na Vercel e mantenha as configurações padrão do Next.js.
3. Abra a URL HTTPS gerada no navegador do celular.
4. Autorize o uso da câmera e toque em **Ler código de barras**.
5. No menu do navegador, escolha **Adicionar à tela inicial** para usar como aplicativo.

## Como os dados funcionam

- Produtos e quantidades ficam guardados somente no navegador/aparelho em que foram cadastrados.
- Ler novamente um código já cadastrado acrescenta uma unidade.
- É possível adicionar e retirar unidades manualmente.
- Use **Exportar Excel/CSV** para guardar uma cópia da lista.
- Limpar os dados do navegador pode apagar o inventário. Exporte regularmente.
- Esta versão não sincroniza entre aparelhos e não tem backup em nuvem.

## Busca de produtos

A rota `/api/lookup` consulta as fontes públicas implementadas no projeto. A disponibilidade de nome e imagem depende do cadastro do produto nas bases externas. Se não localizar, preencha os campos manualmente. Links de busca para imagens, Mercado Livre e web são oferecidos como apoio.
