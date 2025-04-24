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


# Padões GOF usados

## 1. Template Method
  Explicação: Define o esqueleto de um algoritmo na superclasse, permitindo que subclasses substituam etapas específicas sem alterar a estrutura geral.

  ![image](https://github.com/user-attachments/assets/42533d84-c3d3-4493-addd-745ba5fbc692)
  
Aqui, EventViewSet herda de ModelViewSet, que fornece a estrutura básica para operações CRUD. A classe EventViewSet pode sobrescrever métodos específicos para personalizar o comportamento, seguindo o padrão Template Method.  

  
## 2. Facade (Fachada)
Explicação: Fornece uma interface unificada para um conjunto de interfaces em um subsistema, facilitando o uso.

![image](https://github.com/user-attachments/assets/f0ec3528-d0ba-4a93-ac4b-49c11fc851da)

Essas funções atuam como uma fachada para as operações da API, simplificando as chamadas HTTP e abstraindo os detalhes de implementação.


## 3. Adapter (Adaptador)
Explicação: Permite que interfaces incompatíveis trabalhem juntas, convertendo a interface de uma classe em outra esperada pelos clientes.​

![image](https://github.com/user-attachments/assets/a243fa4e-76a3-45c3-9a2d-c03c34da45bc)


O EventSerializer adapta o modelo Event para um formato JSON, permitindo que o frontend consuma os dados de forma compatível.

