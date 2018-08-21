webpackJsonp([2],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnswerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_save_storage_save__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AnswerPage = (function () {
    function AnswerPage(navCtrl, navParams, storageSave, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storageSave = storageSave;
        this.toastCtrl = toastCtrl;
        this.formId = '';
        this.forms = [];
        this.form = [];
        this.forms = JSON.parse(localStorage.availableForms);
        this.formId = navParams.get('formId');
        for (var x = 0; x < this.forms.length; x++) {
            if (this.forms[x].FORM_NAME == this.formId) {
                this.form = this.forms[x];
            }
        }
    }
    AnswerPage.prototype.ionViewDidEnter = function () {
        //Move the slides to the last question filled      
        this.slides.slideTo(this.form.LAST_SLIDE, 200);
        //This will disable the swiping between the slides (questions)
        this.slides.lockSwipes(true);
    };
    AnswerPage.prototype.nextSlide = function () {
        //The sliding must be reenabled to move to the next slide    
        this.slides.lockSwipes(false);
        //The parameter is the time for the animation in milliseconds
        this.slides.slideNext(200);
        //After the animation is donde then disable the swiping again
        this.slides.lockSwipes(true);
        //Change lastSlide ID
        this.form.LAST_SLIDE = this.slides.getActiveIndex();
        localStorage.availableForms = JSON.stringify(this.forms);
    };
    AnswerPage.prototype.prevSlide = function () {
        //Same comments as in next slide but for prevslides
        this.slides.lockSwipes(false);
        this.slides.slidePrev(200);
        this.slides.lockSwipes(true);
        this.form.LAST_SLIDE = this.slides.getActiveIndex();
        localStorage.availableForms = JSON.stringify(this.forms);
    };
    AnswerPage.prototype.finishForm = function () {
        //Get current date and format it in YYYY-MM-DD HH:mm:SS
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + '-'
            + (currentdate.getMonth() + 1) + '-'
            + currentdate.getDate() + ' '
            + currentdate.getHours() + ':'
            + currentdate.getMinutes() + ':'
            + currentdate.getSeconds();
        this.form.FINISHED_DATE = datetime;
        this.form.LAST_SLIDE = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(0, 200);
        this.slides.lockSwipes(true);
        this.form.FILLED_NO += 1;
        if (localStorage.finishedForms) {
            var finishedForms = [];
            finishedForms = JSON.parse(localStorage.finishedForms);
            finishedForms.push(this.form);
            localStorage.finishedForms = JSON.stringify(finishedForms);
        }
        else {
            localStorage.finishedForms = JSON.stringify([this.form]);
        }
        for (var i = 0; i < this.form.QUESTIONS.length; i++) {
            this.form.QUESTIONS[i].ANSWER = '';
        }
        localStorage.availableForms = JSON.stringify(this.forms);
        this.storageSave.updateFinishedForms();
        this.presentToast('Formulario finalizado y guardado.');
    };
    //Default ionic toast
    AnswerPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */])
    ], AnswerPage.prototype, "slides", void 0);
    AnswerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-answer',template:/*ion-inline-start:"/home/travis/build/fabrv/SalmonPier/src/pages/answer/answer.html"*/'<ion-header no-border>\n\n  <ion-navbar>\n    <ion-title>{{formId}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-slides>\n\n    <ion-slide *ngFor="let item of form.QUESTIONS; let last = last">\n      <h2>{{item.QUESTION}}</h2>\n      <ion-list inset id="input-list">\n        <ion-input [(ngModel)]="item.ANSWER" *ngIf="item.TYPE == 2" type="text" value="" placeholder="Respuesta"></ion-input>\n        <ion-input [(ngModel)]="item.ANSWER" *ngIf="item.TYPE == 7" type="number" pattern="[0-9]*" value="" placeholder="Respuesta"></ion-input>        \n        <ion-input [(ngModel)]="item.ANSWER" *ngIf="item.TYPE == 10" type="email" value="" placeholder="Respuesta"></ion-input>\n        <ion-input [(ngModel)]="item.ANSWER" *ngIf="item.TYPE == 11" type="tel" value="" placeholder="Respuesta"></ion-input>\n      </ion-list>\n      \n      <p class="color-gray" *ngIf="item.TYPE == 9">Presionar en el boton para elegir color</p>\n      <input [(ngModel)]="item.ANSWER" *ngIf="item.TYPE == 9" type="color" class="input-color">\n\n      <ion-list [(ngModel)]="item.ANSWER" *ngIf="item.TYPE == 5" radio-group>\n        <ion-item>\n          <ion-label>Si</ion-label>\n          <ion-radio value="1"></ion-radio>\n        </ion-item>\n      \n        <ion-item>\n          <ion-label>No</ion-label>\n          <ion-radio value="0"></ion-radio>\n        </ion-item>\n      </ion-list>\n\n      <ion-list [(ngModel)]="item.ANSWER" *ngIf="item.TYPE == 1" radio-group>\n        <ion-item *ngFor="let option of item.OPTIONS">\n          <ion-label>{{option.OPTION_CAPTION}}</ion-label>\n          <ion-radio value="{{option.OPTION_VALUE}}"></ion-radio>\n        </ion-item>\n      </ion-list>\n\n      <ion-range [(ngModel)]="item.ANSWER" *ngIf="item.TYPE == 6"></ion-range>\n      \n      <ion-list inset class="datetime" *ngIf="item.TYPE == 8">\n        <ion-item>\n          <ion-label>Seleccionar fecha</ion-label>\n          <ion-datetime [(ngModel)]="item.ANSWER" displayFormat="DD/MM/YYYY"></ion-datetime>\n        </ion-item>\n      </ion-list>\n\n      <input *ngIf="item.TYPE == 4" [(ngModel)]="item.ANSWER" type="file" accept="image/*" capture="camera" />\n\n      <button ion-button (click)="prevSlide()"clear>Anterior</button>\n      <button ion-button (click)="nextSlide()" *ngIf="last == false">Siguiente</button>\n      <br>\n      <button ion-button (click)="finishForm()" *ngIf="last" large>Finalizar</button>\n    </ion-slide>\n    \n  </ion-slides>\n    \n  <div class="progress" [style.width]="(this.form.LAST_SLIDE/(this.form.QUESTIONS.length - 1))*100 + \'%\'">    \n    <div class="progress-shadow"></div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/fabrv/SalmonPier/src/pages/answer/answer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_save_storage_save__["a" /* StorageSaveProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], AnswerPage);
    return AnswerPage;
}());

//# sourceMappingURL=answer.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FormPage = (function () {
    function FormPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datetime = '';
        this.questions = [];
        var forms = JSON.parse(localStorage.finishedForms);
        this.datetime = navParams.get('date');
        for (var x = 0; x < forms.length; x++) {
            if (forms[x].FINISHED_DATE == this.datetime) {
                this.formName = forms[x].FORM_NAME;
                this.questions = forms[x].QUESTIONS;
            }
        }
    }
    FormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-form',template:/*ion-inline-start:"/home/travis/build/fabrv/SalmonPier/src/pages/form/form.html"*/'<ion-header no-border>\n  <ion-navbar>\n    <ion-title>{{formName}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list no-lines>\n      <ion-item class="question-list" *ngFor="let item of questions">\n        <h2>{{item.QUESTION}}</h2>\n        <p>{{item.ANSWER}}</p>        \n      </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/fabrv/SalmonPier/src/pages/form/form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], FormPage);
    return FormPage;
}());

