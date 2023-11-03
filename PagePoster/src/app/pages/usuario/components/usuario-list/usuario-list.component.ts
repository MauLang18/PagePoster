import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { UsuarioService } from "../../services/usuario.service";
import { componentSettings } from "./usuario-list-config";
import { FiltersBox } from "@shared/models/search-options.interface";
import { UsuarioResponse } from "../../models/usuario-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";
import { UsuarioManageComponent } from "../usuario-manage/usuario-manage.component";

@Component({
  selector: "vex-usuario-list",
  templateUrl: "./usuario-list.component.html",
  styleUrls: ["./usuario-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class UsuarioListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _usuarioService: UsuarioService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Usuarios");
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
      .open(UsuarioManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsUsuarios(true);
        }
      });
  }

  rowClick(rowClick: RowClick<UsuarioResponse>) {
    let action = rowClick.action;
    let usuario = rowClick.row;

    switch (action) {
      case "edit":
        this.usuarioEdit(usuario);
        break;
      case "remove":
        this.usuarioRemove(usuario);
        break;
    }

    return false;
  }

  usuarioEdit(usuarioData: UsuarioResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = usuarioData;

    this._dialog
      .open(UsuarioManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsUsuarios(true);
        }
      });
  }

  usuarioRemove(usuarioData: UsuarioResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el usuario ${usuarioData.usuario}?`,
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
        this._usuarioService
          .usuarioRemove(usuarioData.id)
          .subscribe(() => this.setGetInputsUsuarios(true));
      }
    });
  }

  setGetInputsUsuarios(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }
}
