import { Component } from '@angular/core';

import { Platform, Events, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { BackendService } from './services/backend.service'
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public forms: Array<any> = [];
  uploadedForms: Array<any> = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private loadingCtrl: LoadingController,
    private backend: BackendService,
    private toastController: ToastController,
    private alertController: AlertController,
    private strgService: StorageService    
  ) {
    this.initializeApp();

    if (localStorage.finishedForms){
      this.forms = JSON.parse(localStorage.finishedForms);
    }

    this.events.subscribe('formsChanged', ()=>{
      if (localStorage.finishedForms){
        this.forms = JSON.parse(localStorage.finishedForms);
      }
    })
  }

  async upload(){
    //Define loader
    let loading = await this.loadingCtrl.create({
      message: 'Subiendo formulario(s)'
    });
    //Present loader
    await loading.present();

    const response = await this.backend.postForms(this.forms);

    if (response.status){
      //Get current date and format it in YYYY-MM-DD HH:mm:SS
      let currentdate = new Date();
      {
        var datetime:string = currentdate.getFullYear() + '-'
                        + (currentdate.getMonth()+1)  + '-'
                        + currentdate.getDate() + ' '
                        + currentdate.getHours() + ':'
                        + currentdate.getMinutes() + ':'
                        + currentdate.getSeconds()
      }
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
      this.strgService.updateFinishedForms()
    }else{
      this.showAlert('¡Algo salió mal!', `Error al  hacer la transacción. ${response.error}`);
      console.error(response.error)
    }
    loading.dismiss();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  //Default ionic alert prompt
  async showAlert(title:string, subTitle:string) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subTitle,
      buttons: ['OK']
    });
    await alert.present();
  }
}
