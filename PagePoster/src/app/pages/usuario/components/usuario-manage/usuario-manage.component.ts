import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { IconsService } from "@shared/services/icons.service";
import { UsuarioService } from "../../services/usuario.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as configs from "../../../../../static-data/configs";

@Component({
  selector: "vex-usuario-manage",
  templateUrl: "./usuario-manage.component.html",
  styleUrls: ["./usuario-manage.component.scss"],
})
export class UsuarioManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      id: [0, [Validators.required]],
      usuario: ["", [Validators.required]],
      pass: [""],
      estado: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _usuarioService: UsuarioService,
    public _dialogRef: MatDialogRef<UsuarioManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.usuarioById(this.data.data.id);
    }
  }

  usuarioById(userId: number): void {
    this._usuarioService.usuarioById(userId).subscribe((resp) => {
      this.form.reset({
        id: resp.id,
        usuario: resp.usuario,
        pass: "",
        estado: resp.estado,
      });
    });
  }

  usuarioSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const userId = this.form.get("id").value;

    if (userId > 0) {
      this.usuarioEdit(userId);
    } else {
      this.usuarioRegister();
    }
  }

  usuarioRegister(): void {
    this._usuarioService.usuarioRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  usuarioEdit(userId: number): void {
    this._usuarioService
      .usuarioEdit(userId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }
}
