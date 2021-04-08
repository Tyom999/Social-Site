import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/api/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorMsg = '';
  isValid = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nickname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit(): void {
    if (this.form.valid && this.form.get('password').value === this.form.get('confirmPassword').value) {
      this.isValid = false;
      this.authService.register(this.form.value).subscribe(data => {
          this.errorMsg = '';
          this.router.navigate(['login']);
          this.isValid = true;
        },
        error => {
          this.isValid = true;
          this.errorMsg = error;
        });
    }
  }


}
