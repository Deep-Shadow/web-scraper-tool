# 🌐 Web Scraper Tool

<div align="center">
  <img src="./assets/images/web-scraper-logo.png" alt="Web Scraper Tool Logo" width="200" style="border-radius: 5px; margin-bottom: 20px"/>
  
  ![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
  ![License](https://img.shields.io/badge/license-MIT-green.svg)
</div>

---

## 📖 Sobre o Projeto

A **Web Scraper Tool** é uma ferramenta robusta e flexível desenvolvida em TypeScript para facilitar a extração de dados de páginas web. Projetada para lidar com diversas situações de scraping, desde requisições simples até operações complexas com gerenciamento de proxies, retentativas e formatação de saída.

### ✨ Características Principais

- 🔄 **Gerenciamento Inteligente de Proxies** - Rotação automática e validação de proxies
- 🚀 **Processamento em Lote** - Scraping de múltiplas URLs com controle de concorrência
- 🎭 **Simulação de Navegador** - Headers e User-Agents realistas para evitar detecção
- 📊 **Múltiplos Formatos de Saída** - JSON, HTML, XML e TXT
- ⚡ **Retry Automático** - Sistema inteligente de retentativas
- 🛡️ **Segurança Integrada** - Sanitização de dados e validação de URLs
- 📝 **Logs Detalhados** - Sistema de logging colorido e estruturado

---

## 🚀 Início Rápido

### Pré-requisitos

- Node.js >= 14.0.0
- npm ou yarn

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/web-scraper-tool.git
   cd web-scraper-tool
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Compile o projeto:**
   ```bash
   npm run build
   ```

### Exemplo Básico

```typescript
import { WebScraper } from './dist';

async function exemploBasico() {
  const scraper = new WebScraper();
  
  try {
    const result = await scraper.scrape('https://example.com');
    
    if (result.success) {
      console.log('✅ Scraping concluído:', result.data);
    } else {
      console.error('❌ Erro:', result.error);
    }
  } catch (error) {
    console.error('💥 Falha crítica:', error);
  }
}

exemploBasico();
```

---

## 📁 Estrutura do Projeto

```
web-scraper-tool/
├── 📚 documentation/          # Documentação detalhada
│   └── STRUCTURE.md
├── 📊 database/              # Bases de dados
│   ├── devices.json          # Lista de dispositivos/User-Agents
│   └── proxies.json          # Cache de proxies
├── 💡 examples/              # Exemplos de uso
│   ├── 🔰 basic/            # Exemplos básicos
│   └── 🚀 advanced/         # Exemplos avançados
├── 💻 src/                   # Código fonte
│   ├── ⚙️ config.ts         # Configurações globais
│   ├── 📄 index.ts          # Ponto de entrada principal
│   ├── 📜 interfaces/        # Interfaces TypeScript
│   ├── 🛠️ services/         # Serviços principais
│   ├── 📝 types/            # Definições de tipos
│   └── 🧰 utils/            # Utilitários diversos
└── 📄 package.json
```

---

## ⚙️ Configuração

### Configurações Globais

Configure comportamentos padrão no arquivo `src/config.ts`:

```typescript
const config: IConfig = {
  outputDir: path.join(__dirname, "../output"),
  outputFormat: "json",                    // json | html | xml | txt
  useRandomProxies: false,
  retryCount: 3,                          // Tentativas em caso de falha
  timeout: 30000,                         // Timeout em ms
  maxRedirects: 5,
  followRedirects: true,
  maxConcurrentRequests: 5,               // Requisições simultâneas
  minDelayBetweenRequests: 1000,          // Delay mínimo (ms)
  maxDelayBetweenRequests: 5000,          // Delay máximo (ms)
  proxyRotationInterval: 3600000,         // Rotação de proxies (1h)
  cacheEnabled: true,
  cacheTTL: 86400000                      // Cache TTL (24h)
};
```

### Configurações por Requisição

Sobrescreva configurações globais para requisições específicas:

```typescript
const scraper = new WebScraper({
  timeout: 60000,                         // Timeout personalizado
  retryCount: 5,                          // Mais tentativas
  useRandomProxies: true,                 // Usar proxies aleatórios
  headers: {
    'X-Custom-Header': 'MyValue',
    'Accept-Language': 'pt-BR,pt;q=0.9'
  }
});
```

---

## 📚 API Reference

### Classe WebScraper

#### Constructor

```typescript
constructor(options?: Partial<IScraperOptions>)
```

Cria uma nova instância do WebScraper com configurações personalizadas.

**Parâmetros:**
- `options` *(opcional)*: Configurações que sobrescrevem os padrões globais

#### scrape()

```typescript
async scrape(url: string, outputFormat?: OutputFormat): Promise<IScraperResult>
```

Realiza scraping de uma única URL.

**Parâmetros:**
- `url`: URL da página a ser raspada
- `outputFormat` *(opcional)*: Formato de saída ("json" | "html" | "xml" | "txt")

**Retorno:**
```typescript
interface IScraperResult {
  success: boolean;
  data?: any;
  error?: string;
  url: string;
  timestamp: number;
  statusCode?: number;
  headers?: Record<string, string>;
}
```

#### batchScrape()

```typescript
static async batchScrape(
  urls: string[], 
  options?: Partial<IScraperOptions>, 
  batchSize?: number
): Promise<IScraperResult[]>
```

Realiza scraping em lote com processamento paralelo.

**Parâmetros:**
- `urls`: Array de URLs para scraping
- `options` *(opcional)*: Configurações aplicadas a todas as requisições
- `batchSize` *(opcional)*: Número de requisições simultâneas (padrão: 5)

---

## 🔧 Serviços e Utilitários

### Proxy

Gerencia proxies automaticamente:

```typescript
// Obter proxy aleatório
const proxy = await Proxy.getRandomProxy();

// Validar proxy
const isValid = await Proxy.validateProxy(proxy);
```

### DataFormatter

Formata dados em diferentes formatos:

```typescript
const formattedData = DataFormatter.format(rawData, "xml");
```

### Security

Utilitários de segurança:

```typescript
// Headers seguros
const headers = Security.getSecureHeaders();

// Sanitizar entrada
const cleanInput = Security.sanitizeInput(userInput);

// Validar URL
const isSafe = Security.isUrlSafe(url);
```

### Delay

Controle de atrasos:

```typescript
// Delay aleatório
await Delay.randomDelay();

// Delay fixo
await Delay.fixedDelay(2000); // 2 segundos
```

### Logger

Sistema de logs estruturado:

```typescript
Logger.info("Iniciando scraping...");
Logger.success("Scraping concluído com sucesso!");
Logger.warn("Proxy lento detectado");
Logger.error("Falha na requisição", error);
Logger.debug("Dados de debug", { url, proxy });
```

---

## 📝 Exemplos de Uso

### Scraping Simples

```typescript
import { WebScraper } from './dist';

const scraper = new WebScraper();
const result = await scraper.scrape('https://httpbin.org/json');

console.log(result.data);
```

### Scraping com Proxy

```typescript
const scraper = new WebScraper({
  useRandomProxies: true,
  retryCount: 5
});

const result = await scraper.scrape('https://httpbin.org/ip');
```

### Scraping em Lote

```typescript
const urls = [
  'https://httpbin.org/json',
  'https://httpbin.org/headers',
  'https://httpbin.org/user-agent'
];

const results = await WebScraper.batchScrape(urls, {
  useRandomProxies: true
}, 2); // 2 requisições simultâneas

results.forEach(result => {
  console.log(`${result.url}: ${result.success ? '✅' : '❌'}`);
});
```

### Scraping Avançado

```typescript
const scraper = new WebScraper({
  timeout: 45000,
  retryCount: 3,
  useRandomProxies: true,
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.8,en;q=0.5,en-US;q=0.3',
    'Accept-Encoding': 'gzip, deflate',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  }
});

const result = await scraper.scrape('https://quotes.toscrape.com/', 'html');

if (result.success) {
  // Processar HTML com cheerio ou similar
  console.log('HTML obtido:', result.data.length, 'caracteres');
}
```

---

## 🛠️ Scripts Disponíveis

```bash
# Compilar TypeScript
npm run build

# Executar em modo desenvolvimento
npm run dev

# Executar testes
npm run test

# Verificar tipos TypeScript
npm run type-check

# Limpar arquivos compilados
npm run clean

# Executar exemplos
npm run example:basic
npm run example:advanced
```

---

## 🐛 Solução de Problemas

### Problemas Comuns

**Erro de Timeout:**
```typescript
// Aumente o timeout para sites lentos
const scraper = new WebScraper({ timeout: 60000 });
```

**Bloqueio por Rate Limiting:**
```typescript
// Aumente os delays entre requisições
const scraper = new WebScraper({
  minDelayBetweenRequests: 3000,
  maxDelayBetweenRequests: 8000
});
```

**Detecção de Bot:**
```typescript
// Use proxies e headers realistas
const scraper = new WebScraper({
  useRandomProxies: true,
  headers: SecurityUtils.getSecureHeaders()
});
```

### Debug Mode

Ative logs detalhados definindo a variável de ambiente:

```bash
DEBUG=true npm run start
```

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição

- Mantenha o código consistente com o estilo existente
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use commits semânticos (feat:, fix:, docs:, etc.)

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- [Axios](https://axios-http.com/) - Cliente HTTP robusto
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para JavaScript
- Comunidade open source pela inspiração e ferramentas

---

## 📞 Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/web-scraper-tool/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/web-scraper-tool/discussions)

---

<div align="center">
  
**⭐ Se este projeto te ajudou, considere dar uma estrela!**
</div>
