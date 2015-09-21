/* */ 
"format cjs";
import { BaseException } from 'angular2/src/core/facade/lang';
import { DOM } from 'angular2/src/core/dom/dom_adapter';
export class EventManager {
    constructor(_plugins, _zone) {
        this._plugins = _plugins;
        this._zone = _zone;
        for (var i = 0; i < _plugins.length; i++) {
            _plugins[i].manager = this;
        }
    }
    addEventListener(element, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        plugin.addEventListener(element, eventName, handler);
    }
    addGlobalEventListener(target, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
    }
    getZone() { return this._zone; }
    _findPluginFor(eventName) {
        var plugins = this._plugins;
        for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];
            if (plugin.supports(eventName)) {
                return plugin;
            }
        }
        throw new BaseException(`No event manager plugin found for event ${eventName}`);
    }
}
export class EventManagerPlugin {
    // That is equivalent to having supporting $event.target
    supports(eventName) { return false; }
    addEventListener(element, eventName, handler) {
        throw "not implemented";
    }
    addGlobalEventListener(element, eventName, handler) {
        throw "not implemented";
    }
}
export class DomEventsPlugin extends EventManagerPlugin {
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    supports(eventName) { return true; }
    addEventListener(element, eventName, handler) {
        var zone = this.manager._zone;
        var outsideHandler = (event) => zone.run(() => handler(event));
        this.manager._zone.runOutsideAngular(() => { DOM.on(element, eventName, outsideHandler); });
    }
    addGlobalEventListener(target, eventName, handler) {
        var element = DOM.getGlobalEventTarget(target);
        var zone = this.manager._zone;
        var outsideHandler = (event) => zone.run(() => handler(event));
        return this.manager._zone.runOutsideAngular(() => { return DOM.onAndCancel(element, eventName, outsideHandler); });
    }
}
//# sourceMappingURL=event_manager.js.map