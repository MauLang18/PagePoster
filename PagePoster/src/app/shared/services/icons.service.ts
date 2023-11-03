import { Injectable } from "@angular/core";
import icEdit from "@iconify/icons-ic/round-edit";
import icDelete from "@iconify/icons-ic/round-delete";
import icArrowDropDown from "@iconify/icons-ic/round-arrow-drop-down";
import icSearch from "@iconify/icons-ic/round-search";
import icClose from "@iconify/icons-ic/round-close";
import icName from "@iconify/icons-ic/round-badge";
import icDescription from "@iconify/icons-ic/round-description";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import icMail from "@iconify/icons-ic/twotone-group";
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline";
import icLabel from "@iconify/icons-ic/twotone-label";
import icCategory from "@iconify/icons-ic/twotone-category";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import icProvider from "@iconify/icons-ic/twotone-group";
import icDashboard from "@iconify/icons-ic/twotone-dashboard";
import icCloudDownload from "@iconify/icons-ic/twotone-cloud-download";
import icUser from "@iconify/icons-ic/twotone-supervised-user-circle";
import icParams from "@iconify/icons-ic/twotone-list";
import icBanner from "@iconify/icons-ic/add-to-photos";
import icBoletin from "@iconify/icons-ic/twotone-feed";
import icServicios from "@iconify/icons-ic/twotone-amp-stories";

@Injectable({
  providedIn: "root",
})
export class IconsService {
  getIcon(icon: string) {
    if (icon == "icEdit") {
      return icEdit;
    }

    if (icon == "icDelete") {
      return icDelete;
    }

    if (icon == "icArrowDropDown") {
      return icArrowDropDown;
    }

    if (icon == "icSearch") {
      return icSearch;
    }

    if (icon == "icClose") {
      return icClose;
    }

    if (icon == "icName") {
      return icName;
    }

    if (icon == "icDescription") {
      return icDescription;
    }

    if (icon == "icVisibility") {
      return icVisibility;
    }

    if (icon == "icVisibilityOff") {
      return icVisibilityOff;
    }

    if (icon == "icMail") {
      return icMail;
    }

    if (icon == "icViewHeadline") {
      return icViewHeadline;
    }

    if (icon == "icLabel") {
      return icLabel;
    }

    if (icon == "icCategory") {
      return icCategory;
    }

    if (icon == "icCalendarMonth") {
      return icCalendarMonth;
    }

    if (icon == "icProvider") {
      return icProvider;
    }

    if (icon == "icDashboard") {
      return icDashboard;
    }

    if (icon == "icCloudDownload") {
      return icCloudDownload;
    }

    if (icon == "icUser") {
      return icUser;
    }

    if (icon == "icParams") {
      return icParams;
    }

    if (icon == "icBanner") {
      return icBanner;
    }

    if (icon == "icBoletin") {
      return icBoletin;
    }

    if (icon == "icServicios") {
      return icServicios;
    }
  }
}
