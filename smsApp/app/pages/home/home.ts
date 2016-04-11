import {Page, NavController, Alert, NavParams} from 'ionic-angular';
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
import {AddStudentPage} from './../addstudent/addstudent';
import {StudentInfoPage} from './../info/info';

class StudentModel{
	_id;
	name;
	fname;
	age;
	classs;
	email;
	mobile;
}
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

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

	SMSs : Array<StudentModel>;
	student: any
	url = 'http://ng-smsapp.herokuapp.com/api/sms/';

	constructor(public http: Http, public nav: NavController){
		this.getSMS();		
	}

	// ngOnInit(){
 //        console.log('ngOnInit function fired');
 //    }

		//Get Whole List From Server
		getSMS(): void {        
	         this.http.request(this.url)
	        //this.http.request('http://localhost:3000/api/sms')
	        .subscribe((res: Response) => {
	                //console.log(res.json());
	                setTimeout(()=>{
	                        this.SMSs = res.json();   
	                        // if(this.SMSs.length != 0 ){             
	                        //     this.isShow = true;
	                        // }
	                }, 1000)                
	        });
	        setTimeout(()=>{this.getSMS()}, 1000);
	    }



	    //Add Student Route

	    addStudent(): void {
	    	this.nav.push(AddStudentPage);
	    }

	    //Get Student From Server
		getStudent(student: StudentModel): void {
			         
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
	        this.nav.push(StudentInfoPage, student);
	        //setTimeout(()=>{this.getSMS()}, 1000000000);
	    }


}

