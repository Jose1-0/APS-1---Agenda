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

Passos adicionais para configurar as notificações push:
Instalar o Docker e rodar o Redis
O Redis será usado pelo Celery para armazenar tarefas assíncronas, que são necessárias para enviar as notificações.

Instalar o Docker:

Acesse Docker e baixe o Docker Desktop para o seu sistema operacional.

Após a instalação, inicie o Docker.

Rodar o Redis com Docker:
Execute o seguinte comando no terminal para rodar o Redis em um container:

  docker run -d -p 6379:6379 --name redis redis

Verifique se o Redis está em execução:

  docker ps

Configurar as VAPID keys para as notificações push
O Django precisa das chaves VAPID para enviar as notificações. Você pode gerar essas chaves.

No terminal, no diretório backend (dentro da venv), execute:

  python generate_vapid_keys.py

Copie as chaves públicas e privadas geradas e abra o arquivo .env no diretório backend com as seguintes variáveis:

  VAPID_PUBLIC_KEY=SEU_PUBLIC_KEY
  VAPID_PRIVATE_KEY=SEU_PRIVATE_KEY

Essas chaves são usadas para autenticar o servidor e garantir a segurança nas notificações.

Rodar o Celery para agendamento de tarefas
O Celery é necessário para rodar as tarefas agendadas que verificam os eventos e enviam as notificações.

Abrir dois terminais:

No primeiro terminal, execute o Celery Worker:

  celery -A agenda worker --loglevel=info --pool=solo

Rodar as migrações:

No segundo terminal, precisa rodar as migrações para criar as tabelas necessárias. Execute o seguinte comando na venv:

  python manage.py migrate django_celery_beat

Execute o Celery Beat para agendar as tarefas:

  celery -A agenda beat --loglevel=info

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

## 4. Active Record
Explicação: Cada objeto representa uma linha no banco de dados e possui métodos para persistência.

Trecho do Código:

![image](https://github.com/user-attachments/assets/f10bad97-d365-4f56-bc36-7066b30fab19)

A classe Event representa uma tabela no banco de dados e inclui métodos para salvar, atualizar e deletar registros, seguindo o padrão Active Record.

## 5. Singleton
Explicação: Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela.

Trecho do Código:

![image](https://github.com/user-attachments/assets/5707ebbb-55c5-457b-a254-af12de2bef59)

A configuração da aplicação EventsConfig é instanciada uma única vez durante o ciclo de vida da aplicação Django, exemplificando o padrão Singleton.

## 6. Observer (Observador)
Explicação: Define uma dependência um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados.

Trecho do Código:

![image](https://github.com/user-attachments/assets/5a6630ee-6443-4d83-a222-2e3b75f11ec5)

O useEffect observa mudanças no estado e atualiza os componentes conforme necessário, seguindo o padrão Observer.

## 7. Strategy (Estratégia)
Explicação: Define uma família de algoritmos, encapsula cada um deles e os torna intercambiáveis.

Trecho do Código:

![image](https://github.com/user-attachments/assets/95cbe352-9af1-4f8f-bc6d-5d08b4eaa0ac)

O componente Calendar permite alternar entre diferentes visualizações (mês, semana, dia), cada uma representando uma estratégia de exibição.

## 8. Command (Comando)
Explicação: Encapsula uma solicitação como um objeto, permitindo parametrizar clientes com diferentes solicitações.

Trecho do Código:

![image](https://github.com/user-attachments/assets/62ebca5f-8efc-4b1a-a6fe-34c72fd1a521)

A função handleAddEvent encapsula a ação de adicionar um evento, permitindo que seja chamada de diferentes partes do código, seguindo o padrão Command.

## 9. Composite (Composto)
Explicação: Compõe objetos em estruturas de árvore para representar hierarquias parte-todo, permitindo que clientes tratem objetos individuais e composições de objetos de maneira uniforme.

Trecho do Código:

![image](https://github.com/user-attachments/assets/5d80ec15-7dc0-4e92-b6fe-f2cbb47d87a3)

O CalendarComponent é composto por subcomponentes como CustomAgendaEvent, permitindo a construção de interfaces complexas a partir de componentes simples, exemplificando o padrão Composite.

## 10. Decorator (Decorador)
Explicação: Anexa responsabilidades adicionais a um objeto dinamicamente, proporcionando uma alternativa flexível à subclasse.

Trecho do Código:
![image](https://github.com/user-attachments/assets/3f549d2a-dd57-4d77-977e-2dc63afe110e)

O CustomAgendaEvent adiciona estilos e estrutura ao evento exibido, funcionando como um decorador que adiciona funcionalidades sem alterar o objeto original.

