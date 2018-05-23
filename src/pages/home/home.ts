import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Events,ActionSheetController } from 'ionic-angular';
import { SocketProvider } from '../../providers/socket/socket'
import { AnswerPage } from '../answer/answer';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SocketProvider]
})
export class HomePage {
  availableForms:any = [];
  showInstructions: boolean = true;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private socket: SocketProvider, public loadingCtrl: LoadingController, public events: Events,public actionSheetCtrl: ActionSheetController) {
    if (localStorage.availableForms) {
      //Parse list of availableForms from localstorage to JSON
      //if localstorage item for availableForms exists
      this.availableForms = JSON.parse(localStorage.availableForms);
      if (this.availableForms.length > 0){
        this.showInstructions = false;
      }
    } else {
      //if localstorage item for availableForms doesn't exist then
      //create the item as an empty json stringified ("[]")
      localStorage.availableForms = JSON.stringify(this.availableForms);
    }
  }  

  //Remove form from available lists
  removeForm(form){
    //Confirmation alert before deleting form from available list
    let confirm = this.alertCtrl.create({
      title: '¿Desea borrar?',
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
            document.getElementById(form).style.transform = "translate(-350px)";
            document.getElementById(form).style.opacity = "0";
            
            //Actual removal of the form from the available list
            //The timeout is set 0.05s after the animation is finished.
            setTimeout(()=>{
              let index:number = this.availableForms.indexOf(form);
              this.availableForms.splice(index, 1);
              this.localSave();
              if (this.availableForms.length == 0){
                this.showInstructions = true;
              }
            }, 300);
          }
        }
      ]
    });
    confirm.present();
  }

  addForm(code: string){
    let formExists: boolean = false;
    //Define loader
    let loading = this.loadingCtrl.create({
      content: 'Buscando y cargando formulario...'
    });
    //Start loader
    loading.present();    

    for (let i: number = 0; i < this.availableForms.length; i++){
      if (this.availableForms[i].CODE == code){
        formExists = true;
      }
    }

    //Call getForm function in SocketProvider if there is no form with code
    if (!formExists){      
      this.socket.getForm(code);

      //Subscibe to 'addForm' in SocketProvider
      this.events.subscribe("addForm", (data) => {        
        //Once the message is receive unsuscribe
        this.events.unsubscribe("addForm");
        //If the transaction was succesfull then parse the SQL to a usable array.        
        if (data.success == true){
          //If the server returned at least 1 form.          
          if (data.data.recordset.length > 0){
            let questions: any = [];
            let prevQuestion: number = -1;
            
            for (let x = 0; x < data.data.recordset.length; x++){
              //If the question id is repeated then it must be because it has more than one option
              //If it has more than one option it will push the option instead of creating a new question
              if (prevQuestion == data.data.recordset[x].QUESTION_ID) {                
                questions[questions.length - 1].OPTIONS.push ({
                  "OPTION_CAPTION": data.data.recordset[x].OPTION_CAPTION,
                  "OPTION_VALUE": data.data.recordset[x].OPTION_VALUE
                });
              }else{
                //If it the first option then it will create the question.
                questions.push(
                  {
                    "TYPE": data.data.recordset[x].TYPE_ID,
                    "QUESTION": data.data.recordset[x].QUESTION,
                    "OPTIONS": [{
                      "OPTION_CAPTION": data.data.recordset[x].OPTION_CAPTION,
                      "OPTION_VALUE": data.data.recordset[x].OPTION_VALUE
                    }],
                    "ANSWER": ""             
                  }
                )
              }
              prevQuestion = data.data.recordset[x].QUESTION_ID
            }
            //The new form is created and the QUESTIONS array, now already properly parsed, 
            //is added in a property of the form
            this.availableForms.push(
              {
                "FORM_NAME": data.data.recordset[0].FORM_NAME,
                "DATE_CREATED": (data.data.recordset[0].DATE_CREATED).slice(0,10),
                "CODE": code,
                "QUESTIONS": questions
              }
            );            
            this.localSave()
            this.showInstructions = false;
          }else{
            this.showAlert("No existe esa encuesta", "No existe un formulario con el codigo ingresado");
            console.error("No existe un formulario con el codigo ingresado")
          }
        }else{          
          this.showAlert("¡Algo salió mal!", "Error al  hacer la transacción. " + data.data.number + ", " + data.data.originalError.message);
          console.error(data.data)
        }
        loading.dismiss();
      });

    }else{
      loading.dismiss();
      this.showAlert("Encuesta ya existe", "")      
    }    
  }

  localSave(){
    localStorage.availableForms = JSON.stringify(this.availableForms);
  }

  pushPage(form){
    // Push another page onto the navigation stack.
    // Causing the nav controller to transition to the new page.   
    this.navCtrl.push(AnswerPage, {
      formId: form
    });
  }


  //Default ionic input prompt
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Agregar formulario',
      message: "Escribir codigo de formulario a agregar",
      inputs: [
        {
          name: 'codigo',
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
            this.addForm(data.codigo.replace(/'/g,"").replace(/"/g,'').replace(/;/g,""));
            }else{
              this.showAlert("Codigo vacio","Debe ingresar un codigo para avanzar");
            }
          }
        }
      ]
    });
    prompt.present();
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


  //Default ionic actionsheet
  //This action sheet to delete a form
  formActionSheet(form: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones de formulario',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.removeForm(form)
          }
        },{
          text: 'Subir',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
