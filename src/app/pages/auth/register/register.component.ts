import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/core/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    returnUrl: string;
    errorMessage = null;
    constructor(
        private router: Router,
        private cdr: ChangeDetectorRef,
        private registerService: RegisterService

    ) {
    }

    async ngOnInit() {
        this.registerForm = new FormGroup({
            name: new FormControl('', Validators.compose([
              Validators.required
            ])),
            mobile: new FormControl('', Validators.compose([
              Validators.required
            ])),
            email: new FormControl('', Validators.compose([
              Validators.required
            ])),
            password: new FormControl('', Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ]))
        });
        this.cdr.detectChanges();
    }

    async register(){
      console.log("this.registerForm.value: ",this.registerForm.value);
      const name = this.registerForm.value.name;
      const mobile = this.registerForm.value.mobile;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      this.registerService.setParams({
        name,mobile,email,password
      });
  
      try {
        const result = await this.registerService.makeRequest();

        console.log("result: ",result);

        if (result.token) {
          this.router.navigate([""]);
        } else {
          console.log("Something went wrong");
        }
      } catch (errors) {
        console.log("errors: ",errors);
        this.errorMessage = errors.faultyRequest.error.error;
      }
    }

    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
    */
    isControlHasError(controlName: string, validationType: string): boolean {
      const control = this.registerForm.controls[controlName];
      if (!control) {
        return false;
      }
      const result =
        control.hasError(validationType) &&
        (control.dirty || control.touched);
      return result;
    }
}