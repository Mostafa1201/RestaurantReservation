import { FormGroup } from "@angular/forms";

export abstract class FormBase {
    private _form: FormGroup;
    private errors = {}
    set form(form: FormGroup) {
        this._form = form;
    }
    get form() {
        return this._form
    }
    get isFormValid(){
        return this._form.valid
    }
    isFieldValid(fieldName : string){
        return this.form.controls[fieldName].invalid
    }
    getFieldError(fieldName){
        return this.errors[fieldName]
    }
    get fromValue(){

       return this.form.value
    }
    set formErrors(errors : {[key : string] : string} ){
        Object.keys(errors).forEach(key=>{
            if(this._form.controls[key]){
                this._form.controls[key].setErrors({'incorrect': true})
                this.errors[key] = errors[key];
            }
        })
    }
} 