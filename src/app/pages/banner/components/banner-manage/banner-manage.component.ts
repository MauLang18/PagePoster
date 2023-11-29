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
  selectedImage: string | undefined; // Agregamos una propiedad para la vista previa de la imagen

  initForm(): void {
    this.form = this._fb.group({
      id: [0, [Validators.required]],
      nombre: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      imagen: [null], // Agregamos un campo para la imagen
    });
  }

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

  bannerById(id: number): void {
    this._bannerService.bannerById(id).subscribe((resp) => {
      this.form.reset({
        id: resp.id,
        nombre: resp.nombre,
        estado: resp.estado,
      });
      this.selectedImage = resp.imagen; // Cargamos la imagen existente para la vista previa
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Convierte el archivo a una URL de datos para mostrarlo
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.form.patchValue({
        imagen: file, // Guardamos el archivo en el formulario
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
      //console.log(this.form.value);
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
}
