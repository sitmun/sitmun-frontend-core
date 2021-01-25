import { Cartography } from './cartography.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../angular-hal/src/lib/rest.service';

/** Cartography manager service */
@Injectable()
export class CartographyService extends RestService<Cartography> {

  /** API resource path */
  public CARTOGRAPHY_API = 'cartographies';

  /** constructor */
  constructor(injector: Injector, private http: HttpClient) {
    super(Cartography, "cartographies", injector);
  }

  /** remove cartography*/
  remove(item: Cartography) {
    return this.http.delete(item._links.self.href);

  }

  /** save cartography*/
  save(item: Cartography): Observable<any> {
    let result: Observable<Object>;

    let cartographyConnection = item.connection;
    let cartographyService = item.service;
    let cartographySelectionService = item.selectionService;


    if (item.service != null)
      item.service = item.service._links.self.href;
    if (item.selectionService != null)
      item.selectionService = item.selectionService._links.self.href;
    if (item.connection != null) {
      if (typeof item.connection._links != 'undefined') {
        item.connection = item.connection._links.self.href;
      } else {
        cartographyConnection._links = {};
        cartographyConnection._links.self = {};
        cartographyConnection._links.self.href = "";
      }
    }

    if (item._links != null) {

      //update relations
      delete item.connection;
      delete item.service;
      delete item.selectionService;

      if (cartographyConnection._links.self.href == '') {
        item.deleteRelation('spatialSelectionConnection', cartographyConnection).subscribe(result => {
          item.substituteRelation('service', cartographyService).subscribe(result => {
            item.substituteRelation('spatialSelectionService', cartographySelectionService).subscribe(result => {
            }, error => console.error(error));
          }, error => console.error(error));
        }, error => console.error(error));

      } else {
        item.substituteRelation('spatialSelectionConnection', cartographyConnection).subscribe(result => {
          item.substituteRelation('service', cartographyService).subscribe(result => {
            item.substituteRelation('spatialSelectionService', cartographySelectionService).subscribe(result => {
            }, error => console.error(error));
          }, error => console.error(error));
        }, error => console.error(error));
      }


      
      result = this.http.put(item._links.self.href, item);

    } else {
      result = this.http.post(this.resourceService.getResourceUrl(this.CARTOGRAPHY_API), item);
    }
    return result;
  }

}
