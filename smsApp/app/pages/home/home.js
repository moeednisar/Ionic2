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
var addstudent_1 = require('./../addstudent/addstudent');
var info_1 = require('./../info/info');
var StudentModel = (function () {
    function StudentModel() {
    }
    return StudentModel;
}());
// @Page({
//   templateUrl: 'build/pages/home/info.html'
// })
// export class NavigationDetailsPage  {
// 	student: any
// 	SMSs : SMS[] = [];
// 	constructor(public http: Http, public params: NavParams, public nav: NavController){	
//             this.student = params.data.student;
// 	}
// 	loader(){
//         let loader = Alert.create({
//             title: 'Processing...'
//         });
//         return {
//             show : () => {
//                 this.nav.present(loader);
//                 return loader;
//             } 
//         }
//     }
//     jumptoRoot(){
//     	this.nav.popToRoot(0);
//     	console.log('Function Fired');
//     }
// 	deleteStudent(student): void{
// 	    	console.log('Delete Function Fired');
// 	    	let confirm = Alert.create({
// 		      title: 'Delete Student?',
// 		      message: 'Are you sure you want to delete this student?',
// 		      buttons: [
// 		        {
// 		          text: 'Cancel',
// 		          handler: () => {
// 		            // console.log('Disagree clicked');
// 		          }
// 		        },
// 		        {
// 		          text: 'Delete',
// 		          handler: () => {		
// 		          	let loader = this.loader().show();
// 		          //this.nav.popToRoot(0);          		          	
// 		            this.http.delete('https://ng-smsapp.herokuapp.com/api/sms/' + student._id)
//                     //this.http.delete('http://localhost:3000/api/sms/' + SMS._id)
// 		                .subscribe((res: Response) => {
// 		                	//console.log("Response: " + res);
// 		                        for(var i = 0; i < this.SMSs.length; i++){
// 		                                if(this.SMSs[i]._id == student._id){
// 		                                        this.SMSs.splice(i, 1);			                                        	                                               
// 		                                        //return false;
// 		                                }
// 		                        }
// 		                      //loader.destroy();  
// 		                      setTimeout(()=>{this.jumptoRoot()}, 2000); 
// 		                });	   	                		                  
// 		          }
// 		        }
// 		      ]
// 		    });
// 		     this.nav.present(confirm);	 		     
// 	    }                            
// }		
var HomePage = (function () {
    function HomePage(http, nav) {
        this.http = http;
        this.nav = nav;
        this.url = 'http://ng-smsapp.herokuapp.com/api/sms/';
        this.getSMS();
    }
    // ngOnInit(){
    //        console.log('ngOnInit function fired');
    //    }
    //Get Whole List From Server
    HomePage.prototype.getSMS = function () {
        var _this = this;
        this.http.request(this.url)
            .subscribe(function (res) {
            //console.log(res.json());
            setTimeout(function () {
                _this.SMSs = res.json();
                // if(this.SMSs.length != 0 ){             
                //     this.isShow = true;
                // }
            }, 1000);
        });
        setTimeout(function () { _this.getSMS(); }, 1000);
    };
    //Add Student Route
    HomePage.prototype.addStudent = function () {
        this.nav.push(addstudent_1.AddStudentPage);
    };
    //Get Student From Server
    HomePage.prototype.getStudent = function (student) {
        //   this.http.request('https://ng-smsapp.herokuapp.com/api/sms/'+ student._id)
        //  //this.http.request('http://localhost:3000/api/sms')
        //  .subscribe((res: Response) => {
        //          //console.log(res.json());
        //          this.SMSs = res.json()
        // //         let alert = Alert.create({
        // //   title: student.name	
        // // });
        // // this.nav.present(alert);                
        //  });
        this.nav.push(info_1.StudentInfoPage, student);
        //setTimeout(()=>{this.getSMS()}, 1000000000);
    };
    HomePage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/home/home.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ionic_angular_1.NavController])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
