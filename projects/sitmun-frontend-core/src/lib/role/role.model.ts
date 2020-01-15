import {Resource} from '../angular-hal/src/lib/resource';

/**
 * Role model
 */
export class Role extends Resource {
  /** name*/
  public name: string;
  /** comments*/
  public comments: string;

}
