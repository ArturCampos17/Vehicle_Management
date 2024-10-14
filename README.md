# Gestão de Veículos

Este projeto é uma API desenvolvida em Node.js para gerenciar informações sobre marcas, modelos e versões de veículos. O aplicativo utiliza o Sequelize como ORM para interagir com um banco de dados SQLite, facilitando a criação, leitura, atualização e exclusão de registros.

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Endpoints da API](#endpoints-da-api)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição do Projeto

O objetivo deste projeto é fornecer uma API RESTful que permite aos usuários gerenciar informações sobre veículos. Os usuários podem adicionar, visualizar e gerenciar marcas, modelos e versões de veículos.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para Node.js que facilita a interação com o banco de dados.
- **SQLite**: Banco de dados leve para armazenamento de dados.
- **Postman**: Ferramenta para testar APIs.

## Instalação

Para instalar e configurar o projeto, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd nome-do-repositorio
   ```
3. Navegue até o diretório do projeto:
   ```bash
   npm install
   ```
4. Navegue até o diretório do projeto:
   ```bash
   npm start
   ```
  
  
   
   O servidor estará rodando na porta 3000 por padrão.

Uso
Após iniciar o servidor, você pode interagir com a API utilizando ferramentas como o Postman ou cURL. A API fornece várias rotas para gerenciar marcas, modelos e versões.

Exemplo de Requisições

<li>Adicionar uma Marca</li>

Endpoint: POST /api/brands

```json
{
    "name": "Toyota"
}
```

<li>Adicionar um Modelo</li>

Endpoint: POST /api/models

```json
{
    "name": "Corolla",
    "id_brand": 1
}
```
<li>Adicionar uma Versão</li>

Endpoint: POST /api/versions

```json
{
    "name": "2021",
    "id_model": 1
}
```
## Endpoints da API

### 1. Criar Marca

- **Método:** `POST`
- **URL:** `/api/brands`
- **Descrição:** Cria uma nova marca.
- **Corpo da Requisição:**
    ```json
    {
        "name": "Nome da Marca"
    }
    ```
- **Resposta de Sucesso:**
    ```json
    {
        "message": "Marca criada com sucesso.",
        "brand": {
            "id": 1,
            "name": "Nome da Marca"
        }
    }
    ```
- **Resposta de Erro:**
    ```json
    {
        "error": "Mensagem de erro específica."
    }
    ```

---

### 2. Listar Marcas

- **Método:** `GET`
- **URL:** `/api/brands`
- **Descrição:** Retorna uma lista de todas as marcas.
- **Resposta de Sucesso:**
    ```json
    [
        {
            "id": 1,
            "name": "Nome da Marca 1"
        },
        {
            "id": 2,
            "name": "Nome da Marca 2"
        }
    ]
    ```

---

### 3. Criar Modelo

- **Método:** `POST`
- **URL:** `/api/models`
- **Descrição:** Cria um novo modelo associado a uma marca.
- **Corpo da Requisição:**
    ```json
    {
        "name": "Nome do Modelo",
        "id_brand": 1
    }
    ```
- **Resposta de Sucesso:**
    ```json
    {
        "message": "Modelo criado com sucesso.",
        "model": {
            "id_model": 1,
            "name": "Nome do Modelo",
            "id_brand": 1
        }
    }
    ```

---

### 4. Criar Versão

- **Método:** `POST`
- **URL:** `/api/versions`
- **Descrição:** Cria uma nova versão associada a um modelo.
- **Corpo da Requisição:**
    ```json
    {
        "name": "Nome da Versão",
        "id_model": 1
    }
    ```
- **Resposta de Sucesso:**
    ```json
    {
        "message": "Versão criada com sucesso.",
        "version": {
            "id_version": 1,
            "name": "Nome da Versão",
            "id_model": 1
        }
    }
    ```

---

### Observações

- Certifique-se de substituir os exemplos de dados e mensagens de erro pelas informações reais do seu aplicativo.
- Você pode adicionar mais detalhes, como autenticação, requisitos de cabeçalho e outros aspectos relevantes para o uso da API.

### Conclusão

Essa estrutura ajuda os desenvolvedores que utilizam sua API a entender rapidamente como fazer requisições e o que esperar como resposta. Você pode adaptar e expandir conforme necessário para abranger todos os endpoints e suas particularidades.
