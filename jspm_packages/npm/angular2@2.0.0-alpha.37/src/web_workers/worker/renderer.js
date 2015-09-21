/* */ 
(function(process) {
  'use strict';
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
      case 2:
        return decorators.reduceRight(function(o, d) {
          return (d && d(o)) || o;
        }, target);
      case 3:
        return decorators.reduceRight(function(o, d) {
          return (d && d(target, key)), void 0;
        }, void 0);
      case 4:
        return decorators.reduceRight(function(o, d) {
          return (d && d(target, key, o)) || o;
        }, desc);
    }
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var api_1 = require("../../core/render/api");
  var client_message_broker_1 = require("../shared/client_message_broker");
  var lang_1 = require("../../core/facade/lang");
  var di_1 = require("../../../di");
  var render_view_with_fragments_store_1 = require("../shared/render_view_with_fragments_store");
  var api_2 = require("../shared/api");
  var messaging_api_1 = require("../shared/messaging_api");
  var event_dispatcher_1 = require("./event_dispatcher");
  var WebWorkerCompiler = (function() {
    function WebWorkerCompiler(messageBrokerFactory) {
      this._messageBroker = messageBrokerFactory.createMessageBroker(messaging_api_1.RENDER_COMPILER_CHANNEL);
    }
    WebWorkerCompiler.prototype.compileHost = function(directiveMetadata) {
      var fnArgs = [new client_message_broker_1.FnArg(directiveMetadata, api_1.RenderDirectiveMetadata)];
      var args = new client_message_broker_1.UiArguments("compileHost", fnArgs);
      return this._messageBroker.runOnService(args, api_1.ProtoViewDto);
    };
    WebWorkerCompiler.prototype.compile = function(view) {
      var fnArgs = [new client_message_broker_1.FnArg(view, api_1.ViewDefinition)];
      var args = new client_message_broker_1.UiArguments("compile", fnArgs);
      return this._messageBroker.runOnService(args, api_1.ProtoViewDto);
    };
    WebWorkerCompiler.prototype.mergeProtoViewsRecursively = function(protoViewRefs) {
      var fnArgs = [new client_message_broker_1.FnArg(protoViewRefs, api_1.RenderProtoViewRef)];
      var args = new client_message_broker_1.UiArguments("mergeProtoViewsRecursively", fnArgs);
      return this._messageBroker.runOnService(args, api_1.RenderProtoViewMergeMapping);
    };
    WebWorkerCompiler = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [client_message_broker_1.ClientMessageBrokerFactory])], WebWorkerCompiler);
    return WebWorkerCompiler;
  })();
  exports.WebWorkerCompiler = WebWorkerCompiler;
  var WebWorkerRenderer = (function() {
    function WebWorkerRenderer(messageBrokerFactory, _renderViewStore, _eventDispatcher) {
      this._renderViewStore = _renderViewStore;
      this._eventDispatcher = _eventDispatcher;
      this._messageBroker = messageBrokerFactory.createMessageBroker(messaging_api_1.RENDERER_CHANNEL);
    }
    WebWorkerRenderer.prototype.createRootHostView = function(hostProtoViewRef, fragmentCount, hostElementSelector) {
      return this._createViewHelper(hostProtoViewRef, fragmentCount, hostElementSelector);
    };
    WebWorkerRenderer.prototype.createView = function(protoViewRef, fragmentCount) {
      return this._createViewHelper(protoViewRef, fragmentCount);
    };
    WebWorkerRenderer.prototype._createViewHelper = function(protoViewRef, fragmentCount, hostElementSelector) {
      var renderViewWithFragments = this._renderViewStore.allocate(fragmentCount);
      var startIndex = (renderViewWithFragments.viewRef).refNumber;
      var fnArgs = [new client_message_broker_1.FnArg(protoViewRef, api_1.RenderProtoViewRef), new client_message_broker_1.FnArg(fragmentCount, null)];
      var method = "createView";
      if (lang_1.isPresent(hostElementSelector) && hostElementSelector != null) {
        fnArgs.push(new client_message_broker_1.FnArg(hostElementSelector, null));
        method = "createRootHostView";
      }
      fnArgs.push(new client_message_broker_1.FnArg(startIndex, null));
      var args = new client_message_broker_1.UiArguments(method, fnArgs);
      this._messageBroker.runOnService(args, null);
      return renderViewWithFragments;
    };
    WebWorkerRenderer.prototype.destroyView = function(viewRef) {
      var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef)];
      var args = new client_message_broker_1.UiArguments("destroyView", fnArgs);
      this._messageBroker.runOnService(args, null);
      this._renderViewStore.remove(viewRef);
    };
    WebWorkerRenderer.prototype.attachFragmentAfterFragment = function(previousFragmentRef, fragmentRef) {
      var fnArgs = [new client_message_broker_1.FnArg(previousFragmentRef, api_1.RenderFragmentRef), new client_message_broker_1.FnArg(fragmentRef, api_1.RenderFragmentRef)];
      var args = new client_message_broker_1.UiArguments("attachFragmentAfterFragment", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.attachFragmentAfterElement = function(elementRef, fragmentRef) {
      var fnArgs = [new client_message_broker_1.FnArg(elementRef, api_2.WebWorkerElementRef), new client_message_broker_1.FnArg(fragmentRef, api_1.RenderFragmentRef)];
      var args = new client_message_broker_1.UiArguments("attachFragmentAfterElement", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.detachFragment = function(fragmentRef) {
      var fnArgs = [new client_message_broker_1.FnArg(fragmentRef, api_1.RenderFragmentRef)];
      var args = new client_message_broker_1.UiArguments("detachFragment", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.hydrateView = function(viewRef) {
      var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef)];
      var args = new client_message_broker_1.UiArguments("hydrateView", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.dehydrateView = function(viewRef) {
      var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef)];
      var args = new client_message_broker_1.UiArguments("dehydrateView", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.getNativeElementSync = function(location) {
      return null;
    };
    WebWorkerRenderer.prototype.setElementProperty = function(location, propertyName, propertyValue) {
      var fnArgs = [new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef), new client_message_broker_1.FnArg(propertyName, null), new client_message_broker_1.FnArg(propertyValue, null)];
      var args = new client_message_broker_1.UiArguments("setElementProperty", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.setElementAttribute = function(location, attributeName, attributeValue) {
      var fnArgs = [new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef), new client_message_broker_1.FnArg(attributeName, null), new client_message_broker_1.FnArg(attributeValue, null)];
      var args = new client_message_broker_1.UiArguments("setElementAttribute", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.setElementClass = function(location, className, isAdd) {
      var fnArgs = [new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef), new client_message_broker_1.FnArg(className, null), new client_message_broker_1.FnArg(isAdd, null)];
      var args = new client_message_broker_1.UiArguments("setElementClass", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.setElementStyle = function(location, styleName, styleValue) {
      var fnArgs = [new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef), new client_message_broker_1.FnArg(styleName, null), new client_message_broker_1.FnArg(styleValue, null)];
      var args = new client_message_broker_1.UiArguments("setElementStyle", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.invokeElementMethod = function(location, methodName, args) {
      var fnArgs = [new client_message_broker_1.FnArg(location, api_2.WebWorkerElementRef), new client_message_broker_1.FnArg(methodName, null), new client_message_broker_1.FnArg(args, null)];
      var uiArgs = new client_message_broker_1.UiArguments("invokeElementMethod", fnArgs);
      this._messageBroker.runOnService(uiArgs, null);
    };
    WebWorkerRenderer.prototype.setText = function(viewRef, textNodeIndex, text) {
      var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef), new client_message_broker_1.FnArg(textNodeIndex, null), new client_message_broker_1.FnArg(text, null)];
      var args = new client_message_broker_1.UiArguments("setText", fnArgs);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer.prototype.setEventDispatcher = function(viewRef, dispatcher) {
      var fnArgs = [new client_message_broker_1.FnArg(viewRef, api_1.RenderViewRef)];
      var args = new client_message_broker_1.UiArguments("setEventDispatcher", fnArgs);
      this._eventDispatcher.registerEventDispatcher(viewRef, dispatcher);
      this._messageBroker.runOnService(args, null);
    };
    WebWorkerRenderer = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [client_message_broker_1.ClientMessageBrokerFactory, render_view_with_fragments_store_1.RenderViewWithFragmentsStore, event_dispatcher_1.WebWorkerEventDispatcher])], WebWorkerRenderer);
    return WebWorkerRenderer;
  })();
  exports.WebWorkerRenderer = WebWorkerRenderer;
})(require("process"));
