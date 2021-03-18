import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: Boolean = false;
  loading: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService

    ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
      });
  }

  onSubmit() {
    this.submitted = true;
    this.login();
  // stop here if loginForm is invalid
    if (this.loginForm.invalid) {
        return;
    }
    
  }

  login(){
    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value).pipe(first())
    .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          this.toast.success('Logged In successfully', 'Successful');
        },
        error: error => {
            this.toast.error(error, 'Error');
            this.loading = false;
        }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
}
