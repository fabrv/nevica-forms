import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import * as io from "socket.io-client";

@Injectable()
export class SocketProvider {
  socket: any;
  address: string = "192.168.0.5"
  port: number = 8080;  
  serverAddress: string = "http://" + this.address + ":" + this.port;

  //This is a hex that will identify every transaction with the node server
  //EVERY Transaction MUST have a new random HEX to ID it
  transactionID: string;
  constructor(public events: Events) {}

  getForm(form: string){
    let success:boolean = false;
    //Random HEX to new transaction
    //EVERY Transaction MUST have a new random HEX to ID it
    this.transactionID = (Math.random() * 0xFFFFFF << 0).toString(16);   
    console.log("------" + this.transactionID + "-----") 

    //Socket connection
    this.socket = io.connect(this.serverAddress, {reconnection: false});
    this.socket.emit('getForm', form, this.transactionID);
        
    this.socket.on(this.transactionID, (data)=> {      
      //'AddForm' event, with array as response
      //If the server answered then the transaction was succesfull
      console.log(data)

      this.events.publish('addForm', {"success":data.success, "data": data.data});      
      this.socket.disconnect();
      success = true;
      return;
    });

    //5 seconds connection timeout
    setTimeout(()=>{      
      if (success == false){        
        this.socket.disconnect();
        //If the server timed-out then the transaction was unsuccesful
        this.events.publish('addForm', {"success":false, "data": {"number": 504, "originalError": {"message":"Tiempo de espera con el servidor ha terminado"}}});
      }
    },5000)
  }
}