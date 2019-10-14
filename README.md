# Teste back-end Solucx

## API de avaliações para medir a experiência dos clientes

## Instalação

Para levantar o sistema, basta seguir os seguintes passos.

1- Baixe o sistema e instale as dependências
```
$ git clone https://github.com/FernandoCendretti/teste-solucx
$ cd teste-solucx
$ npm install || yarn
```
2- Instale o <a href="https://docs.docker.com">Docker</a> para poder levantar o banco de dados

2.1- Certifique-se de que o docker esteja rodando, mude o "status", para "start" no comando, para iniciar caso esteja parado.
```
systemctl status docker
```

3- Com o docker instalado e rodando, basta executar o seguinte comando para levantar o banco de dados. Certifique-se de que a porta "3306" do seu computador não esteja ocupada.
```
sudo docker run -d -p 3306:3306 --name solucx -e "MYSQL_DATABASE=solucx_teste" -e "MYSQL_ROOT_PASSWORD=123123" mysql:5.7.27
```

3.1- Execute esse comando para verificar se o container está rodando.
```
sudo docker ps
```

4- Para executar o sistema basta utilizar o comando:

```
yarn dev
```
