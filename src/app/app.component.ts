import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  FormGroup: FormGroup;
  private _debounceTime = 1000;
  private _pointsForMap = [];
  private _modelChanged: Subject<undefined> = new Subject<undefined>();
  private _subscription: Subscription;

  title = 'testTask';

  constructor(private fb: FormBuilder){
    this.FormGroup = this.fb.group({
      points: this.fb.array([
       this.createFormPoint()
      ])
    })
  }

  get points(): FormArray {
    return this.FormGroup.get('points') as FormArray;
  }

  get pointsForMap(): any[] {
    return this._pointsForMap;
  }
 
  addPoint(): void {
    this.points.push(this.createFormPoint());
  }

  delPoint(i: number): void {
    (this.FormGroup.controls.points as FormArray).controls.splice(i, 1);
    this.points.value.splice(i, 1);
    this._modelChanged.next();
  }


  private createFormPoint(): FormGroup {
    return this.fb.group({
      name: [''],
      latitude: [''],
      longitude: [''],
    });
  }

  ngOnInit(): void {
    this._subscription = this._modelChanged.pipe(
        debounceTime(this._debounceTime),
      ).subscribe(() => {
        this._pointsForMap = this.points.value.filter(point => point.latitude && point.longitude);
      });
  }

  inputChanged(): void {
    this._modelChanged.next();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}


