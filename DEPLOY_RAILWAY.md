# 🚂 Guia de Deploy no Railway - Rosa Oriental

## ✅ Pré-requisitos Concluídos

- ✅ Repositório GitHub configurado: https://github.com/revolutedigital/lprosa
- ✅ Código enviado para o GitHub
- ✅ Servidor Express configurado
- ✅ Arquivos de configuração Railway criados

---

## 🚀 Passos para Deploy no Railway

### 1. Acessar o Railway

1. Acesse: https://railway.app/
2. Faça login com sua conta GitHub

### 2. Criar Novo Projeto

1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Procure pelo repositório: **`revolutedigital/lprosa`**
4. Clique para selecionar o repositório

### 3. Configuração Automática

O Railway detectará automaticamente:
- ✅ `package.json` - Dependências Node.js
- ✅ `railway.json` - Configurações de deploy
- ✅ `server.js` - Comando de start

**O deploy iniciará automaticamente!** ⚡

### 4. Aguardar o Build

- O Railway instalará as dependências (`npm install`)
- Iniciará o servidor com `node server.js`
- Isso leva cerca de 1-3 minutos

### 5. Obter URL Pública

1. Após o deploy concluir, vá em **"Settings"** no projeto
2. Role até **"Networking"** ou **"Domains"**
3. Clique em **"Generate Domain"**
4. Copie a URL gerada (algo como: `nome-projeto.up.railway.app`)

---

## 🔧 Configurações Opcionais

### Variáveis de Ambiente (se necessário no futuro)

1. No projeto Railway, vá em **"Variables"**
2. Adicione variáveis conforme necessário:
   - `NODE_ENV=production`
   - Outras variáveis sensíveis

### Domínio Personalizado

1. No Railway, vá em **"Settings" → "Domains"**
2. Clique em **"Custom Domain"**
3. Digite seu domínio (ex: `rosaoriental.com.br`)
4. Configure os DNS conforme instruções:
   - Tipo: `CNAME`
   - Nome: `@` ou `www`
   - Valor: `[seu-projeto].up.railway.app`

---

## 📊 Monitoramento

### Ver Logs em Tempo Real

1. No dashboard do Railway
2. Clique na aba **"Deployments"**
3. Clique no deployment ativo
4. Veja os logs do servidor

### Verificar Status

```bash
# Você verá no console:
🍣 Rosa Oriental server running on port XXXX
🌐 Visit: http://localhost:XXXX
```

---

## 🔄 Deploys Automáticos

**Configuração já pronta!** ✅

Sempre que você fizer push para a branch `main`:
```bash
git add .
git commit -m "Sua mensagem"
git push origin main
```

O Railway automaticamente:
1. Detecta as mudanças
2. Faz rebuild
3. Redeploy automático
4. Zero downtime

---

## 🧪 Testar o Deploy

Após o deploy, teste:

1. ✅ **Página carrega**: Acesse a URL do Railway
2. ✅ **Meta Pixel funciona**:
   - Abra DevTools (F12) → Console
   - Veja mensagens: `Meta Pixel Event: PageView`
3. ✅ **Botões funcionam**: Clique nos CTAs
4. ✅ **WhatsApp abre**: Clique no botão flutuante
5. ✅ **Imagens carregam**: Verifique galeria
6. ✅ **Responsivo**: Teste em mobile

---

## 🐛 Solução de Problemas

### Deploy falhou?

**Erro: "Build failed"**
```bash
# Verifique os logs no Railway
# Geralmente é problema com:
- Dependências no package.json
- Sintaxe no código
```

**Solução:**
1. Verifique os logs de erro no Railway
2. Corrija o problema localmente
3. Faça commit e push novamente

### Página não carrega?

1. Verifique se o deployment está **"Active"** (verde)
2. Veja os logs - procure por erros
3. Verifique se a porta está configurada corretamente (usa `process.env.PORT`)

### Imagens não aparecem?

- Verifique se os arquivos estão no repositório
- Confirme que os caminhos das imagens estão corretos no HTML

---

## 💰 Custos

**Railway Free Tier:**
- ✅ 500 horas/mês gratuitas
- ✅ Suficiente para este projeto
- ✅ Sem necessidade de cartão de crédito inicialmente

Para mais uso, há planos pagos a partir de $5/mês.

---

## 🎯 Próximos Passos Recomendados

1. ✅ Deploy no Railway
2. 🔗 Configurar domínio personalizado
3. 📊 Monitorar eventos do Meta Pixel no Gerenciador de Eventos
4. 🎨 Testar performance com Lighthouse
5. 📱 Testar em dispositivos móveis reais
6. 🔍 Configurar Google Search Console (SEO)

---

## 📞 Suporte

- **Railway Docs**: https://docs.railway.app/
- **Status**: https://status.railway.app/

---

## ✅ Checklist Final

Antes de considerar o deploy completo:

- [ ] Deploy no Railway concluído
- [ ] URL pública funcionando
- [ ] Meta Pixel disparando eventos (verificar no console)
- [ ] Todos os botões funcionando
- [ ] WhatsApp abrindo corretamente
- [ ] Imagens carregando
- [ ] Layout responsivo no mobile
- [ ] Performance boa (< 3s de carregamento)

---

**🎉 Parabéns! O site Rosa Oriental está no ar!** 🍣
