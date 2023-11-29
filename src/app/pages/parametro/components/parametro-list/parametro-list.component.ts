import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { ParametroService } from "../../services/parametro.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { FiltersBox } from "@shared/models/search-options.interface";
import { ParametroResponse } from "../../models/parametro-response.interface";
import { ParametroManageComponent } from "../parametro-manage/parametro-manage.component";
import { RowClick } from "@shared/models/row-click.interface";
import { componentSettings } from "./parametro-list-config";

@Component({
  selector: "vex-parametro-list",
  templateUrl: "./parametro-list.component.html",
  styleUrls: ["./parametro-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ParametroListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _parametroService: ParametroService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Parametros");
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

  // openDialogRegister() {
  //   this._dialog
  //     .open(ParametroManageComponent, {
  //       disableClose: true,
  //       width: "400px",
  //     })
  //     .afterClosed()
  //     .subscribe((resp) => {
  //       if (resp) {
  //         this.setGetInputsParametro(true);
  //       }
  //     });
  // }

  rowClick(rowClick: RowClick<ParametroResponse>) {
    let action = rowClick.action;
    let parametro = rowClick.row;

    switch (action) {
      case "edit":
        this.parametroEdit(parametro);
        break;
    }

    return false;
  }

  parametroEdit(parametroData: ParametroResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = parametroData;

    this._dialog
      .open(ParametroManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsParametro(true);
        }
      });
  }

  // usuarioRemove(usuarioData: ParametroResponse) {
  //   Swal.fire({
  //     title: `¿Realmente deseas eliminar el usuario ${usuarioData.usuario}?`,
  //     text: "Se borrará de forma permanente!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     focusCancel: true,
  //     confirmButtonColor: "rgb(210,155,253)",
  //     cancelButtonColor: "rgb(79,109,253)",
  //     confirmButtonText: "Sí, eliminar",
  //     cancelButtonText: "Cancelar",
  //     width: 430,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this._parametroService
  //         .usuarioRemove(usuarioData.id)
  //         .subscribe(() => this.setGetInputsUsuarios(true));
  //     }
  //   });
  // }

  setGetInputsParametro(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }
}
