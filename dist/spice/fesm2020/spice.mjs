import * as i0 from '@angular/core';
import { Injectable, Component, NgModule } from '@angular/core';

class SpiceService {
    constructor() { }
}
SpiceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SpiceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SpiceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SpiceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SpiceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class SpiceComponent {
    constructor() { }
    ngOnInit() {
    }
}
SpiceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SpiceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SpiceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SpiceComponent, selector: "lib-spice", ngImport: i0, template: `
    <p>
      spice works!
    </p>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SpiceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-spice', template: `
    <p>
      spice works!
    </p>
  ` }]
        }], ctorParameters: function () { return []; } });

class SpiceModule {
}
SpiceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SpiceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SpiceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: SpiceModule, declarations: [SpiceComponent], exports: [SpiceComponent] });
SpiceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SpiceModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SpiceModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SpiceComponent
                    ],
                    imports: [],
                    exports: [
                        SpiceComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of spice
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SpiceComponent, SpiceModule, SpiceService };
//# sourceMappingURL=spice.mjs.map
