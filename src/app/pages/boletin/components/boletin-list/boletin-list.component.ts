import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { BoletinService } from "../../services/boletin.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { componentSettings } from "./boletin-list-config";
import Swal from "sweetalert2";
import { BoletinResponse } from "../../models/boletin-response.interface";
import { BoletinManageComponent } from "../boletin-manage/boletin-manage.component";
import { RowClick } from "@shared/models/row-click.interface";
import { FiltersBox } from "@shared/models/search-options.interface";

@Component({
  selector: "vex-boletin-list",
  templateUrl: "./boletin-list.component.html",
  styleUrls: ["./boletin-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class BoletinListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _boletinService: BoletinService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Boletín");
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
      .open(BoletinManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsBoletin(true);
        }
      });
  }

  rowClick(rowClick: RowClick<BoletinResponse>) {
    let action = rowClick.action;
    let boletin = rowClick.row;

    switch (action) {
      case "edit":
        this.boletinEdit(boletin);
        break;
      case "remove":
        this.boletinRemove(boletin);
        break;
    }

    return false;
  }

  boletinEdit(boletinData: BoletinResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = boletinData;

    this._dialog
      .open(BoletinManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsBoletin(true);
        }
      });
  }

  boletinRemove(boletinData: BoletinResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el boletin ${boletinData.nombre}?`,
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
        this._boletinService
          .boletinRemove(boletinData.id)
          .subscribe(() => this.setGetInputsBoletin(true));
      }
    });
  }

  setGetInputsBoletin(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }
}
