import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../shared/api/auth.service";
import {Router} from "@angular/router";
import {SocketService} from "../../../shared/api/socket.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMsg = '';
  isValid = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nickname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.min(6)]),
    });
  }

  submit(): void {
    this.isValid = false;
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe((data) => {
          if (this.authService.getIsAdmin()) {
            this.router.navigate(['admin/users']);
          } else {
            this.router.navigate(['posts']);
          }
          this.errorMsg = '';
        },
        error => {
          this.isValid = true;
          this.errorMsg = error;
        }
      );
      this.form.reset();
    }
  }
}
