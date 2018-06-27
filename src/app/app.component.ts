import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SocketProvider } from '../providers/socket/socket';
import { StorageSaveProvider } from '../providers/storage-save/storage-save';

@Component({
  templateUrl: 'app.html',
  providers: [SocketProvider, StorageSaveProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  forms:any = [];
  uploadedForms: any = [];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public loadingCtrl: LoadingController, private socket: SocketProvider, public events: Events, public toastCtrl: ToastController, public alertCtrl: AlertController, public storageSave: StorageSaveProvider) {
    this.initializeApp();

    if (localStorage.finishedForms){
      this.forms = JSON.parse(localStorage.finishedForms);
    }

    this.events.subscribe('finishedFormsChanged', () => {
      if (localStorage.finishedForms){
        this.forms = JSON.parse(localStorage.finishedForms);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(ListPage);
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

        //Publish change in finishedForms, this will change the badge number in the homescreen
        this.storageSave.updateFinishedForms();
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
