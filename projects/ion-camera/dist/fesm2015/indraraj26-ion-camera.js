import { __awaiter, __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, Input, Output, HostListener, Directive, NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera as Camera$1 } from '@ionic-native/camera/ngx/index';
import { WebView as WebView$1 } from '@ionic-native/ionic-webview/ngx/index';

let IonCameraService = class IonCameraService {
    constructor(_httpClient, _camera, _webview) {
        this._httpClient = _httpClient;
        this._camera = _camera;
        this._webview = _webview;
    }
    cameraAction(option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._camera.getPicture(option);
                if (option.outputType === 'blob') {
                    const blobUrl = this._webview.convertFileSrc(result);
                    const blob = yield fetch(blobUrl).then((r) => r.blob());
                    return blob;
                }
                return result;
            }
            catch (e) {
                if (e === 'No Image Selected') {
                    return e;
                }
                return 'no-permission';
            }
        });
    }
};
IonCameraService.ctorParameters = () => [
    { type: HttpClient },
    { type: Camera },
    { type: WebView }
];
IonCameraService.ɵprov = ɵɵdefineInjectable({ factory: function IonCameraService_Factory() { return new IonCameraService(ɵɵinject(HttpClient), ɵɵinject(Camera$1), ɵɵinject(WebView$1)); }, token: IonCameraService, providedIn: "root" });
IonCameraService = __decorate([
    Injectable({ providedIn: 'root' })
], IonCameraService);

let IonCameraDirective = class IonCameraDirective {
    constructor(_ionCameraService, _camera) {
        this._ionCameraService = _ionCameraService;
        this._camera = _camera;
        this.cameraResult = new EventEmitter();
    }
    onCameraElementClicked(event) {
        if (this.config.outputType === 'blob' &&
            this._camera.DestinationType.FILE_URI) {
            this.getCameraData(this.config);
        }
        else if (this.config.outputType === 'base64' &&
            this._camera.DestinationType.DATA_URL) {
            this.getCameraData(this.config);
        }
        else {
            throw new Error('This method is not yet implmented! either use DATA_URL or FILE_URI');
        }
    }
    getCameraData(option) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._ionCameraService.cameraAction(option);
            this.cameraResult.emit(result);
        });
    }
};
IonCameraDirective.ctorParameters = () => [
    { type: IonCameraService },
    { type: Camera }
];
__decorate([
    Input('appIonCamera')
], IonCameraDirective.prototype, "config", void 0);
__decorate([
    Output()
], IonCameraDirective.prototype, "cameraResult", void 0);
__decorate([
    HostListener('click', ['$event'])
], IonCameraDirective.prototype, "onCameraElementClicked", null);
IonCameraDirective = __decorate([
    Directive({
        selector: '[appIonCamera]',
    })
], IonCameraDirective);

var IonCameraModule_1;
let IonCameraModule = IonCameraModule_1 = class IonCameraModule {
    static forRoot() {
        return {
            ngModule: IonCameraModule_1,
            providers: [IonCameraService],
        };
    }
};
IonCameraModule = IonCameraModule_1 = __decorate([
    NgModule({
        declarations: [IonCameraDirective],
        imports: [HttpClientModule],
        exports: [IonCameraDirective],
        providers: [Camera, WebView],
    })
], IonCameraModule);

/*
 * Public API Surface of ion-camera
 */

/**
 * Generated bundle index. Do not edit.
 */

export { IonCameraDirective, IonCameraModule, IonCameraService };
//# sourceMappingURL=indraraj26-ion-camera.js.map
