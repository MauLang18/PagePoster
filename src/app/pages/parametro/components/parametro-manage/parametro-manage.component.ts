import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { IconsService } from "@shared/services/icons.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as configs from "../../../../../static-data/configs";
import { ParametroService } from "../../services/parametro.service";

@Component({
  selector: "vex-parametro-manage",
  templateUrl: "./parametro-manage.component.html",
  styleUrls: ["./parametro-manage.component.scss"],
})
export class ParametroManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      id: [0, [Validators.required]],
      parametro: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      valor: ["", [Validators.required]],
      estado: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _parametroService: ParametroService,
    public _dialogRef: MatDialogRef<ParametroManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.parametroById(this.data.data.id);
    }
  }

  parametroById(id: number): void {
    this._parametroService.parametroById(id).subscribe((resp) => {
      this.form.reset({
        id: resp.id,
        parametro: resp.parametro,
        descripcion: resp.descripcion,
        valor: resp.valor,
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
      this.parametroEdit(userId);
    }
  }

  parametroEdit(id: number): void {
    this._parametroService
      .parametroEdit(id, this.form.value)
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
