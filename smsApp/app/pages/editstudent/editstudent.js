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
var EditStudentPage = (function () {
    function EditStudentPage(http, nav, fb, params) {
        this.http = http;
        this.nav = nav;
        this.fb = fb;
        this.params = params;
        this.SMSs = [];
        this.url = 'http://ng-smsapp.herokuapp.com/api/sms/';
        this.buildForm();
        this.isShow = true;
        this.addButton = false;
        this.updateButton = true;
        this.data = this.params.data;
        //this.makeRequest(this.data);
        //console.log(this.data);
        //this.editStudent(this.data);
    }
    EditStudentPage.prototype.buildForm = function () {
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
    EditStudentPage.prototype.loader = function () {
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
    EditStudentPage.prototype.ngOnInit = function () {
        this.editStudent(this.data);
    };
    EditStudentPage.prototype.jumptoRoot = function () {
        this.nav.popToRoot(0);
        console.log('Function Fired');
    };
    // //Edit Student Function
    EditStudentPage.prototype.editStudent = function (student) {
        var _this = this;
        this.myForm = this.fb.group({
            'id': [''],
            'name': ['', common_1.Validators.required],
            'fname': ['', common_1.Validators.required],
            'age': ['', common_1.Validators.required],
            'classs': ['', common_1.Validators.required],
            'email': ['', common_1.Validators.required],
            'mobile': ['', common_1.Validators.required]
        });
        this.http.request(this.url + this.data)
            .subscribe(function (res) {
            //console.log(res.json());
            _this.SMSs = res.json();
            _this.myForm = _this.fb.group({
                'id': [_this.SMSs[0]._id],
                'name': [_this.SMSs[0].name, common_1.Validators.required],
                'fname': [_this.SMSs[0].fname, common_1.Validators.required],
                'age': [_this.SMSs[0].age, common_1.Validators.required],
                'classs': [_this.SMSs[0].classs, common_1.Validators.required],
                'email': [_this.SMSs[0].email, common_1.Validators.required],
                'mobile': [_this.SMSs[0].mobile, common_1.Validators.required]
            });
            _this.id = _this.myForm.controls['id'];
            _this.name = _this.myForm.controls['name'];
            _this.fname = _this.myForm.controls['fname'];
            _this.age = _this.myForm.controls['age'];
            _this.classs = _this.myForm.controls['classs'];
            _this.email = _this.myForm.controls['email'];
            _this.mobile = _this.myForm.controls['mobile'];
        });
    };
    EditStudentPage.prototype.onSubmit = function (form) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var opts = new http_1.RequestOptions();
        opts.headers = headers;
        // if(!form.id){
        //Add Student Function
        var myObj = { name: form.name, fname: form.fname, age: form.age, classs: form.classs, email: form.email, mobile: form.mobile, id: form.id };
        var loader = this.loader().show();
        this.http.put(this.url + form.id, 
        //this.http.post('http://localhost:3000/api/sms',
        JSON.stringify(myObj), opts)
            .subscribe(function (res) {
            _this.buildForm();
            var alert = ionic_angular_1.Alert.create({
                title: 'Congratulations',
                subTitle: 'The Student Has Been Updated'
            });
            setTimeout(function () { _this.jumptoRoot(); }, 2000);
            _this.nav.present(alert);
            //loader.destroy();
        });
    };
    EditStudentPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/editstudent/editstudent.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ionic_angular_1.NavController, common_1.FormBuilder, ionic_angular_1.NavParams])
    ], EditStudentPage);
    return EditStudentPage;
}());
exports.EditStudentPage = EditStudentPage;
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
