import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ParametroListComponent } from "./components/parametro-list/parametro-list.component";

const routes: Routes = [
  {
    path: "",
    component: ParametroListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametroRoutingModule {}
