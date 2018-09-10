(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["answer-answer-module"],{

/***/ "./src/app/answer/answer.module.ts":
/*!*****************************************!*\
  !*** ./src/app/answer/answer.module.ts ***!
  \*****************************************/
/*! exports provided: AnswerPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnswerPageModule", function() { return AnswerPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _answer_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./answer.page */ "./src/app/answer/answer.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: '',
        component: _answer_page__WEBPACK_IMPORTED_MODULE_5__["AnswerPage"]
    }
];
var AnswerPageModule = /** @class */ (function () {
    function AnswerPageModule() {
    }
    AnswerPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_answer_page__WEBPACK_IMPORTED_MODULE_5__["AnswerPage"]]
        })
    ], AnswerPageModule);
    return AnswerPageModule;
}());



/***/ }),

/***/ "./src/app/answer/answer.page.html":
/*!*****************************************!*\
  !*** ./src/app/answer/answer.page.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{formId}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-slides>\n\n    <ion-slide *ngFor=\"let item of form.QUESTIONS; let last = last\">\n      <h2>{{item.QUESTION}}</h2>\n      <ion-list inset id=\"input-list\">\n        <ion-input [(ngModel)]=\"item.ANSWER\" *ngIf=\"item.TYPE == 2\" type=\"text\" value=\"\" placeholder=\"Respuesta\"></ion-input>\n        <ion-input [(ngModel)]=\"item.ANSWER\" *ngIf=\"item.TYPE == 7\" type=\"number\" pattern=\"[0-9]*\" value=\"\" placeholder=\"Respuesta\"></ion-input>        \n        <ion-input [(ngModel)]=\"item.ANSWER\" *ngIf=\"item.TYPE == 10\" type=\"email\" value=\"\" placeholder=\"Respuesta\"></ion-input>\n        <ion-input [(ngModel)]=\"item.ANSWER\" *ngIf=\"item.TYPE == 11\" type=\"tel\" value=\"\" placeholder=\"Respuesta\"></ion-input>\n      </ion-list>\n      \n      <p class=\"color-gray\" *ngIf=\"item.TYPE == 9\">Presionar en el boton para elegir color</p>\n      <input [(ngModel)]=\"item.ANSWER\" *ngIf=\"item.TYPE == 9\" type=\"color\" class=\"input-color\">\n\n      <ion-list *ngIf=\"item.TYPE == 5\">\n        <ion-radio-group [(ngModel)]=\"item.ANSWER\">\n          <ion-item>\n            <ion-label>Si</ion-label>\n            <ion-radio value=\"1\"></ion-radio>\n          </ion-item>\n        \n          <ion-item>\n            <ion-label>No</ion-label>\n            <ion-radio value=\"0\"></ion-radio>\n          </ion-item>\n        </ion-radio-group>\n      </ion-list>\n\n      <ion-list *ngIf=\"item.TYPE == 1\">\n        <ion-radio-group [(ngModel)]=\"item.ANSWER\">\n          <ion-item *ngFor=\"let option of item.OPTIONS\">\n            <ion-label>{{option.OPTION_CAPTION}}</ion-label>\n            <ion-radio value=\"{{option.OPTION_VALUE}}\"></ion-radio>\n          </ion-item>\n        </ion-radio-group>\n      </ion-list>\n\n      <ion-range [(ngModel)]=\"item.ANSWER\" *ngIf=\"item.TYPE == 6\"></ion-range>\n      \n      <ion-list inset class=\"datetime\" *ngIf=\"item.TYPE == 8\">\n        <ion-item>\n          <ion-label>Seleccionar fecha</ion-label>\n          <ion-datetime [(ngModel)]=\"item.ANSWER\" displayFormat=\"DD/MM/YYYY\"></ion-datetime>\n        </ion-item>\n      </ion-list>\n\n      <input *ngIf=\"item.TYPE == 4\" [(ngModel)]=\"item.ANSWER\" type=\"file\" accept=\"image/*\" capture=\"camera\" />\n\n      <ion-button (click)=\"prevSlide()\"clear>Anterior</ion-button>\n      <ion-button (click)=\"nextSlide()\" *ngIf=\"last == false\">Siguiente</ion-button>\n      <br>\n      <ion-button (click)=\"finishForm()\" *ngIf=\"last\" large>Finalizar</ion-button>\n    </ion-slide>\n    \n  </ion-slides>\n    \n  <div class=\"progress\" [style.width]=\"(this.form.LAST_SLIDE/(this.form.QUESTIONS.length - 1))*100 + '%'\">    \n    <div class=\"progress-shadow\"></div>\n  </div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/answer/answer.page.scss":
/*!*****************************************!*\
  !*** ./src/app/answer/answer.page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-input, .datetime {\n  box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.05);\n  border-radius: 16px !important;\n  padding-left: 10px !important; }\n\n#input-list {\n  padding: 10px; }\n\n.datetime ion-datetime {\n  box-shadow: none; }\n\n.input-color {\n  width: 80%;\n  margin: auto;\n  margin-bottom: 20px;\n  display: block;\n  height: 40px;\n  padding: 10px;\n  border: none;\n  box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.05);\n  border-radius: 16px;\n  background-color: white; }\n\n.color-gray {\n  color: rgba(0, 0, 0, 0.4); }\n\n.progress {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  height: 5px;\n  width: 0;\n  background-color: var(--ion-color-secondary); }\n\n.progress .progress-shadow {\n    height: 5px;\n    width: 5px;\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    box-shadow: 0 0 50px 7px var(--ion-color-secondary);\n    transition: width .3s; }\n\nion-slides {\n  height: 100%; }\n\nion-slides ion-slide {\n    height: 100%;\n    display: block; }\n"

/***/ }),

/***/ "./src/app/answer/answer.page.ts":
/*!***************************************!*\
  !*** ./src/app/answer/answer.page.ts ***!
  \***************************************/
/*! exports provided: AnswerPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnswerPage", function() { return AnswerPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AnswerPage = /** @class */ (function () {
    function AnswerPage(route) {
        this.route = route;
        this.formId = '';
        this.forms = [];
        this.form = [];
    }
    AnswerPage.prototype.ngOnInit = function () {
        var _this = this;
        this.forms = JSON.parse(localStorage.availableForms);
        this.sub = this.route.params.subscribe(function (params) {
            _this.formId = params['formId']; // (+) converts string 'id' to a number
        });
        this.sub.unsubscribe();
        for (var x = 0; x < this.forms.length; x++) {
            if (this.forms[x].FORM_NAME == this.formId) {
                this.form = this.forms[x];
            }
        }
    };
    AnswerPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-answer',
            template: __webpack_require__(/*! ./answer.page.html */ "./src/app/answer/answer.page.html"),
            styles: [__webpack_require__(/*! ./answer.page.scss */ "./src/app/answer/answer.page.scss")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], AnswerPage);
    return AnswerPage;
}());



/***/ })

}]);
//# sourceMappingURL=answer-answer-module.js.map