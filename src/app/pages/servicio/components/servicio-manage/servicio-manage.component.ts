import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { ServicioService } from "../../services/servicio.service";

@Component({
  selector: "vex-servicio-manage",
  templateUrl: "./servicio-manage.component.html",
  styleUrls: ["./servicio-manage.component.scss"],
})
export class ServicioManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  form: FormGroup;
  selectedImage: string | undefined; // Agregamos una propiedad para la vista previa de la imagen

  empresaIdFromStorage = parseInt(localStorage.getItem("authType"), 10);

  initForm(): void {
    this.form = this._fb.group({
      id: [0, [Validators.required]],
      titulo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      empresaId: [this.empresaIdFromStorage],
      estado: ["", [Validators.required]],
      imagen: [null], // Agregamos un campo para la imagen
      programacion: [0, [Validators.required]], // Inicializado con valor 0 (no activo)
      fechaProgramacion: [{ value: this.getFormattedDate(), disabled: true }],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _servicioService: ServicioService,
    public _dialogRef: MatDialogRef<ServicioManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.servicioById(this.data.data.id);
    }
  }

  servicioById(id: number): void {
    this._servicioService.ServicioById(id).subscribe((resp) => {
      const fechaProgramacion = new Date(resp.fechaProgramacion);

      this.form.reset({
        id: resp.id,
        titulo: resp.titulo,
        descripcion: resp.descripcion,
        empresaId: resp.empresaId,
        estado: resp.estado,
        programacion: resp.programacion,
        fechaProgramacion: fechaProgramacion.toISOString().slice(0, 16),
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

  servicioSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const userId = this.form.get("id").value;

    if (userId > 0) {
      this.servicioEdit(userId);
    } else {
      //console.log(this.form.value);
      this.servicioRegister();
    }
  }

  servicioRegister(): void {
    this._servicioService
      .ServicioRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  servicioEdit(id: number): void {
    this._servicioService
      .ServicioEdit(id, this.form.value)
      .subscribe((resp) => {
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
