import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, ToastController, AlertController } from 'ionic-angular';
import { FormPage } from '../form/form';
import { SocketProvider } from '../../providers/socket/socket'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [SocketProvider]
})
export class ListPage {
  forms:any = [];
  uploadedForms: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private socket: SocketProvider, public events: Events, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    //Create variables for uploaded forms and finishedforms in localstorage if...
    //they don't exist
    //('[]' is of course an empty array)
    if (!localStorage.finishedForms){
      localStorage.finishedForms = '[]'
    }
    if (!localStorage.uploadedForms){
      localStorage.uploadedForms = '[]'
    }
    //'Parse them bois' in local variables
    this.forms = JSON.parse(localStorage.finishedForms);
    this.uploadedForms = JSON.parse(localStorage.uploadedForms);
  }

  pushPage(datetime){
    // Push another page onto the navigation stack.
    // Causing the nav controller to transition to the new page.   
    this.navCtrl.push(FormPage, {
      date: datetime
    });
  }

  upload(){
    //Define loader
    let loading = this.loadingCtrl.create({
      content: 'Subiendo formulario(s)'
    });
    //Present loader
    loading.present();
    
    //Start emitter with all the forms to be uploaded
    //The event to be returned will be 'formsuploaded'
    this.socket.transactionEmitter(this.forms,'insertFilledForms','formsUploaded')


    //The socket will return with the event 'formsUploaded' so here we subscribe to said event
    this.events.subscribe('formsUploaded', (data) => {
      //Once the message is receive unsuscribe
      this.events.unsubscribe('formUploaded');
      if (data.success == true){     
        //Get current date and format it in YYYY-MM-DD HH:mm:SS
        let currentdate = new Date(); 
        let datetime:string = currentdate.getFullYear() + '-'
                        + (currentdate.getMonth()+1)  + '-'
                        + currentdate.getDate() + ' '
                        + currentdate.getHours() + ':'
                        + currentdate.getMinutes() + ':'
                        + currentdate.getSeconds()
        //Pass the name and the uploaded date of the forms to another variable
        for (let f = 0; f < this.forms.length; f++){
          this.uploadedForms.push({
            'FORM_NAME': this.forms[f].FORM_NAME,
            'UPLOADED_DATE': datetime
          })
        }
        //Push uploadedForms to localstorage
        localStorage.uploadedForms = JSON.stringify(this.uploadedForms)        
        //Clear the finished forms variables
        this.forms = [];
        localStorage.finishedForms = '[]'
        //Give the user a cue that the forms have been succesfully uploaded
        //(The cue will be a standard ionic Toast)
        this.presentToast('Formularios exitosamente subidos')
      }else{
        this.showAlert('¡Algo salió mal!', 'Error al  hacer la transacción. ' + data.data.number + ', ' + data.data.originalError.message);
        console.error(data.data)        
      }
      loading.dismiss()
    })
  }

  //Default ionic toast
  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  //Default ionic alert prompt
  showAlert(title:string, subTitle:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}