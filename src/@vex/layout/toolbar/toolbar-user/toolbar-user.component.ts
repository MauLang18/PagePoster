import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopoverService } from '../../../components/popover/popover.service';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import icPerson from '@iconify/icons-ic/twotone-person';
import { EmpresaService } from '@shared/services/empresa.service';
import { Empresa } from '@shared/models/empresa.interface';

@Component({
  selector: 'vex-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserComponent implements OnInit {

  dropdownOpen: boolean;
  icPerson = icPerson;
  
  username: string;

  constructor(private popover: PopoverService,
              private cd: ChangeDetectorRef,
              private _empresaService: EmpresaService) { }

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (!token) {
      return "";
    }

    var dataUser = JSON.parse(atob(token.split(".")[1]));
    this.username = dataUser.family_name;

    this._empresaService.empresaById(parseInt(localStorage.getItem("authType"), 10)).subscribe(
      (resultado: Empresa) => {
        localStorage.setItem("empresa", resultado.empresa);
      },
      error => {
        console.error('Error al obtener la empresa:', error);
      }
    );
  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
