import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import { AuthService } from "../../services/auth.service";
import { EmpresaService } from "@shared/services/empresa.service";
import { Empresa } from "@shared/models/empresa.interface";
import { Login } from "../../models/login.interfaces";

@Component({
  selector: "vex-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  inputType = "password";
  visible = false;

  empresas: Empresa[];

  icVisibility = IconsService.prototype.getIcon("icVisibility");
  icVisibilityOff = IconsService.prototype.getIcon("icVisibilityOff");

  initForm(): void {
    this.form = this.fb.group({
      usuario: ["", [Validators.required]],
      pass: ["", [Validators.required]],
      empresa: [""]
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private _empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.listEmpresas();

    this.initForm();
  }

  listEmpresas(): void {
    this._empresaService.listEmpresa().subscribe((resp) => {
      this.empresas = resp;
    });
  }

  login(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const { usuario, pass, empresa } = this.form.value;

    const loginData: Login = {
      usuario: usuario,
      pass: pass
    };

    localStorage.setItem("authType", empresa);

    this.authService.login(loginData).subscribe((resp) => {
      if (resp.isSuccess) {
        this.router.navigate(["/"]);
      }
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
