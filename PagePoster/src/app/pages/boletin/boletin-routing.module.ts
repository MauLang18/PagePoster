import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoletinListComponent } from "./components/boletin-list/boletin-list.component";

const routes: Routes = [
  {
    path: "",
    component: BoletinListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletinRoutingModule {}
