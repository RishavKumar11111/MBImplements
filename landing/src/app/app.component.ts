import { Component, OnInit } from '@angular/core';
// import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MBImplements';

  constructor() { }

  ngOnInit() {
    // ReactiveFormConfig.set({
    //   'internationalization': {
    //     'dateFormat': 'dmy',
    //     'seperator': '/'
    //   },
    //   'validationMessage': {
    //     'alpha': 'Only alphabets are allowed.',
    //     'alphaNumeric': 'Only alphabets and numbers are allowed.',
    //     'compare': 'Inputs are not same.',
    //     'contains': 'Value is not contained in the entered input.',
    //     'creditcard': 'Credit card number is incorrect.',
    //     'digit': 'Only digits are allowed.',
    //     'email': 'Email ID is invalid',
    //     'greaterThanEqualTo': 'Please enter a value greater than or equal to the given value.',
    //     'greaterThan': 'Please enter a value greater than the given value.',
    //     'hexColor': 'Please enter a valid hex code.',
    //     'json': 'Please enter in a valid json format.',
    //     'lessThanEqualTo': 'Please enter a value lesser than or equal to the given value.',
    //     'lessThan': 'Please enter a value lesser than the given value.',
    //     'lowerCase': 'Only lowercase alphabets are allowed.',
    //     'maxLength': 'Maximum length of the input must not exceed {{0}} characters.',
    //     'maxNumber': 'Please enter a value less than equal to {{0}}.',
    //     'minNumber': 'Please enter a value greater than equal to {{0}}.',
    //     'password': 'Please enter valid password.',
    //     'pattern': 'The entered input does not match with the predefined pattern.',
    //     'range': 'The entered input value must be in between {{0}} to {{1}}.',
    //     'required': 'This field is required.',
    //     'time': 'Input should be in a time format.',
    //     'upperCase': 'Only uppercase alphabets are allowed.',
    //     'url': 'Please enter a valid url.',
    //     'zipCode': 'Please enter a valid zip code.',
    //     'minLength': 'Minimum length of the input must be at least {{0}} character.'
    //   }
    // });
  }
}