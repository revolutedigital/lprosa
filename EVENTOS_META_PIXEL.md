# 📊 Eventos Meta Pixel - Rosa Oriental

## Pixel ID: 1488091182420776

Este documento lista todos os eventos configurados no Meta Pixel para rastreamento e otimização de campanhas.

---

## 🎯 Eventos Padrão do Facebook

### 1. **PageView**
- **Quando dispara**: Automaticamente quando a página carrega
- **Uso**: Rastreia todas as visualizações de página
- **Configuração**: Automático no código do pixel

### 2. **InitiateCheckout**
- **Quando dispara**:
  - Clique em qualquer botão "Pedir Agora"
  - Clique no botão do menu de navegação "Pedir Agora"
  - Clique no botão "Ver Cardápio Completo"
- **Parâmetros**:
  ```javascript
  {
    content_name: 'Nome do botão',
    content_category: 'Localização',
    value: 0,
    currency: 'BRL'
  }
  ```
- **Uso**: Otimização para conversões de iniciação de pedido

### 3. **ViewContent**
- **Quando dispara**: Clique em itens da galeria de produtos
- **Parâmetros**:
  ```javascript
  {
    content_name: 'Nome do produto',
    content_category: 'Galeria de Produtos',
    content_type: 'product'
  }
  ```
- **Uso**: Rastrear interesse em produtos específicos

### 4. **Contact**
- **Quando dispara**: Clique no botão WhatsApp flutuante
- **Parâmetros**:
  ```javascript
  {
    content_name: 'WhatsApp Flutuante',
    content_category: 'Contact'
  }
  ```
- **Uso**: Rastrear intenção de contato

---

## 🔧 Eventos Personalizados (Custom Events)

### 1. **ClickOrderButton**
- **Quando dispara**: Clique em botões principais de pedido
- **Parâmetros**:
  ```javascript
  {
    button_location: 'ID da seção',
    button_text: 'Texto do botão'
  }
  ```
- **Uso**: Identificar qual botão CTA é mais efetivo

### 2. **ClickNavOrderButton**
- **Quando dispara**: Clique no botão do menu de navegação
- **Parâmetros**:
  ```javascript
  {
    button_location: 'header_navigation'
  }
  ```
- **Uso**: Medir engajamento com menu de navegação

### 3. **GalleryItemClick**
- **Quando dispara**: Clique em produtos na galeria
- **Parâmetros**:
  ```javascript
  {
    product_name: 'Nome do produto',
    product_position: 'Posição na galeria'
  }
  ```
- **Uso**: Identificar produtos mais atrativos

### 4. **ViewMenu**
- **Quando dispara**: Clique em "Ver Cardápio Completo"
- **Parâmetros**:
  ```javascript
  {
    button_location: 'ID da seção'
  }
  ```
- **Uso**: Rastrear interesse em ver menu completo

### 5. **WhatsAppClick**
- **Quando dispara**: Clique no botão WhatsApp
- **Parâmetros**:
  ```javascript
  {
    button_type: 'floating'
  }
  ```
- **Uso**: Medir efetividade do botão WhatsApp

### 6. **ScrollDepth**
- **Quando dispara**: Usuário rola 25%, 50%, 75% e 100% da página
- **Parâmetros**:
  ```javascript
  {
    depth_percentage: 25/50/75/100,
    page_section: 'Seção atual'
  }
  ```
- **Uso**: Medir engajamento e interesse no conteúdo

### 7. **TimeOnPage**
- **Quando dispara**: Após 30s, 60s e 180s na página
- **Parâmetros**:
  ```javascript
  {
    duration_seconds: 30/60/180,
    engagement_level: 'low/medium/high'
  }
  ```
- **Uso**: Identificar usuários engajados

### 8. **ViewSection**
- **Quando dispara**: Visualização de 50% das seções: Sobre, Galeria, Contato
- **Parâmetros**:
  ```javascript
  {
    section_id: 'ID da seção',
    section_title: 'Título da seção'
  }
  ```
- **Uso**: Entender quais seções são mais visualizadas

### 9. **ViewReviews**
- **Quando dispara**: Visualização da seção de avaliações do Google
- **Parâmetros**:
  ```javascript
  {
    section_name: 'Google Reviews',
    rating: '5.0'
  }
  ```
- **Uso**: Medir importância das avaliações sociais

### 10. **SocialMediaClick**
- **Quando dispara**: Clique em links do Instagram
- **Parâmetros**:
  ```javascript
  {
    platform: 'instagram',
    link_location: 'Localização do link'
  }
  ```
- **Uso**: Rastrear interesse em redes sociais

---

## 📈 Como usar esses eventos

### No Gerenciador de Anúncios do Meta:

1. **Criar Públicos Personalizados**:
   - Pessoas que clicaram em botões de pedido (InitiateCheckout)
   - Pessoas que passaram mais de 60s na página (TimeOnPage)
   - Pessoas que rolaram mais de 75% da página (ScrollDepth)
   - Pessoas que visualizaram produtos (ViewContent)

2. **Otimizar Campanhas**:
   - Use "InitiateCheckout" como evento de conversão
   - Crie lookalikes de pessoas que geraram eventos de alto valor

3. **Criar Públicos de Remarketing**:
   - Visitantes que não clicaram em botões de pedido
   - Pessoas que visualizaram produtos mas não pediram
   - Usuários altamente engajados (ScrollDepth 100% + TimeOnPage 180s)

4. **Testar Criativos**:
   - Compare eventos entre diferentes anúncios
   - Veja quais criativos geram mais InitiateCheckout

---

## 🔍 Verificar se os eventos estão funcionando

1. **Meta Pixel Helper** (Extensão do Chrome):
   - Instale a extensão oficial do Facebook
   - Visite o site e veja os eventos disparando em tempo real

2. **Gerenciador de Eventos do Meta**:
   - Acesse: business.facebook.com/events_manager2
   - Vá em "Testar Eventos"
   - Digite a URL do site e interaja com os elementos

3. **Console do Navegador**:
   - Abra o DevTools (F12)
   - Vá na aba "Console"
   - Você verá logs de cada evento disparado

---

## 💡 Recomendações

1. **Período de Aprendizado**: Aguarde pelo menos 50 eventos de conversão (InitiateCheckout) antes de otimizar campanhas
2. **Públicos Mínimos**: Espere ter pelo menos 1.000 pessoas em um público antes de criar lookalikes
3. **Teste A/B**: Use os eventos personalizados para identificar o que funciona melhor
4. **Funil de Conversão**: Analise o caminho: PageView → ViewContent → InitiateCheckout → Contact

---

## 📞 Contato

Para dúvidas sobre a implementação técnica dos eventos, consulte o arquivo `script.js`.
