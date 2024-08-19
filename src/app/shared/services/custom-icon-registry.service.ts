import {inject, Injectable} from '@angular/core';
import {SvgIconRegistryService} from "angular-svg-icon";

const ICONS_BASE_URL: string = 'assets/icons'

@Injectable({
  providedIn: 'root'
})
export class CustomIconRegistryService {
  private _iconRegistry: SvgIconRegistryService = inject(SvgIconRegistryService);

  /**
   * Registers an SVG icon to be used through `SvgIconComponent`.
   *
   * @param name Icon name.
   * @param url  (Optional) If not provided, defaults to `'assets/icons/{name}.svg'`.
   */
  public addSvgIcon(name: string, url?: string) {
    if (!url) {
      this._iconRegistry.loadSvg(`${ICONS_BASE_URL}/${name}.svg`, name);
    } else {
      this._iconRegistry.loadSvg(url, name);
    }
  }
}
