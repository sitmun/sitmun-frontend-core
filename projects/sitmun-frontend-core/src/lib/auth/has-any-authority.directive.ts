import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Principal } from './principal.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *sitmunHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *sitmunHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[sitmunHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {
    
    /** authorities to check */
    public authorities: string[]; 
    
    /** constructor */
    constructor(private principal: Principal, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }
    
    /** territory to check authorities*/
    @Input() territory: string;
    
    /** Set whether current user has any of the given authorities */
    @Input()
    set sitmunHasAnyAuthority(value: string|string[]) {
        this.authorities = typeof value === 'string' ? [ <string> value ] : <string[]> value;
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe((identity) => this.updateView());
    }
    
    /** update view */
    private updateView(): void {
        if (this.territory){
        this.principal.hasAnyAuthorityOnTerritory(this.authorities,this.territory).then((result) => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });

        } else {
        this.principal.hasAnyAuthority(this.authorities).then((result) => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
        }
    }
}
