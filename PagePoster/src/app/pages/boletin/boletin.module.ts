import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BoletinRoutingModule } from "./boletin-routing.module";
import { BoletinListComponent } from "./components/boletin-list/boletin-list.component";
import { BoletinManageComponent } from "./components/boletin-manage/boletin-manage.component";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";

@NgModule({
  declarations: [BoletinListComponent, BoletinManageComponent],
  imports: [
    CommonModule,
    BoletinRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
  ],
})
export class BoletinModule {}
