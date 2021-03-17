import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MustMatch } from 'src/app/models/must-match';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted: Boolean = false;
  loading: Boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
  },  {
    validator: MustMatch('password', 'confirmPassword')
  });
}

 // convenience getter for easy access to form fields
 get f() { return this.signupForm.controls; }

 onSubmit() {
     this.submitted = true;
     if (this.signupForm.invalid) {
         return;
     }
     this.signup();
 }
 signup(){
   this.loading = true;
     this.authService.signup(this.signupForm.value).pipe(first())
     .subscribe({
      next: () => {
          this.loading = false;
          this.toast.success('Registration successful, please login', 'Successful');
          setTimeout(()=>{
              this.router.navigate(['/login']),
              3000
          })
      },
      error: error => {
         console.log(error)
          this.toast.error(error);
          this.loading = false;
      }
  });
 }
}