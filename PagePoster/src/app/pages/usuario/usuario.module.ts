import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsuarioRoutingModule } from "./usuario-routing.module";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { UsuarioListComponent } from "./components/usuario-list/usuario-list.component";
import { UsuarioManageComponent } from "./components/usuario-manage/usuario-manage.component";

@NgModule({
  declarations: [UsuarioListComponent, UsuarioManageComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
  ],
})
export class UsuarioModule {}
