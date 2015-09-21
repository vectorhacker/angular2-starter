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
import { RenderDirectiveMetadata, ProtoViewDto, ViewDefinition, RenderProtoViewRef, RenderViewRef, RenderProtoViewMergeMapping, RenderFragmentRef } from 'angular2/src/core/render/api';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from "angular2/src/web_workers/shared/client_message_broker";
import { isPresent } from "angular2/src/core/facade/lang";
import { Injectable } from "angular2/di";
import { RenderViewWithFragmentsStore } from 'angular2/src/web_workers/shared/render_view_with_fragments_store';
import { WebWorkerElementRef } from 'angular2/src/web_workers/shared/api';
import { RENDER_COMPILER_CHANNEL, RENDERER_CHANNEL } from 'angular2/src/web_workers/shared/messaging_api';
import { WebWorkerEventDispatcher } from 'angular2/src/web_workers/worker/event_dispatcher';
export let WebWorkerCompiler = class {
    constructor(messageBrokerFactory) {
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDER_COMPILER_CHANNEL);
    }
    /**
     * Creats a ProtoViewDto that contains a single nested component with the given componentId.
     */
    compileHost(directiveMetadata) {
        var fnArgs = [new FnArg(directiveMetadata, RenderDirectiveMetadata)];
        var args = new UiArguments("compileHost", fnArgs);
        return this._messageBroker.runOnService(args, ProtoViewDto);
    }
    /**
     * Compiles a single DomProtoView. Non recursive so that
     * we don't need to serialize all possible components over the wire,
     * but only the needed ones based on previous calls.
     */
    compile(view) {
        var fnArgs = [new FnArg(view, ViewDefinition)];
        var args = new UiArguments("compile", fnArgs);
        return this._messageBroker.runOnService(args, ProtoViewDto);
    }
    /**
     * Merges ProtoViews.
     * The first entry of the array is the protoview into which all the other entries of the array
     * should be merged.
     * If the array contains other arrays, they will be merged before processing the parent array.
     * The array must contain an entry for every component and embedded ProtoView of the first entry.
     * @param protoViewRefs Array of ProtoViewRefs or nested
     * @return the merge result for every input array in depth first order.
     */
    mergeProtoViewsRecursively(protoViewRefs) {
        var fnArgs = [new FnArg(protoViewRefs, RenderProtoViewRef)];
        var args = new UiArguments("mergeProtoViewsRecursively", fnArgs);
        return this._messageBroker.runOnService(args, RenderProtoViewMergeMapping);
    }
};
WebWorkerCompiler = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ClientMessageBrokerFactory])
], WebWorkerCompiler);
export let WebWorkerRenderer = class {
    constructor(messageBrokerFactory, _renderViewStore, _eventDispatcher) {
        this._renderViewStore = _renderViewStore;
        this._eventDispatcher = _eventDispatcher;
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_CHANNEL);
    }
    /**
     * Creates a root host view that includes the given element.
     * Note that the fragmentCount needs to be passed in so that we can create a result
     * synchronously even when dealing with webworkers!
     *
     * @param {RenderProtoViewRef} hostProtoViewRef a RenderProtoViewRef of type
     * ProtoViewDto.HOST_VIEW_TYPE
     * @param {any} hostElementSelector css selector for the host element (will be queried against the
     * main document)
     * @return {RenderViewRef} the created view
     */
    createRootHostView(hostProtoViewRef, fragmentCount, hostElementSelector) {
        return this._createViewHelper(hostProtoViewRef, fragmentCount, hostElementSelector);
    }
    /**
     * Creates a regular view out of the given ProtoView
     * Note that the fragmentCount needs to be passed in so that we can create a result
     * synchronously even when dealing with webworkers!
     */
    createView(protoViewRef, fragmentCount) {
        return this._createViewHelper(protoViewRef, fragmentCount);
    }
    _createViewHelper(protoViewRef, fragmentCount, hostElementSelector) {
        var renderViewWithFragments = this._renderViewStore.allocate(fragmentCount);
        var startIndex = (renderViewWithFragments.viewRef).refNumber;
        var fnArgs = [
            new FnArg(protoViewRef, RenderProtoViewRef),
            new FnArg(fragmentCount, null),
        ];
        var method = "createView";
        if (isPresent(hostElementSelector) && hostElementSelector != null) {
            fnArgs.push(new FnArg(hostElementSelector, null));
            method = "createRootHostView";
        }
        fnArgs.push(new FnArg(startIndex, null));
        var args = new UiArguments(method, fnArgs);
        this._messageBroker.runOnService(args, null);
        return renderViewWithFragments;
    }
    /**
     * Destroys the given view after it has been dehydrated and detached
     */
    destroyView(viewRef) {
        var fnArgs = [new FnArg(viewRef, RenderViewRef)];
        var args = new UiArguments("destroyView", fnArgs);
        this._messageBroker.runOnService(args, null);
        this._renderViewStore.remove(viewRef);
    }
    /**
     * Attaches a fragment after another fragment.
     */
    attachFragmentAfterFragment(previousFragmentRef, fragmentRef) {
        var fnArgs = [
            new FnArg(previousFragmentRef, RenderFragmentRef),
            new FnArg(fragmentRef, RenderFragmentRef)
        ];
        var args = new UiArguments("attachFragmentAfterFragment", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Attaches a fragment after an element.
     */
    attachFragmentAfterElement(elementRef, fragmentRef) {
        var fnArgs = [new FnArg(elementRef, WebWorkerElementRef), new FnArg(fragmentRef, RenderFragmentRef)];
        var args = new UiArguments("attachFragmentAfterElement", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Detaches a fragment.
     */
    detachFragment(fragmentRef) {
        var fnArgs = [new FnArg(fragmentRef, RenderFragmentRef)];
        var args = new UiArguments("detachFragment", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Hydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
    hydrateView(viewRef) {
        var fnArgs = [new FnArg(viewRef, RenderViewRef)];
        var args = new UiArguments("hydrateView", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Dehydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
    dehydrateView(viewRef) {
        var fnArgs = [new FnArg(viewRef, RenderViewRef)];
        var args = new UiArguments("dehydrateView", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Returns the native element at the given location.
     * Attention: In a WebWorker scenario, this should always return null!
     */
    getNativeElementSync(location) { return null; }
    /**
     * Sets a property on an element.
     */
    setElementProperty(location, propertyName, propertyValue) {
        var fnArgs = [
            new FnArg(location, WebWorkerElementRef),
            new FnArg(propertyName, null),
            new FnArg(propertyValue, null)
        ];
        var args = new UiArguments("setElementProperty", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Sets an attribute on an element.
     */
    setElementAttribute(location, attributeName, attributeValue) {
        var fnArgs = [
            new FnArg(location, WebWorkerElementRef),
            new FnArg(attributeName, null),
            new FnArg(attributeValue, null)
        ];
        var args = new UiArguments("setElementAttribute", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Sets a class on an element.
     */
    setElementClass(location, className, isAdd) {
        var fnArgs = [
            new FnArg(location, WebWorkerElementRef),
            new FnArg(className, null),
            new FnArg(isAdd, null)
        ];
        var args = new UiArguments("setElementClass", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Sets a style on an element.
     */
    setElementStyle(location, styleName, styleValue) {
        var fnArgs = [
            new FnArg(location, WebWorkerElementRef),
            new FnArg(styleName, null),
            new FnArg(styleValue, null)
        ];
        var args = new UiArguments("setElementStyle", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Calls a method on an element.
     * Note: For now we're assuming that everything in the args list are primitive
     */
    invokeElementMethod(location, methodName, args) {
        var fnArgs = [
            new FnArg(location, WebWorkerElementRef),
            new FnArg(methodName, null),
            new FnArg(args, null)
        ];
        var uiArgs = new UiArguments("invokeElementMethod", fnArgs);
        this._messageBroker.runOnService(uiArgs, null);
    }
    /**
     * Sets the value of a text node.
     */
    setText(viewRef, textNodeIndex, text) {
        var fnArgs = [new FnArg(viewRef, RenderViewRef), new FnArg(textNodeIndex, null), new FnArg(text, null)];
        var args = new UiArguments("setText", fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * Sets the dispatcher for all events of the given view
     */
    setEventDispatcher(viewRef, dispatcher) {
        var fnArgs = [new FnArg(viewRef, RenderViewRef)];
        var args = new UiArguments("setEventDispatcher", fnArgs);
        this._eventDispatcher.registerEventDispatcher(viewRef, dispatcher);
        this._messageBroker.runOnService(args, null);
    }
};
WebWorkerRenderer = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ClientMessageBrokerFactory, RenderViewWithFragmentsStore, WebWorkerEventDispatcher])
], WebWorkerRenderer);
//# sourceMappingURL=renderer.js.map