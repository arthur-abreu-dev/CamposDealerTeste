# Teste de programação para a empresa Campos Dealer

# Instruções:
Para executar o frontend - Executar linha de comando a partir da pasta camposDealerApp, executar comando npm start
Obs.: Adaptar a url para o backend de acordo com a porta em que o mesmo for rodar, atualmente configurado no arquivo config.service.ts para a ur 'https://localhost:7038/'.

Para executar o backend: Abrir o projeto no visual studio a partir da pasta CamposDealerAPI e executar como http ou https.
Obs.: Adaptar a url para o banco de dados de acordo com o caminho onde o servidor do banco está alocado. Alterar o caminho no arquivo appsettings.json. Atualmente está configurado para a maquina local do dev com configuração de certificado SSL confiado a maquina. Caso necessário, adicionar usuário e senha eitando a informação "DefaultConnection" com o comando "User ID=YOUR_USER_ID;Password=YOUR_PASSWORD;".

Para executar o banco de dados: Importar o banco a partir da pasta CamposDealerDB, tendo como opção a importação de arquivo .bak ou criação do banco a partir do arquivo CriacaoTabelas. 
Obs.: De preferencia usar configuração simples com certificado SSL emitido pela maquina, sem usuário.
