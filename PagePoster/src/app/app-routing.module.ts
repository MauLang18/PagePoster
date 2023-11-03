import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AuthGuard } from "@shared/guards/auth.guard";

const childrenRoutes: VexRoutes = [
  {
    path: "bannerPrincipal",
    loadChildren: () =>
      import("./pages/banner/banner.module").then((m) => m.BannerModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "boletin",
    loadChildren: () =>
      import("./pages/boletin/boletin.module").then((m) => m.BoletinModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "servicioBeneficio",
    loadChildren: () =>
      import("./pages/servicio/servicio.module").then((m) => m.ServicioModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "parametros",
    loadChildren: () =>
      import("./pages/parametro/parametro.module").then(
        (m) => m.ParametroModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "usuarios",
    loadChildren: () =>
      import("./pages/usuario/usuario.module").then((m) => m.UsuarioModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

const routes: VexRoutes = [
  {
    path: "",
    redirectTo: "parametros",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "",
    component: CustomLayoutComponent,
    children: childrenRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
