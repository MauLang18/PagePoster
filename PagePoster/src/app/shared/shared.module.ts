import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './import-modules/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@visurel/iconify-angular';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ListTableSimpleModule } from './components/list-table-simple/list-table-simple.module';
import { SearchFilterModule } from './components/search-filter/search-filter.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    IconModule,
    ContainerModule,
    ScrollbarModule,
    FlexLayoutModule,
    PageLayoutModule,
    ListTableSimpleModule,
    SearchFilterModule,
    NgxSpinnerModule,
  ]
})
export class SharedModule { }
