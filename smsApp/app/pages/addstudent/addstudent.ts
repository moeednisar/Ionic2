import {Page, NavController, Alert, NavParams} from 'ionic-angular';
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
import { FormBuilder, Control, ControlGroup, Validators, AbstractControl} from 'angular2/common';

@Page({
  templateUrl: 'build/pages/addstudent/addstudent.html'
})
export class AddStudentPage {

	SMSs : SMS[] = [];	
	isShow : boolean;
    url = 'http://ng-smsapp.herokuapp.com/api/sms/';
	addButton: boolean;
    updateButton: boolean;
	myForm: ControlGroup;
	id: any;
	name: any;
	fname: any;
	age: any;
	classs: any;
	email: any;
	mobile: any;

	constructor(public http: Http, public nav: NavController, public fb: FormBuilder, public params: NavParams){
		this.buildForm();
		this.isShow = false;
		this.addButton = true;
		this.updateButton = false;
	}

	buildForm(){
      this.myForm = this.fb.group({
	        'id':[''],
	        'name':['', Validators.required],
	        'fname': ['', Validators.required],
	        'age': [, Validators.required],
	        'classs': ['', Validators.required],
	        'email': ['', Validators.required],
	        'mobile': ['', Validators.required]
    	});  
		this.id = this.myForm.controls['id']
        this.name = this.myForm.controls['name']
        this.fname = this.myForm.controls['fname']
        this.age = this.myForm.controls['age']
        this.classs = this.myForm.controls['classs']
        this.email = this.myForm.controls['email']
        this.mobile = this.myForm.controls['mobile']     
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



    onSubmit(form) : void {
                
                let headers: Headers = new Headers();
                headers.append('Content-Type', 'application/json');

                let opts: RequestOptions = new RequestOptions();
                opts.headers = headers;
                 
                // if(!form.id){
                    //Add Student Function
                    var myObj = new SMS(form.name, form.fname, form.age, form.classs, form.email, form.mobile, form.id);        
                    let loader = this.loader().show();
                    this.http.post(this.url,
                        //this.http.post('http://localhost:3000/api/sms',
                                JSON.stringify(myObj),
                                opts )
                                .subscribe((res: Response) => {
                                this.SMSs.push(res.json().newsms);
                                  
                                this.buildForm()

                                let alert = Alert.create({
							      title: 'Congratulations',
							      subTitle: 'The New Student Has Been Added',
							      buttons: ['Ok'],							      
							    });
							    this.nav.present(alert);
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
              }					
}

class SMS{        
        name: string;
        fname: string;
        age: number;
        classs: string;
        email: string;
        mobile: string;
        id: string
        
                       
        constructor(name: string, fname: string, age: number, classs: string, email: string, mobile: string, id:string){
                this.name = name;
                this.fname = fname;
                this.age = age;
                this.classs = classs
                this.email = email
                this.mobile = mobile  
                this.id = id                                              
        }      
}

