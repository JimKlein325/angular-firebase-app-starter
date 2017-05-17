import { Component } from '@angular/core';

// import { initializeApp, database } from 'firebase';
// import { firebaseConfig } from "environments/firebase.config";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { CoursesService } from "app/courses.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firstCourse: any;
  title = 'AngularFire Demo';
  courses$: FirebaseListObservable<any>;
  lesson$: FirebaseObjectObservable<any>;
  


  constructor(private db: AngularFireDatabase, private coursesService: CoursesService){
      this.courses$ =  db.list('courses');
      //this.courses$.subscribe(console.log);
      this.lesson$ = db.object('lessons/-KjrtsgyRXZfpH4q2YsS');
      //this.lesson$.subscribe(console.log)

      this.courses$.map(courses => courses[0])
        .subscribe(
          course => this.firstCourse = course
        );

  }

  ngOnInit(){
    const courses$ = this.coursesService.findAllLessonsForCourse("getting-started-with-angular2");
  }







  listPush() {
    this.courses$.push({description: 'Test New Course'})
    .then(
      () => console.log('List Push Done'),
      console.error
    );
  }
  listRemove() {
    this.courses$.remove(this.firstCourse);
  }
  listUpdate() {
    this.courses$.update(this.firstCourse, {description: 'Angular 2 HTTP'});
  }
  objectUpdate() {
    this.lesson$.update({description: "Angular Tutorial For Beginners - Build Your First App - Hello World Step By Step"});
  }
  objectSet() {
    // set is a destructive method that replaces node contents completely
    // the following line would copy just the description to the node, loosing the other properties
      // this.lesson$.update({description: "Angular Tutorial For Beginners - Build Your First App - Hello World Step By Step"});

  }

}
