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
var common_1 = require('angular2/common');
var AddStudentPage = (function () {
    function AddStudentPage(http, nav, fb, params) {
        this.http = http;
        this.nav = nav;
        this.fb = fb;
        this.params = params;
        this.SMSs = [];
        this.url = 'http://ng-smsapp.herokuapp.com/api/sms/';
        this.buildForm();
        this.isShow = false;
        this.addButton = true;
        this.updateButton = false;
    }
    AddStudentPage.prototype.buildForm = function () {
        this.myForm = this.fb.group({
            'id': [''],
            'name': ['', common_1.Validators.required],
            'fname': ['', common_1.Validators.required],
            'age': [, common_1.Validators.required],
            'classs': ['', common_1.Validators.required],
            'email': ['', common_1.Validators.required],
            'mobile': ['', common_1.Validators.required]
        });
        this.id = this.myForm.controls['id'];
        this.name = this.myForm.controls['name'];
        this.fname = this.myForm.controls['fname'];
        this.age = this.myForm.controls['age'];
        this.classs = this.myForm.controls['classs'];
        this.email = this.myForm.controls['email'];
        this.mobile = this.myForm.controls['mobile'];
    };
    AddStudentPage.prototype.loader = function () {
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
    AddStudentPage.prototype.onSubmit = function (form) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var opts = new http_1.RequestOptions();
        opts.headers = headers;
        // if(!form.id){
        //Add Student Function
        var myObj = new SMS(form.name, form.fname, form.age, form.classs, form.email, form.mobile, form.id);
        var loader = this.loader().show();
        this.http.post(this.url, 
        //this.http.post('http://localhost:3000/api/sms',
        JSON.stringify(myObj), opts)
            .subscribe(function (res) {
            _this.SMSs.push(res.json().newsms);
            _this.buildForm();
            var alert = ionic_angular_1.Alert.create({
                title: 'Congratulations',
                subTitle: 'The New Student Has Been Added',
                buttons: ['Ok'],
            });
            _this.nav.present(alert);
            loader.destroy();
            //this.isShow = true; 
            //this.getSMS(); 
        });
        // }else{
        //     //Update Student Function
        //      var myObj2 = {name: form.name, fname: form.fname, age: form.age, classs: form.classs, email: form.email, mobile: form.mobile, id: form.id};
        //      //this.http.put('https://ng-smsapp.herokuapp.com/api/sms/' + form.id,
        //     this.http.put('http://localhost:3000/api/sms/' + form.id,
        //             JSON.stringify(myObj2),
        //             opts )
        //             .subscribe((res: Response) => { 
        //                 this.buildForm()
        //                 this.addButton = true;
        //                 this.updateButton = false;
        //                 this.getSMS();                                                                  
        //             });
        //      }                      
    };
    AddStudentPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/addstudent/addstudent.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ionic_angular_1.NavController, common_1.FormBuilder, ionic_angular_1.NavParams])
    ], AddStudentPage);
    return AddStudentPage;
}());
exports.AddStudentPage = AddStudentPage;
var SMS = (function () {
    function SMS(name, fname, age, classs, email, mobile, id) {
        this.name = name;
        this.fname = fname;
        this.age = age;
        this.classs = classs;
        this.email = email;
        this.mobile = mobile;
        this.id = id;
    }
    return SMS;
}());
