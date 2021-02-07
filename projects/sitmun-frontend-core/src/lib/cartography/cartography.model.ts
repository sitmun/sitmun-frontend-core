import {Resource} from '../angular-hal/src/lib/resource';
import {Service} from '../service/service.model';
import {Connection} from '../connection/connection.model';
import {CartographyAvailability} from './cartography-availability.model';
/**
 * Cartography
 */
export class Cartography extends Resource {
  /** id */
  public id: number;  
  /** name*/
  public name: string;
  
  /** type*/
  public type : string;

  /** service*/
  public service : Service;

  /** order*/  
  public order: Number; 

  /** description*/  
  public description: String;

  /** source*/  
  public source: String;

  /** whether cartography is blocked*/
  public blocked: boolean;

  

  /** transparency*/ 
  public transparency: Number;

  /** whether layer is queryable*/  
  public queryable: Boolean;

  /** whether layer is queryable*/ 
  public queryAct: Boolean;

  /** query layer*/
  public queryLay: string;

  /** system created date*/
  public createdDate: any;

  /** minimum scale*/
  public minimumScale: Number;

  /** maximum scale*/
  public maximumScale: Number;

  /** layers*/  
  public layers: string;
  
  /** connection*/
  public connection: Connection;

  /** availabilities*/
  public availabilities : CartographyAvailability[];

  /** whether layer is queryable*/ 
  public selectable: Boolean;

  /** selection layer*/
  public selectionLayer: string;

  /** selection service*/  
  public selectionService: Service;

  /** legend tip*/  
  public legendTip: string;
  
  /** legend url*/
  public legendUrl: string;

  /** whether layer is editable*/
  public editable: Boolean;

  /** metadata URL*/
  public metadataUrl: string;

  /** whether layer is themable*/
  public themeable: Boolean;
  
  /** geometry type*/
  public geometryType: string;
  

}
