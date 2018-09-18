import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular'
import * as io from 'socket.io-client';
import { Transaction } from './transaction-class'

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  socket: any;
  address: string = "10.0.3.159"
  port: number = 8080;  
  serverAddress: string = 'http://' + this.address + ':' + this.port;
  
  //This is a hex that will identify every transaction with the node server
  //EVERY Transaction MUST have a new random HEX to ID it
  transactions: any = [];
  constructor(public events: Events) { }

  transactionEmitter(value: any, transactionName: string, returnName: string){
    let transaction: Transaction = new Transaction();
    //Random HEX to new transaction
    //EVERY Transaction MUST have a new random HEX to ID it
    transaction.ID = (Math.random() * 0xFFFFFF << 0).toString(16);
    console.log('------' + transaction.ID + '-----');

    //Socket connection
    this.socket = io.connect(this.serverAddress, {reconnection: false});
    this.socket.emit(transactionName, value, transaction.ID);
    console.log('EMITTED');


    this.socket.on(transaction.ID, (data)=> {      
      //<<returnName>> event, with array as response
      //If the server answered then the transaction was succesfull

      transaction.success = data.success
      transaction.data = data.data


      this.events.publish(returnName, transaction);      
      this.socket.disconnect();
      transaction.success = true;
      return;
    });

    //5 seconds connection timeout
    setTimeout(()=>{      
      if (transaction.success == false){
        this.socket.disconnect();
        //If the server timed-out then the transaction was unsuccesful
        this.events.publish(returnName, {'success':false, 'data': {'number': 504, 'originalError': {'message':'Tiempo de espera con el servidor ha terminado'}}});
      }
    },5000)

    
  }
}
