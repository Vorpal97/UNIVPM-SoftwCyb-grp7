# Progetto di Software Cybersecurity. A.A. 2020/2021
Manuel Manelli, Simone Cappella, Cristian Colavito, Fiorenza Bocchini, Prof. Luca Spalazzi
## Operazioni preliminari
### 1. Scaricare e installare sulla propria macchina l'ambiente [NodeJS](https://nodejs.org/en/ "NodeJS"), versione LTS.
### 2. Digitare dal terminale, in una nuova cartella, il comando `npx quorum-wizard` e selezionare la prima scelta denominata Quickstart
### 3. Dalla cartella corrente eseguire il comando `cd network/3-nodes-quickstart` per posizionarsi nella cartella contenente gli script di configurazione di Quorum
### 4. Digitare il comando `./start.sh` per avviare la Blockchain (`./stop.sh` per arrestarla)

------------

## Installazione del progetto
### 1. Clonare la repo (`git clone https://github.com/Vorpal97/UNIVPM-SoftwCyb-grp7`)
### 2. Posizionarsi nella cartella della repo
### 3. Eseguire il comando `npm i` per installare tutte le dipendenze

------------

## Avviare il sistema
### 1. Avviare la Blockchain come descritto al passo 3 e 4 delle operazioni preliminari ed attendere che cakeshop sia raggiungibile da browser all'indirizzo `http://localhost:8999`
### 2. Posizionarsi all'interno della cartella System della repo (UNIVPM-SoftwCyb-grp7/System)
### 3. Digitare il comando `node initialize.js` per inizializzare correttamente il sistema
### 4. Digitare il comando `node event_manager.js` per avviare la componente relativa all'Event Manager, raggiungibile dal browser all'indirizzo `https://localhost:10000`
### 4. Digitare il comando `node buyer.js` per avviare la componente relativa all'Buyer, raggiungibile dal browser all'indirizzo `https://localhost:10001`
### 4. Digitare il comando `node ticket_validator.js` per avviare la componente relativa all'Ticket Validator, raggiungibile dal browser all'indirizzo `https://localhost:10002`

------------

## Avvertenze
### 1. Il Browser potrebbe non riconoscere l'autenticità del certificato x509 utilizzato per la connessione HTTPS in quanto generato ed autofirmato da noi, per aggirare il problema è sufficiente procedere ugualmente oppure aggiungere l'eccezione alla lista dei certificati del browser per procedere.
### 2. La repo include sia il certificato x509 che la chiave privata utilizzati dal modulo Express per abilitare la navigazione in HTTPS. Per semplificare la procedura di installazione abbiamo deciso comunque di includerli ed esporre la chiave privata pubblicamente, cosa assolutamente da non fare in un contesto di utilizzo reale.
