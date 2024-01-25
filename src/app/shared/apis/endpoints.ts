import { HttpHeaders } from "@angular/common/http";

export const endpoints = {
  //AUTH MODULE
  LOGIN: "Auth/Login",
  LOGIN_GOOGLE: "Auth/LoginWithGoogle",

  //USUARIO MODULE
  LIST_USUARIOS: "Usuario",
  USUARIO_BY_ID: "Usuario/",
  REGISTER_USUARIO: "Usuario/Register",
  EDIT_USUARIO: "Usuario/Edit/",
  REMOVE_USUARIO: "Usuario/Remove/",

  //BANNERPRINCIPAL MODULE
  LIST_BANNER: "BannerPrincipal",
  BANNER_BY_ID: "BannerPrincipal/",
  REGISTER_BANNER: "BannerPrincipal/Register",
  EDIT_BANNER: "BannerPrincipal/Edit/",
  REMOVE_BANNER: "BannerPrincipal/Remove/",

  //BOLETIN MODULE
  LIST_BOLETIN: "Boletin",
  BOLETIN_BY_ID: "Boletin/",
  REGISTER_BOLETIN: "Boletin/Register",
  EDIT_BOLETIN: "Boletin/Edit/",
  REMOVE_BOLETIN: "Boletin/Remove/",

  //PARAMETRO MODULE
  LIST_PARAMETRO: "Parametro",
  PARAMETRO_BY_ID: "Parametro/",
  REGISTER_PARAMETRO: "Parametro/Register",
  EDIT_PARAMETRO: "Parametro/Edit/",
  REMOVE_PARAMETRO: "Parametro/Remove/",

  //SERVICIOBENEFICIO MODULE
  LIST_SERVICIO: "ServicioBeneficio",
  SERVICIO_BY_ID: "ServicioBeneficio/",
  REGISTER_SERVICIO: "ServicioBeneficio/Register",
  EDIT_SERVICIO: "ServicioBeneficio/Edit/",
  REMOVE_SERVICIO: "ServicioBeneficio/Remove/",

  //EMPRESA MODULE
  LIST_EMPRESA: "Empresa",
  LIST_SELECT_EMPRESA: "Empresa/Select",
  EMPRESA_BY_ID: "Empresa/",
  REGISTER_EMPRESA: "Empresa/Register",
  EDIT_EMPRESA: "Empresa/Edit/",
  REMOVE_EMPRESA: "Empresa/Remove/",
};

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
