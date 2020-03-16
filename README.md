# MEVN-ChatApp

## Local Installation

### Prerequisites

Machine should have NPM, NodeJS and MongoDB installed. The following instructions go through installation in Ubuntu.

Before you install any packages, ensure your package list is up to date with:

    sudo apt-get update

#### Install npm

    sudo apt-get install -y npm

#### Install node

    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable

#### Install MongoDB

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

    sudo apt-get install -y mongodb-org


### Clone

Clone this repo to your local machine

    git clone https://github.com/rkpattnaik780/MEVN-ChatApp.git

### Installing dependencies

#### Install client dependencies

    npm install

#### Install server dependencies

    cd server/
    npm install

### Running the server

    npm start #in server directory

### Running the client

    npm run serve

Visit [http//localhost:8080](http:localhost:8080) in your browser.

### Local Setup using Docker

Ensure you have docker and docker-compose installed in your system.

* Install [docker](https://docs.docker.com/install/)
* Install [docker-compose](https://docs.docker.com/compose/install/)

Make your server connect to `mongodb://mongo:27017/oauth-test` in `server/app.js`.

#### Build the services

    sudo docker compose build

#### Create and start the containers

    sudo docker compose up

Visit [http//localhost:8080](http:localhost:8080) in your browser.