import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { BannerService } from "../../services/banner.service";
import { componentSettings } from "./banner-list-config";
import { FiltersBox } from "@shared/models/search-options.interface";
import Swal from "sweetalert2";
import { BannerResponse } from "../../models/banner-response.interface";
import { BannerManageComponent } from "../banner-manage/banner-manage.component";
import { RowClick } from "@shared/models/row-click.interface";

@Component({
  selector: "vex-banner-list",
  templateUrl: "./banner-list.component.html",
  styleUrls: ["./banner-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class BannerListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _bannerService: BannerService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Banner Principal");
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
      .open(BannerManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsBanner(true);
        }
      });
  }

  rowClick(rowClick: RowClick<BannerResponse>) {
    let action = rowClick.action;
    let banner = rowClick.row;

    switch (action) {
      case "edit":
        this.bannerEdit(banner);
        break;
      case "remove":
        this.bannerRemove(banner);
        break;
    }

    return false;
  }

  bannerEdit(bannerData: BannerResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = bannerData;

    this._dialog
      .open(BannerManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsBanner(true);
        }
      });
  }

  bannerRemove(bannerData: BannerResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el banner ${bannerData.nombre}?`,
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
        this._bannerService
          .bannerRemove(bannerData.id)
          .subscribe(() => this.setGetInputsBanner(true));
      }
    });
  }

  setGetInputsBanner(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }
}
