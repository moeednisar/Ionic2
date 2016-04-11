"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
var http_1 = require('angular2/http');
//import { FormBuilder, Control, ControlGroup, Validators, AbstractControl} from 'angular2/common';
var editstudent_1 = require('./../editstudent/editstudent');
var StudentInfoPage = (function () {
    function StudentInfoPage(http, nav, params) {
        this.http = http;
        this.nav = nav;
        this.params = params;
        this.url = 'http://ng-smsapp.herokuapp.com/api/sms/';
        this.SMSs = [];
        this.data = this.params.data;
        //console.log(this.params);           
    }
    StudentInfoPage.prototype.ngOnInit = function () {
        this.makeRequest(this.data);
    };
    StudentInfoPage.prototype.makeRequest = function (student) {
        var _this = this;
        this.http.request(this.url + this.data._id)
            .subscribe(function (res) {
            //console.log(res.json());
            //this.SMSs = res.json();
            _this._id = student._id;
            _this.name = student.name;
            _this.fname = student.fname;
            _this.age = student.age;
            _this.classs = student.classs;
            _this.email = student.email;
            _this.mobile = student.mobile;
            //console.log("ID: " + this._id);
            //console.log(this.SMSs);
            //         let alert = Alert.create({
            //   title: student.name    
            // });
            // this.nav.present(alert);                
        });
    };
    StudentInfoPage.prototype.loader = function () {
        var _this = this;
        var loader = ionic_angular_1.Alert.create({
            title: 'Processing...'
        });
        return {
            show: function () {
                _this.nav.present(loader);
                return loader;
            }
        };
    };
    StudentInfoPage.prototype.jumptoRoot = function () {
        this.nav.popToRoot(0);
        console.log('Function Fired');
    };
    StudentInfoPage.prototype.deleteStudent = function (student) {
        var _this = this;
        console.log('Delete Function Fired');
        var confirm = ionic_angular_1.Alert.create({
            title: 'Delete Student?',
            message: 'Are you sure you want to delete this student?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        // console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        var loader = _this.loader().show();
                        //this.nav.popToRoot(0);                                
                        _this.http.delete(_this.url + _this.data._id)
                            .subscribe(function (res) {
                            //console.log("Response: " + res);
                            for (var i = 0; i < _this.SMSs.length; i++) {
                                if (_this.SMSs[i]._id == _this.data._id) {
                                    _this.SMSs.splice(i, 1);
                                }
                            }
                            setTimeout(function () { _this.jumptoRoot(); }, 2000);
                        });
                    }
                }
            ]
        });
        this.nav.present(confirm);
    };
    StudentInfoPage.prototype.editStudent = function () {
        //console.log('s'); console.log(s)
        var x = document.getElementById('editButton').getAttribute('name');
        //alert(x);
        this.nav.push(editstudent_1.EditStudentPage, x);
    };
    StudentInfoPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/info/info.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], StudentInfoPage);
    return StudentInfoPage;
}());
exports.StudentInfoPage = StudentInfoPage;
