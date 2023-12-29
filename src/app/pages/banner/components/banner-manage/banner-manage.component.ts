import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { BannerService } from "../../services/banner.service";

@Component({
  selector: "vex-banner-manage",
  templateUrl: "./banner-manage.component.html",
  styleUrls: ["./banner-manage.component.scss"],
})
export class BannerManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  form: FormGroup;
  selectedImage: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _bannerService: BannerService,
    public _dialogRef: MatDialogRef<BannerManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.bannerById(this.data.data.id);
    }
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [0, [Validators.required]],
      nombre: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      imagen: [null],
      programacion: [0], // Inicializado con valor 0 (no activo)
      fechaProgramacion: [{ value: this.getFormattedDate(), disabled: true }],
    });
  }

  bannerById(id: number): void {
    this._bannerService.bannerById(id).subscribe((resp) => {
      const fechaProgramacion = new Date(resp.fechaProgramacion);

      this.form.patchValue({
        id: resp.id,
        nombre: resp.nombre,
        estado: resp.estado,
        programacion: resp.programacion,
        fechaProgramacion: fechaProgramacion.toISOString().slice(0, 16), // Formato de hora 'HH:MM'
      });
      this.selectedImage = resp.imagen;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.form.patchValue({
        imagen: file,
      });
    }
  }

  bannerSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const userId = this.form.get("id").value;

    if (userId > 0) {
      this.bannerEdit(userId);
    } else {
      this.bannerRegister();
    }
  }

  bannerRegister(): void {
    this._bannerService.bannerRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  bannerEdit(id: number): void {
    this._bannerService.bannerEdit(id, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  onCheckboxChange(event: any): void {
    const checked = event.checked ? 1 : 0;
    this.form.get("programacion").setValue(checked);

    const dateControl = this.form.get("fechaProgramacion");
    if (checked === 1) {
      dateControl.enable();
    } else {
      dateControl.setValue(this.getFormattedDate());
      dateControl.disable();
    }
  }

  getFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // +1 porque enero es 0
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
