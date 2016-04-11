import {Page, NavController, Alert, NavParams} from 'ionic-angular';
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
//import { FormBuilder, Control, ControlGroup, Validators, AbstractControl} from 'angular2/common';
import {EditStudentPage} from './../editstudent/editstudent';


@Page({
  templateUrl: 'build/pages/info/info.html'
})
export class StudentInfoPage {

    data;
    url = 'http://ng-smsapp.herokuapp.com/api/sms/';
    SMSs : SMS[] = [];
    _id : string;
    name : string;
    fname : string;
    age : number;
    classs : string;
    email : string;
    mobile : string;

	constructor(public http: Http, public nav: NavController, public params: NavParams){	
            this.data = this.params.data 
            console.log(this.data);           
	}

    ngOnInit(){
        this.makeRequest(this.data);
    }

    makeRequest(student){
        this.http.request(this.url + this.data._id)        
            //this.http.request('http://localhost:3000/api/sms')
            .subscribe((res: Response) => {
                    //console.log(res.json());
                    //this.SMSs = res.json();
                    this._id = student._id;
                    this.name = student.name;
                    this.fname = student.fname;
                    this.age = student.age;
                    this.classs = student.classs;
                    this.email = student.email;
                    this.mobile = student.mobile;
                    //console.log("ID: " + this._id);
                    //console.log(this.SMSs);
              //         let alert = Alert.create({
                    //   title: student.name    
                    // });
                    // this.nav.present(alert);                
            });
    }

    loader(){
        let loader = Alert.create({
            title: 'Processing...'
        });
        
        return {
            show : () => {
                this.nav.present(loader);
                return loader;
            } 
        }
    }

    jumptoRoot(){        
        this.nav.popToRoot(0);
        console.log('Function Fired');
    }

    deleteStudent(student): void{

            console.log('Delete Function Fired');
            let confirm = Alert.create({
              title: 'Delete Student?',
              message: 'Are you sure you want to delete this student?',
              buttons: [
                {
                  text: 'Cancel',
                  handler: () => {
                    // console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Delete',
                  handler: () => {        
                      let loader = this.loader().show();
                  //this.nav.popToRoot(0);                                
                    this.http.delete(this.url + this.data._id)
                    //this.http.delete('http://localhost:3000/api/sms/' + SMS._id)
                        .subscribe((res: Response) => {                           

                            //console.log("Response: " + res);
                                for(var i = 0; i < this.SMSs.length; i++){
                                    
                                        if(this.SMSs[i]._id == this.data._id){
                                                this.SMSs.splice(i, 1);                                                                                                       
                                                //return false;
                                        }
                                }                              
                              setTimeout(()=>{this.jumptoRoot()}, 2000);                                
                        });                                                     
                  }
                }
              ]
            });
             this.nav.present(confirm);                  
        }

        editStudent() : void{
            //console.log('s'); console.log(s)
            var x = document.getElementById('editButton').getAttribute('name');
            //alert(x);
            this.nav.push(EditStudentPage, x);

        }	                        
}					