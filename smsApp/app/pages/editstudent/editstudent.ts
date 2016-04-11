import {Page, NavController, Alert, NavParams} from 'ionic-angular';
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
import { FormBuilder, Control, ControlGroup, Validators, AbstractControl} from 'angular2/common';

@Page({
  templateUrl: 'build/pages/editstudent/editstudent.html'
})
export class EditStudentPage {

    SMSs : any = [];
    data;
    url = 'http://ng-smsapp.herokuapp.com/api/sms/';
    isShow : boolean;
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
        this.isShow = true;
        this.addButton = false;
        this.updateButton = true;
        this.data = this.params.data;
        //this.makeRequest(this.data);
        //console.log(this.data);
        //this.editStudent(this.data);
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

    ngOnInit(){
        this.editStudent(this.data);
    }

    jumptoRoot(){        
        this.nav.popToRoot(0);
        console.log('Function Fired');
    }

    // //Edit Student Function
        editStudent(student){ 

            this.myForm = this.fb.group({
                'id':[''],
                'name':['', Validators.required],
                'fname': ['', Validators.required],
                'age': ['', Validators.required],
                'classs': ['', Validators.required],
                'email': ['', Validators.required],
                'mobile': ['', Validators.required]  
            });

            this.http.request(this.url + this.data)
            //this.http.request('http://localhost:3000/api/sms')
            .subscribe((res: Response) => {
                    //console.log(res.json());
                    this.SMSs = res.json();                    
                                              
                    this.myForm = this.fb.group({
                        'id':[this.SMSs[0]._id],
                        'name':[this.SMSs[0].name, Validators.required],
                        'fname': [this.SMSs[0].fname, Validators.required],
                        'age': [this.SMSs[0].age, Validators.required],
                        'classs': [this.SMSs[0].classs, Validators.required],
                        'email': [this.SMSs[0].email, Validators.required],
                        'mobile': [this.SMSs[0].mobile, Validators.required]  
                    });
                    this.id = this.myForm.controls['id']; 
                    this.name = this.myForm.controls['name']           
                    this.fname = this.myForm.controls['fname']
                    this.age = this.myForm.controls['age']
                    this.classs = this.myForm.controls['classs']
                    this.email = this.myForm.controls['email'] 
                    this.mobile = this.myForm.controls['mobile'] 
                });
                               
        }

    onSubmit(form) : void {
                
                let headers: Headers = new Headers();
                headers.append('Content-Type', 'application/json');

                let opts: RequestOptions = new RequestOptions();
                opts.headers = headers;
                 
                // if(!form.id){
                    //Add Student Function
                    var myObj = {name: form.name, fname: form.fname, age: form.age, classs: form.classs, email: form.email, mobile: form.mobile, id: form.id};        
                    let loader = this.loader().show();
                    this.http.put(this.url + form.id,
                        //this.http.post('http://localhost:3000/api/sms',
                        JSON.stringify(myObj),
                        opts )
                        .subscribe((res: Response) => {                               
                                  
                            this.buildForm();

                            let alert = Alert.create({
                              title: 'Congratulations',
                              subTitle: 'The Student Has Been Updated'
                              //buttons: ['Ok'],                                  
                            });
                            setTimeout(()=>{this.jumptoRoot()}, 2000);  
                            this.nav.present(alert);
                            //loader.destroy();
                                                          
                        }); 
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