//# sourceMappingURL=form.js.map

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 122;

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/answer/answer.module": [
		318,
		1
	],
	"../pages/form/form.module": [
		319,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 163;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__answer_answer__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, socket, loadingCtrl, events, actionSheetCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.socket = socket;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.availableForms = [];
        this.showInstructions = true;
        this.finishedForms = [];
        if (localStorage.availableForms) {
            //Parse list of availableForms from localstorage to JSON
            //if localstorage item for availableForms exists
            this.availableForms = JSON.parse(localStorage.availableForms);
            if (this.availableForms.length > 0) {
                this.showInstructions = false;
            }
        }
        else {
            //if localstorage item for availableForms doesn't exist then
            //create the item as an empty json stringified ('[]')
            localStorage.availableForms = JSON.stringify(this.availableForms);
        }
        this.events.subscribe('finishedFormsChanged', function () {
            if (localStorage.finishedForms) {
                _this.finishedForms = JSON.parse(localStorage.finishedForms);
            }
        });
    }
    //Remove form from available lists
    HomePage.prototype.removeForm = function (form) {
        var _this = this;
        //Confirmation alert before deleting form from available list
        var confirm = this.alertCtrl.create({
            title: '¿Desea borrar?',
            message: 'Al borrar el formulario tambien se perderá cualquier información no enviada, ¿está seguro?',
            buttons: [
                {
                    text: 'No'
                },
                {
                    text: 'Si',
                    handler: function () {
                        //Animation for form removal
                        //Move form item 300px to the right and fade it
                        document.getElementById(form).style.transform = 'translate(-350px)';
                        document.getElementById(form).style.opacity = '0';
                        //Actual removal of the form from the available list
                        //The timeout is set 0.05s after the animation is finished.
                        setTimeout(function () {
                            var index = _this.availableForms.indexOf(form);
                            _this.availableForms.splice(index, 1);
                            _this.localSave();
                            if (_this.availableForms.length == 0) {
                                _this.showInstructions = true;
                            }
                        }, 300);
                    }
                }
            ]
        });
        confirm.present();
    };
    HomePage.prototype.addForm = function (code) {
        var _this = this;
        var formExists = false;
        //Define loader
        var loading = this.loadingCtrl.create({
            content: 'Buscando y cargando formulario...'
        });
        //Start loader
        loading.present();
        for (var i = 0; i < this.availableForms.length; i++) {
            if (this.availableForms[i].CODE == code) {
                formExists = true;
            }
        }
        //Call getForm function in SocketProvider if there is no form with code
        if (!formExists) {
            this.socket.transactionEmitter(code, 'getForm', 'addForm');
            //Subscibe to 'addForm' in SocketProvider
            this.events.subscribe('addForm', function (data) {
                //Once the message is receive unsuscribe
                _this.events.unsubscribe('addForm');
                //If the transaction was succesfull then parse the SQL to a usable array.        
                if (data.success == true) {
                    //If the server returned at least 1 form.          
                    if (data.data.recordset.length > 0) {
                        var questions = [];
                        var prevQuestion = -1;
                        for (var x = 0; x < data.data.recordset.length; x++) {
                            //If the question id is repeated then it must be because it has more than one option
                            //If it has more than one option it will push the option instead of creating a new question
                            if (prevQuestion == data.data.recordset[x].QUESTION_ID) {
                                questions[questions.length - 1].OPTIONS.push({
                                    'OPTION_CAPTION': data.data.recordset[x].OPTION_CAPTION,
                                    'OPTION_VALUE': data.data.recordset[x].OPTION_VALUE
                                });
                            }
                            else {
                                //If it the first option then it will create the question.
                                questions.push({
                                    'TYPE': data.data.recordset[x].TYPE_ID,
                                    'QUESTION': data.data.recordset[x].QUESTION,
                                    'QUESTION_ID': data.data.recordset[x].QUESTION_ID,
                                    'OPTIONS': [{
                                            'OPTION_CAPTION': data.data.recordset[x].OPTION_CAPTION,
                                            'OPTION_VALUE': data.data.recordset[x].OPTION_VALUE
                                        }],
                                    'ANSWER': ''
                                });
                            }
                            prevQuestion = data.data.recordset[x].QUESTION_ID;
                        }
                        //The new form is created and the QUESTIONS array, now already properly parsed, 
                        //is added in a property of the form
                        _this.availableForms.push({
                            'FORM_NAME': data.data.recordset[0].FORM_NAME,
                            'DATE_CREATED': (data.data.recordset[0].DATE_CREATED).slice(0, 10),
                            'CODE': code,
                            'QUESTIONS': questions,
                            'FINISHED_DATE': '',
                            'LAST_SLIDE': 0,
                            'FILLED_NO': 0
                        });
                        _this.localSave();
                        _this.showInstructions = false;
                    }
                    else {
                        _this.showAlert('No existe esa encuesta', 'No existe un formulario con el codigo ingresado');
                        console.error('No existe un formulario con el codigo ingresado');
                    }
                }
                else {
                    _this.showAlert('¡Algo salió mal!', 'Error al  hacer la transacción. ' + data.data.number + ', ' + data.data.originalError.message);
                    console.error(data.data);
                }
                loading.dismiss();
            });
        }
        else {
            loading.dismiss();
            this.showAlert('Encuesta ya existe', '');
        }
    };
    HomePage.prototype.ionViewDidEnter = function () {
        if (localStorage.finishedForms) {
            this.finishedForms = JSON.parse(localStorage.finishedForms);
        }
    };
    HomePage.prototype.localSave = function () {
        localStorage.availableForms = JSON.stringify(this.availableForms);
    };
    HomePage.prototype.pushPage = function (form) {
        // Push another page onto the navigation stack.
        // Causing the nav controller to transition to the new page.   
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__answer_answer__["a" /* AnswerPage */], {
            formId: form
        });
    };
    //Default ionic input prompt
    HomePage.prototype.showPrompt = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Agregar formulario',
            message: 'Escribir codigo de formulario a agregar',
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
                    handler: function (data) {
                        //Add form function
                        if (data.codigo) {
                            _this.addForm(data.codigo.replace(/'/g, '').replace(/'/g, '').replace(/;/g, ''));
                        }
                        else {
                            _this.showAlert('Codigo vacio', 'Debe ingresar un codigo para avanzar');
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    //Default ionic alert prompt
    HomePage.prototype.showAlert = function (title, subTitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    //Default ionic actionsheet
    //This action sheet to delete a form
    HomePage.prototype.formActionSheet = function (form) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Opciones de formulario',
            buttons: [
                {
                    text: 'Eliminar',
                    role: 'destructive',
                    handler: function () {
                        _this.removeForm(form);
                    }
                }, {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        actionSheet.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/travis/build/fabrv/SalmonPier/src/pages/home/home.html"*/'<ion-header no-border>\n  <ion-navbar>\n    <button ion-button menuToggle>\n        <ion-badge *ngIf="finishedForms.length > 0">{{finishedForms.length}}</ion-badge>\n        <ion-icon name="list" color="primary"></ion-icon>\n    </button>\n    <ion-title><strong>Disponibles</strong></ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="primary" (click)="showPrompt()">\n        <ion-icon name="add"></ion-icon>        \n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <p *ngIf="showInstructions" class="instructions">No hay formularios para realizar, presionar + para agregar</p>\n  <ion-list no-lines>\n      <ion-item-sliding *ngFor="let item of availableForms" [id]="item" class="forms-list">\n        <ion-item [id]="item" (click)="pushPage(item.FORM_NAME)" (press)="formActionSheet(item)">\n          \n          {{item.FORM_NAME}}\n          <p item-end>{{item.DATE_CREATED}}</p>\n\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button icon-only color="danger" (click)="removeForm(item);">\n              <ion-icon name="close"></ion-icon>\n          </button>\n        </ion-item-options>      \n    </ion-item-sliding>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/fabrv/SalmonPier/src/pages/home/home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__["a" /* SocketProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__["a" /* SocketProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_form__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_socket_socket__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListPage = (function () {
    function ListPage(navCtrl, navParams, loadingCtrl, socket, events, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.socket = socket;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.forms = [];
        this.uploadedForms = [];
        //Create variables for uploaded forms and finishedforms in localstorage if...
        //they don't exist
        //('[]' is of course an empty array)
        if (!localStorage.finishedForms) {
            localStorage.finishedForms = '[]';
        }
        if (!localStorage.uploadedForms) {
            localStorage.uploadedForms = '[]';
        }
        //'Parse them bois' in local variables
        this.forms = JSON.parse(localStorage.finishedForms);
        this.uploadedForms = JSON.parse(localStorage.uploadedForms);
    }
    ListPage.prototype.pushPage = function (datetime) {
        // Push another page onto the navigation stack.
        // Causing the nav controller to transition to the new page.   
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__form_form__["a" /* FormPage */], {
            date: datetime
        });
    };
    ListPage.prototype.upload = function () {
        var _this = this;
        //Define loader
        var loading = this.loadingCtrl.create({
            content: 'Subiendo formulario(s)'
        });
        //Present loader
        loading.present();
        //Start emitter with all the forms to be uploaded
        //The event to be returned will be 'formsuploaded'
        this.socket.transactionEmitter(this.forms, 'insertFilledForms', 'formsUploaded');
        //The socket will return with the event 'formsUploaded' so here we subscribe to said event
        this.events.subscribe('formsUploaded', function (data) {
            //Once the message is receive unsuscribe
            _this.events.unsubscribe('formUploaded');
            if (data.success == true) {
                //Get current date and format it in YYYY-MM-DD HH:mm:SS
                var currentdate = new Date();
                var datetime = currentdate.getFullYear() + '-'
                    + (currentdate.getMonth() + 1) + '-'
                    + currentdate.getDate() + ' '
                    + currentdate.getHours() + ':'
                    + currentdate.getMinutes() + ':'
                    + currentdate.getSeconds();
                //Pass the name and the uploaded date of the forms to another variable
                for (var f = 0; f < _this.forms.length; f++) {
                    _this.uploadedForms.push({
                        'FORM_NAME': _this.forms[f].FORM_NAME,
                        'UPLOADED_DATE': datetime
                    });
                }
                //Push uploadedForms to localstorage
                localStorage.uploadedForms = JSON.stringify(_this.uploadedForms);
                //Clear the finished forms variables
                _this.forms = [];
                localStorage.finishedForms = '[]';
                //Give the user a cue that the forms have been succesfully uploaded
                //(The cue will be a standard ionic Toast)
                _this.presentToast('Formularios exitosamente subidos');
            }
            else {
                _this.showAlert('¡Algo salió mal!', 'Error al  hacer la transacción. ' + data.data.number + ', ' + data.data.originalError.message);
                console.error(data.data);
            }
            loading.dismiss();
        });
    };
    //Default ionic toast
    ListPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    //Default ionic alert prompt
    ListPage.prototype.showAlert = function (title, subTitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/travis/build/fabrv/SalmonPier/src/pages/list/list.html"*/'<ion-header no-border>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" color="primary"></ion-icon>\n    </button>\n    <ion-title><strong>Historial</strong></ion-title>\n\n    <ion-buttons end>\n      <button ion-button color="primary" (click)="upload()" *ngIf="forms.length > 0">\n        SUBIR\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <p *ngIf="forms.length == 0 && uploadedForms.length == 0" class="instructions">No has terminado ningun formulario.</p>\n  <ion-item-group *ngIf="forms.length > 0">\n    <ion-item-divider color="light">POR SUBIR</ion-item-divider>\n    <ion-item no-lines *ngFor="let item of forms" (click)="pushPage(item.FINISHED_DATE)">\n      {{item.FORM_NAME}}\n      <p item-end>{{item.FINISHED_DATE}}</p>\n    </ion-item>\n  </ion-item-group>\n  <ion-item-group *ngIf="uploadedForms.length > 0">\n    <ion-item-divider color="light">SUBIDOS</ion-item-divider>\n    <ion-item no-lines *ngFor="let uform of uploadedForms">\n        {{uform.FORM_NAME}}\n        <p item-end>{{uform.UPLOADED_DATE}}</p>        \n    </ion-item>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/fabrv/SalmonPier/src/pages/list/list.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_socket_socket__["a" /* SocketProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_socket_socket__["a" /* SocketProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(244);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_socket_socket__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_form_form__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_answer_answer__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_storage_save_storage_save__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_form_form__["a" /* FormPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_answer_answer__["a" /* AnswerPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], { autoFocusAssist: false, scrollAssist: false, iconMode: "md" }, {
                    links: [
                        { loadChildren: '../pages/answer/answer.module#AnswerPageModule', name: 'AnswerPage', segment: 'answer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/form/form.module#FormPageModule', name: 'FormPage', segment: 'form', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_form_form__["a" /* FormPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_answer_answer__["a" /* AnswerPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_socket_socket__["a" /* SocketProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_storage_save_storage_save__["a" /* StorageSaveProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_socket_socket__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_storage_save_storage_save__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, loadingCtrl, socket, events, toastCtrl, alertCtrl, storageSave) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.loadingCtrl = loadingCtrl;
        this.socket = socket;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.storageSave = storageSave;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.forms = [];
        this.uploadedForms = [];
        this.initializeApp();
        if (localStorage.finishedForms) {
            this.forms = JSON.parse(localStorage.finishedForms);
        }
        this.events.subscribe('finishedFormsChanged', function () {
            if (localStorage.finishedForms) {
                _this.forms = JSON.parse(localStorage.finishedForms);
            }
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function () {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */]);
    };
    MyApp.prototype.upload = function () {
        var _this = this;
        //Define loader
        var loading = this.loadingCtrl.create({
            content: 'Subiendo formulario(s)'
        });
        //Present loader
        loading.present();
        //Start emitter with all the forms to be uploaded
        //The event to be returned will be 'formsuploaded'
        this.socket.transactionEmitter(this.forms, 'insertFilledForms', 'formsUploaded');
        //The socket will return with the event 'formsUploaded' so here we subscribe to said event
        this.events.subscribe('formsUploaded', function (data) {
            //Once the message is receive unsuscribe
            _this.events.unsubscribe('formUploaded');
            if (data.success == true) {
                //Get current date and format it in YYYY-MM-DD HH:mm:SS
                var currentdate = new Date();
                var datetime = currentdate.getFullYear() + '-'
                    + (currentdate.getMonth() + 1) + '-'
                    + currentdate.getDate() + ' '
                    + currentdate.getHours() + ':'
                    + currentdate.getMinutes() + ':'
                    + currentdate.getSeconds();
                //Pass the name and the uploaded date of the forms to another variable
                for (var f = 0; f < _this.forms.length; f++) {
                    _this.uploadedForms.push({
                        'FORM_NAME': _this.forms[f].FORM_NAME,
                        'UPLOADED_DATE': datetime
                    });
                }
                //Push uploadedForms to localstorage
                localStorage.uploadedForms = JSON.stringify(_this.uploadedForms);
                //Clear the finished forms variables
                _this.forms = [];
                localStorage.finishedForms = '[]';
                //Give the user a cue that the forms have been succesfully uploaded
                //(The cue will be a standard ionic Toast)
                _this.presentToast('Formularios exitosamente subidos');
                //Publish change in finishedForms, this will change the badge number in the homescreen
                _this.storageSave.updateFinishedForms();
            }
            else {
                _this.showAlert('¡Algo salió mal!', 'Error al  hacer la transacción. ' + data.data.number + ', ' + data.data.originalError.message);
                console.error(data.data);
            }
            loading.dismiss();
        });
    };
    //Default ionic toast
    MyApp.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    //Default ionic alert prompt
    MyApp.prototype.showAlert = function (title, subTitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/fabrv/SalmonPier/src/app/app.html"*/'<ion-menu persistent="false" side="top" type="push" [content]="content">\n  <ion-header no-border>\n    <ion-toolbar color="primary">\n      <ion-title><strong>Llenados</strong></ion-title>\n      <ion-buttons start>\n        <button ion-button icon-only menuClose (click)="openPage()">\n            <ion-icon name="time" color="light" item-start></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="sidemenu" padding>\n    <p *ngIf="forms.length == 0" class="instructions">No hay formularios por subir.</p>\n    <ion-list no-lines>\n      <ion-item *ngIf="forms.length > 0" color="secondary" (click)="upload()">\n        <ion-icon name="cloud-upload" item-start></ion-icon>\n        SUBIR FORMULARIOS\n      </ion-item>\n    </ion-list>\n    <ion-item-group no-lines>      \n      <button no-lines *ngFor="let item of forms" ion-item>\n        <strong>{{item.FORM_NAME}}</strong>\n        <p item-end style="color: black;">{{item.FINISHED_DATE}}</p>\n      </button>      \n    </ion-item-group>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="true"></ion-nav>'/*ion-inline-end:"/home/travis/build/fabrv/SalmonPier/src/app/app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_socket_socket__["a" /* SocketProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_storage_save_storage_save__["a" /* StorageSaveProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__providers_socket_socket__["a" /* SocketProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__providers_storage_save_storage_save__["a" /* StorageSaveProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 315:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SocketProvider = (function () {
    function SocketProvider(events) {
        this.events = events;
        this.address = "10.0.75.1";
        this.port = 8080;
        this.serverAddress = 'http://' + this.address + ':' + this.port;
    }
    SocketProvider.prototype.transactionEmitter = function (value, transactionName, returnName) {
        var _this = this;
        var success = false;
        //Random HEX to new transaction
        //EVERY Transaction MUST have a new random HEX to ID it
        this.transactionID = (Math.random() * 0xFFFFFF << 0).toString(16);
        console.log('------' + this.transactionID + '-----');
        //Socket connection
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__["connect"](this.serverAddress, { reconnection: false });
        this.socket.emit(transactionName, value, this.transactionID);
        console.log('EMITTED');
        this.socket.on(this.transactionID, function (data) {
            //<<returnName>> event, with array as response
            //If the server answered then the transaction was succesfull
            _this.events.publish(returnName, { 'success': data.success, 'data': data.data });
            _this.socket.disconnect();
            success = true;
            return;
        });
        //5 seconds connection timeout
        setTimeout(function () {
            if (success == false) {
                _this.socket.disconnect();
                //If the server timed-out then the transaction was unsuccesful
                _this.events.publish(returnName, { 'success': false, 'data': { 'number': 504, 'originalError': { 'message': 'Tiempo de espera con el servidor ha terminado' } } });
            }
        }, 5000);
    };
    SocketProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], SocketProvider);
    return SocketProvider;
}());

//# sourceMappingURL=socket.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageSaveProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the StorageSaveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var StorageSaveProvider = (function () {
    function StorageSaveProvider(events) {
        this.events = events;
        console.log('Hello StorageSaveProvider Provider');
    }
    StorageSaveProvider.prototype.updateFinishedForms = function () {
        this.events.publish('finishedFormsChanged');
    };
    StorageSaveProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], StorageSaveProvider);
    return StorageSaveProvider;
}());

//# sourceMappingURL=storage-save.js.map

/***/ })

},[220]);
//# sourceMappingURL=main.js.map