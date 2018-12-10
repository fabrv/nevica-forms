import { Component, ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../socket.service'
import { Events, AlertController, LoadingController, ActionSheetController, ToastController } from '@ionic/angular'
import { Transaction } from '../transaction-class'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [SocketService]
})
export class HomePage {
  availableForms:any = [];
  showInstructions: boolean = true;
  finishedForms: any = [];

  constructor( public events: Events, public alertCtrl: AlertController, public socket: SocketService, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, private cdr:ChangeDetectorRef, public toastController: ToastController, private router: Router ){

    if (localStorage.availableForms) {
      //Parse list of availableForms from localstorage to JSON
      //if localstorage item for availableForms exists
      this.availableForms = JSON.parse(localStorage.availableForms);
      if (this.availableForms.length > 0){
        this.showInstructions = false;
      }
    } else {
      //if localstorage item for availableForms doesn't exist then
      //create the item as an empty json stringified ('[]')
      localStorage.availableForms = JSON.stringify(this.availableForms);
    }

    this.events.subscribe('finishedFormsChanged', () => {
      if (localStorage.finishedForms){
        this.finishedForms = JSON.parse(localStorage.finishedForms);
      }
    });
  }


  //Remove form from available lists
  async removeForm(form){
    //Confirmation alert before deleting form from available list
    const confirm = await this.alertCtrl.create({
      header: '¿Desea borrar?',
      message: 'Al borrar el formulario tambien se perderá cualquier información no enviada, ¿está seguro?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Si',
          handler: () => {
            //Animation for form removal
            //Move form item 300px to the right and fade it
            document.getElementById(form).style.transform = 'translate(-350px)';
            document.getElementById(form).style.opacity = '0';
            
            //Actual removal of the form from the available list
            //The timeout is set 0.05s after the animation is finished.
            setTimeout(()=>{
              let index:number = this.availableForms.indexOf(form);
              this.availableForms.splice(index, 1);
              this.localSave();              
              if (this.availableForms.length == 0){
                this.showInstructions = true;
                this.cdr.detectChanges();
                this.presentToast("Formulario borrado exitosamente.")
              }
            }, 300);
          }
        }
      ]
    });
    await confirm.present();
  }



  async addForm(code: string){
        
  }


  localSave(){
    localStorage.availableForms = JSON.stringify(this.availableForms);
  }


  //Default ionic input prompt
  async showPrompt() {
    let prompt = await this.alertCtrl.create({
      header: 'Agregar formulario',
      message: 'Escribir codigo de formulario a agregar',
      inputs: [
        {
          name: 'codigo',
          type: 'text',
          placeholder: 'Codigo'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Agregar',
          handler: data => {
            //Add form function
            if (data.codigo){
              this.addForm(data.codigo.replace(/'/g,'').replace(/'/g,'').replace(/;/g,''));
            }else{
              this.showAlert('Codigo vacio','Debe ingresar un codigo para avanzar');
            }
          }
        }
      ]
    });
    await prompt.present();
  }


  //Default ionic alert prompt
  async showAlert(title:string, subTitle:string) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subTitle,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  //Default ionic actionsheet
  //This action sheet to delete a form
  async formActionSheet(form: string) {
    console.log("ENTERED")
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones de formulario',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.removeForm(form)
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }

  pushPage(form){
    this.router.navigate(['/answer', { formId: form }]);
  }
}
