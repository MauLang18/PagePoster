import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BannerRoutingModule } from "./banner-routing.module";
import { SharedModule } from "@shared/shared.module";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { BannerManageComponent } from './components/banner-manage/banner-manage.component';

@NgModule({
  declarations: [
    BannerListComponent,
    BannerManageComponent
  ],
  imports: [
    CommonModule,
    BannerRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
  ],
})
export class BannerModule {}
