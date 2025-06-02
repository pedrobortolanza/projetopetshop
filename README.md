# 🐾 Petshop Peterson

Sistema web para gerenciamento de serviços, agendamentos e tutores de pets.  
Desenvolvido com foco em **facilidade de uso**, **design responsivo** e **organização de dados**.

---

## 🚀 Tecnologias Utilizadas

### 🧠 Back-end:
- .NET 9 com ASP.NET Core Web API
- Entity Framework Core
- Migrations + Code First
- CORS e Swagger habilitados

### 💻 Front-end:
- React + Vite
- Axios para requisições HTTP
- TailwindCSS para estilização
- React Toastify para notificações elegantes

### 💾 Banco de Dados:
- MySQL

---

## ✨ Funcionalidades

### 📋 Tutores
- Cadastro de tutores com dados básicos
- Associação de **Logradouro** (endereço) ao tutor

### 💼 Serviços
- Cadastro de serviços (Ex: Banho, Tosa)
- Associação de tutor ao serviço
- Campo de valor com precisão decimal
- Marcação de serviços como **inativos** para ocultar do agendamento

### 🗓️ Agendamentos
- Seleção de serviços disponíveis
- Escolha de data, hora e nome do pet
- Relacionamento automático com o tutor via serviço
- Marcação de agendamento como **concluído**
- Listagem com descrição dos serviços, valor, tutor e status

---

## 🖼️ Telas Disponíveis

- Página inicial (`Home`)
- Cadastro de Tutor (`/cadastrar-tutor`)
- Cadastro de Serviço (`/cadastrar-servico`)
- Agendar Serviço (`/agendar-servico`)
- Listar Agendamentos (`/agendamentos`)
- Login (estático)

---
