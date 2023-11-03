import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ServicioRoutingModule } from "./servicio-routing.module";
import { ServicioListComponent } from "./components/servicio-list/servicio-list.component";
import { ServicioManageComponent } from "./components/servicio-manage/servicio-manage.component";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";

@NgModule({
  declarations: [ServicioListComponent, ServicioManageComponent],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
  ],
})
export class ServicioModule {}
