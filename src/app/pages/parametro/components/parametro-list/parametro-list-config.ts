import { TableColumn } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ParametroResponse } from "../../models/parametro-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Parámetro",
    value: 1,
    placeholder: "Buscar por Parámetro",
    validation: [GenericValidators.defaultName],
    validation_desc: "Solo se permite letras en esta búsqueda",
    icon: "icName",
  },
  {
    label: "Descripción",
    value: 1,
    placeholder: "Buscar por Descripción",
    validation: [GenericValidators.defaultDescription],
    validation_desc: "Solo se permite letras y números en esta búsqueda",
    icon: "icDescription",
  },
];

const menuItems: MenuItems[] = [
  {
    type: "link",
    id: "all",
    icon: IconsService.prototype.getIcon("icViewHeadline"),
    label: "Todos",
  },
  {
    type: "link",
    id: "Activo",
    value: 1,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Activo",
    class: {
      icon: "text-green",
    },
  },
  {
    type: "link",
    id: "Inactivo",
    value: 0,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Inactivo",
    class: {
      icon: "text-gray",
    },
  },
];

const tableColumns: TableColumn<ParametroResponse>[] = [
  {
    label: "PARÁMETRO",
    cssLabel: ["font-bold", "text-sm"],
    property: "parametro",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "parametro",
    visible: true,
    download: true,
  },
  {
    label: "DESCRIPCIÓN",
    cssLabel: ["font-bold", "text-sm"],
    property: "descripcion",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "descripcion",
    visible: true,
    download: true,
  },
  {
    label: "VALOR",
    cssLabel: ["font-bold", "text-sm"],
    property: "valor",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "valor",
    visible: true,
    download: true,
  },
  {
    label: "F. DE CREACIÓN",
    cssLabel: ["font-bold", "text-sm"],
    property: "fechaCreacionAuditoria",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: "ESTADO",
    cssLabel: ["font-bold", "text-sm"],
    property: "estadoParametro",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icEdit",
    cssProperty: [],
    type: "icon",
    action: "edit",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: null,
  endDate: null,
  refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
  //ICONS
  icParams: IconsService.prototype.getIcon("icParams"),
  icCalendarMonth: IconsService.prototype.getIcon("icCalendarMonth"),
  //LAYOUT SETTINGS
  menuOpen: false,
  //TABLE SETTINGS
  tableColumns: tableColumns,
  initialSort: "id",
  initialSortDir: "desc",
  getInputs: getInputs,
  buttonLabel: "EDITAR",
  //SEARCH FILTERS
  menuItems: menuItems,
  searchOptions: searchOptions,
  filters_date_active: false,
  filters: filters,
  datesFilterArray: ["Fecha de creación"],
  filename: "listado-de-parametros",
};
