import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
@Input() label:string;
@Input() type='test';
get control () {
  return this.ngcontrol.control as FormControl
}
  //Self uses the same service of dependency injection
  constructor(@Self() public ngcontrol:NgControl) {
    this.ngcontrol.valueAccessor=this;
   }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
   
  }
  
}
