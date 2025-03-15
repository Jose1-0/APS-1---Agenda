# APS-1---Agenda
APS 1 - Arquitetura de Software - Agenda

Este projeto consiste em uma agenda com funcionalidades de CRUD de eventos, notificações e criticidade. Ele foi desenvolvido usando **Django** no backend e **React** no frontend.

## Para rodar local será necessário já ter instalado:
- Python
- Node.js

### Configuração do ambiente local:
cd backend

Crie e ative um ambiente virtual (venv)
Windows:
python -m venv venv (só na primeira vez)
venv\Scripts\activate

MacOS:
python3 -m venv venv (só na primeira vez)
source venv/bin/activate

Instalar dependências Django:
pip install -r requirements.txt

Migrations do banco SQlite:
python manage.py migrate

Executar servidor:
python manage.py runserver

Retorne para a pasta raiz:
cd ..

Configurar Frontend React:
cd frontend

Instalar dependências React:
npm install

Rodar servidor React:
npm start

# FIM

# Comandos úteis Django:
Criar superuser no Django:
python manage.py createsuperuser

Criar e aplicar Migrations (banco de dados):
python manage.py makemigrations
python manage.py migrate

