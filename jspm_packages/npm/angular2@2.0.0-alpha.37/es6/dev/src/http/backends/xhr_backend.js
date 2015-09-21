/* */ 
"format cjs";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RequestMethods, ResponseTypes } from '../enums';
import { Response } from '../static_response';
import { ResponseOptions } from '../base_response_options';
import { Injectable } from 'angular2/di';
import { BrowserXhr } from './browser_xhr';
import { EventEmitter, ObservableWrapper } from 'angular2/src/core/facade/async';
import { isPresent } from 'angular2/src/core/facade/lang';
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {@link MockConnection} may be interacted with in tests.
 */
export class XHRConnection {
    // https://github.com/angular/ts2dart/issues/230
    constructor(req, browserXHR, baseResponseOptions) {
        this.request = req;
        this.response = new EventEmitter();
        this._xhr = browserXHR.build();
        // TODO(jeffbcross): implement error listening/propagation
        this._xhr.open(RequestMethods[req.method].toUpperCase(), req.url);
        this._xhr.addEventListener('load', (_) => {
            // responseText is the old-school way of retrieving response (supported by IE8 & 9)
            // response/responseType properties were introduced in XHR Level2 spec (supported by IE10)
            let response = isPresent(this._xhr.response) ? this._xhr.response : this._xhr.responseText;
            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
            let status = this._xhr.status === 1223 ? 204 : this._xhr.status;
            // fix status code when it is 0 (0 status is undocumented).
            // Occurs when accessing file resources or on Android 4.1 stock browser
            // while retrieving files from application cache.
            if (status === 0) {
                status = response ? 200 : 0;
            }
            var responseOptions = new ResponseOptions({ body: response, status: status });
            if (isPresent(baseResponseOptions)) {
                responseOptions = baseResponseOptions.merge(responseOptions);
            }
            ObservableWrapper.callNext(this.response, new Response(responseOptions));
            // TODO(gdi2290): defer complete if array buffer until done
            ObservableWrapper.callReturn(this.response);
        });
        this._xhr.addEventListener('error', (err) => {
            var responseOptions = new ResponseOptions({ body: err, type: ResponseTypes.Error });
            if (isPresent(baseResponseOptions)) {
                responseOptions = baseResponseOptions.merge(responseOptions);
            }
            ObservableWrapper.callThrow(this.response, new Response(responseOptions));
        });
        // TODO(jeffbcross): make this more dynamic based on body type
        if (isPresent(req.headers)) {
            req.headers.forEach((value, name) => { this._xhr.setRequestHeader(name, value); });
        }
        this._xhr.send(this.request.text());
    }
    /**
     * Calls abort on the underlying XMLHttpRequest.
     */
    dispose() { this._xhr.abort(); }
}
/**
 * Creates {@link XHRConnection} instances.
 *
 * This class would typically not be used by end users, but could be
 * overridden if a different backend implementation should be used,
 * such as in a node backend.
 *
 * #Example
 *
 * ```
 * import {Http, MyNodeBackend, HTTP_BINDINGS, BaseRequestOptions} from 'angular2/http';
 * @Component({
 *   viewBindings: [
 *     HTTP_BINDINGS,
 *     bind(Http).toFactory((backend, options) => {
 *       return new Http(backend, options);
 *     }, [MyNodeBackend, BaseRequestOptions])]
 * })
 * class MyComponent {
 *   constructor(http:Http) {
 *     http('people.json').subscribe(res => this.people = res.json());
 *   }
 * }
 * ```
 *
 **/
export let XHRBackend = class {
    constructor(_browserXHR, _baseResponseOptions) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
    }
    createConnection(request) {
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    }
};
XHRBackend = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [BrowserXhr, ResponseOptions])
], XHRBackend);
//# sourceMappingURL=xhr_backend.js.map