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
    let formExists: boolean = false;
    //Define loader
    const loading = await this.loadingCtrl.create({
      content: 'Buscando y cargando formulario...'
    });
    await loading.present();

    for (let i: number = 0; i < this.availableForms.length; i++){
      if (this.availableForms[i].CODE == code){
        formExists = true;
      }
    }

    //Call getForm function in SocketProvider if there is no form with code
    if (!formExists){      
      this.socket.transactionEmitter(code, 'getForm', 'addForm');

      //Subscibe to 'addForm' in SocketProvider
      this.events.subscribe('addForm', (data) => {
        let transaction: Transaction = data;
        //Once the message is receive unsuscribe
        this.events.unsubscribe('addForm');
        //If the transaction was succesfull then parse the SQL to a usable array.        
        if (transaction.success == true){
          //If the server returned at least 1 form.          
          if (transaction.data.recordset.length > 0){
            let questions: any = [];
            let prevQuestion: number = -1;
            
            for (let x = 0; x < transaction.data.recordset.length; x++){
              //If the question id is repeated then it must be because it has more than one option
              //If it has more than one option it will push the option instead of creating a new question
              if (prevQuestion == transaction.data.recordset[x].QUESTION_ID) {                
                questions[questions.length - 1].OPTIONS.push ({
                  'OPTION_CAPTION': transaction.data.recordset[x].OPTION_CAPTION,
                  'OPTION_VALUE': transaction.data.recordset[x].OPTION_VALUE
                });
              }else{
                //If it the first option then it will create the question.
                questions.push(
                  {
                    'TYPE': transaction.data.recordset[x].TYPE_ID,
                    'QUESTION': transaction.data.recordset[x].QUESTION,
                    'QUESTION_ID': transaction.data.recordset[x].QUESTION_ID,
                    'OPTIONS': [{
                      'OPTION_CAPTION': transaction.data.recordset[x].OPTION_CAPTION,
                      'OPTION_VALUE': transaction.data.recordset[x].OPTION_VALUE
                    }],
                    'ANSWER': ''             
                  }
                )
              }
              prevQuestion = transaction.data.recordset[x].QUESTION_ID
            }
            //The new form is created and the QUESTIONS array, now already properly parsed, 
            //is added in a property of the form
            this.availableForms.push(
              {
                'FORM_NAME': transaction.data.recordset[0].FORM_NAME,
                'DATE_CREATED': (transaction.data.recordset[0].DATE_CREATED).slice(0,10),
                'CODE': code,
                'QUESTIONS': questions,
                'FINISHED_DATE':'',
                'LAST_SLIDE': 0,
                'FILLED_NO': 0
              }
            );            
            this.localSave();
            this.showInstructions = false;
          }else{
            this.showAlert('No existe esa encuesta', 'No existe un formulario con el codigo ingresado');
            console.error('No existe un formulario con el codigo ingresado')
          }
        }else{          
          this.showAlert('¡Algo salió mal!', 'Error al  hacer la transacción. ' + transaction.data.number + ', ' + transaction.data.originalError.message);
          console.error(transaction.data)
        }
        this.presentToast("Formulario agregado exitosamente.")
        this.cdr.detectChanges();
        loading.dismiss();
      });

    }else{      
      loading.dismiss();
      this.showAlert('Encuesta ya existe', '')      
    }    
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
