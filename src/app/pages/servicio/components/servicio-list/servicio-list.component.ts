import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { ServicioResponse } from "../../models/servicio-response.interface";
import { ServicioManageComponent } from "../servicio-manage/servicio-manage.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { RowClick } from "@shared/models/row-click.interface";
import { FiltersBox } from "@shared/models/search-options.interface";
import { ServicioService } from "../../services/servicio.service";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { componentSettings } from "./servicio-list-config";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";

@Component({
  selector: "vex-servicio-list",
  templateUrl: "./servicio-list.component.html",
  styleUrls: ["./servicio-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ServicioListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _servicioService: ServicioService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Servicios y Beneficios");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog
      .open(ServicioManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsServicio(true);
        }
      });
  }

  rowClick(rowClick: RowClick<ServicioResponse>) {
    let action = rowClick.action;
    let servicio = rowClick.row;

    switch (action) {
      case "edit":
        this.servicioEdit(servicio);
        break;
      case "remove":
        this.servicioRemove(servicio);
        break;
    }

    return false;
  }

  servicioEdit(servicioData: ServicioResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = servicioData;

    this._dialog
      .open(ServicioManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsServicio(true);
        }
      });
  }

  servicioRemove(servicioData: ServicioResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el servicio ${servicioData.titulo}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210,155,253)",
      cancelButtonColor: "rgb(79,109,253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._servicioService
          .ServicioRemove(servicioData.id)
          .subscribe(() => this.setGetInputsServicio(true));
      }
    });
  }

  setGetInputsServicio(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }
}
