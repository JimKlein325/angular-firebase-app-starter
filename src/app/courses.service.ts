import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Rx"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { Course } from "./models/course";
import { Lesson } from "./models/lesson";

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllLessonsForCourse(courseUrl: string): Observable<Lesson[]> {

    const course$: Observable<Course> = this.db.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
      }
    })
      .map(results => results[0])
      .do(console.log)
      ;
    course$.subscribe();
    // ;

    //this.db.list('lessonsPerCourse/' + courseKey);
    const lessonsPerCourse$ = course$
      .switchMap(course => this.db.list('lessonsPerCourse/' + course.$key))
      .do(console.log);
lessonsPerCourse$.subscribe();




    //  this.db.object('lessons/' + couseLessonIdentifier.$key)
    const lessons$: Observable<Lesson[]> = lessonsPerCourse$
      .map(lessonsPerCourse =>
        lessonsPerCourse.map(couseLessonIdentifier =>
          this.db.object('lessons/' + couseLessonIdentifier.$key)))
      .flatMap(fbojs => Observable.combineLatest(fbojs))
      .do(console.log);

    lessons$.subscribe();

    return Observable.of([]);
  }

}
