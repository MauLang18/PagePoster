import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ParametroRoutingModule } from "./parametro-routing.module";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { ParametroListComponent } from './components/parametro-list/parametro-list.component';
import { ParametroManageComponent } from './components/parametro-manage/parametro-manage.component';

@NgModule({
  declarations: [
    ParametroListComponent,
    ParametroManageComponent
  ],
  imports: [
    CommonModule,
    ParametroRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
  ],
})
export class ParametroModule {}
