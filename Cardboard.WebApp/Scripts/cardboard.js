/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(e,t){typeof define=="function"&&define.amd?define([],t):e.cardboard=t()})(this,function(){var e,t,n;(function(r){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(e){if(d(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!d(a,e)&&!d(c,e))throw new Error("No "+e);return a[e]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(e,t,n,i){var s,l,h,p,v,g=[],w;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")g[v]=u.require(e);else if(l==="exports")g[v]=u.exports(e),w=!0;else if(l==="module")s=g[v]=u.module(e);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=n.apply(a[e],g);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!w)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):b(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.deps,l.callback),s},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}})(),n("Scripts/almond.js",function(){}),n("Scripts/Cardboard/Cardboard.Client/Card",["require","exports"],function(e,t){var n;return function(e){var t=jQuery,n='"label-default": label().type === 1,"label-primary": label().type === 2,"label-warning": label().type === 3,"label-danger": label().type === 4,',r="<div class='card'><div class='card-title'><a data-bind='text: data.id, attr: { href: url }'></a><span class='label label-primary' data-bind='text: label().text, css: { "+n+" }'></span>"+"</div>"+"<div class='card-description' data-bind='text: data.title'></div>"+"</div>";(function(e){e[e.None=0]="None",e[e.Default=1]="Default",e[e.Primary=2]="Primary",e[e.Warning=3]="Warning",e[e.Danger=4]="Danger"})(e.LabelType||(e.LabelType={}));var i=e.LabelType,s=function(){function e(e,t,n){var r=this;this.data=e,this.url=n.getCardUrl(e,n),this.label=ko.computed(function(){return r._getLabel(t())})}return Object.defineProperty(e.prototype,"id",{get:function(){return this.data.id},enumerable:!0,configurable:!0}),e.prototype._getLabel=function(e){var t=e.cardProperty,n={text:"",type:0};if(t==="priority")n.text=this.data.owner,n.type=2;else if(t==="owner"){n.text="Pri: "+this.data.priority;switch(this.data.priority){case 0:n.type=4;break;case 1:n.type=3;break;default:n.type=2}}return n},e}();e.ViewModel=s,ko.bindingHandlers.card={init:function(e){t(e).html(r)}}}(n||(n={})),n}),n("Scripts/Cardboard/Cardboard.Client/Identity",["require","exports"],function(e,t){var n;return function(e){var t=function(){function e(){this.items=ko.observableArray()}return e.prototype.find=function(e){return _.find(this.items.peek(),function(t){return t.id===e})},e}();e.List=t}(n||(n={})),n});var r=this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r};return n("Scripts/Cardboard/Cardboard.Client/Board",["require","exports","./Card","./Identity"],function(e,t,n,i){var s;return function(e){function l(e,n){if(!n.boards||!n.boards.length)throw new Error("At least one board is required.");var r=t.extend({},a,n),i=n.boards.map(function(e){var i=t.extend({},r,e,{getCardsAsync:n.getCardsAsync,getCardUrl:n.getCardUrl});return new v(i)}),s=new h(i),o=s.find(n.startupBoardId)||s.items[0];s.selectedBoard(o),e.html(f),ko.applyBindings(s,e[0]),c(e)}function c(e){var n=this;t(window).scroll(function(){var r=t(n).scrollTop();r>40?e.addClass(s.boardHeaderFixed):e.removeClass(s.boardHeaderFixed)})}var t=jQuery,s={boardHeaderFixed:"board-header-fixed"},o={name:"Owner",cardProperty:"owner"},u={id:"Default",columns:[],groupByList:[o]},a={getCardsAsync:function(e,n){return t.ajax("api/Cards?"+n,{dataType:"json"})},getCardUrl:function(e,t){return"http://myurl/"+t.id+e.id}},f="<div class='board-header'></div><div class='board-controls'><div class='form-inline navbar-right'><div class='form-group board-filter'><label>Board:</label><select class='form-control' data-bind='options: items, optionsText: \"name\", value: selectedBoard'></select></div><div class='form-group board-filter' data-bind='with: selectedBoard'><label>Group By:</label><select class='form-control' data-bind='options: settings.groupByList, optionsText: \"name\", value: selectedGroupBy'></select></div></div></div><div class='board-content'><table class='table table-striped' data-bind='with: selectedBoard'><thead><tr data-bind='foreach: settings.columns'><th data-bind='text: name, style: { width: width }'></th></tr></thead><tbody data-bind='foreach: items'><tr class='board-row' data-bind='foreach: items'><!-- ko if: $index() === 0 --><td><span data-bind='text: id'></span><button type='button' class='btn btn-default board-button-collapse' data-bind='click: $parent.onCollapseClick'><span class='glyphicon' data-bind='css: { \"glyphicon-plus\": $parent.collapsed, \"glyphicon-minus\": $parent.collapsed() === false }'></span></button></td><!-- /ko --><!-- ko if: $index() > 0 --><td><div class='board-cell-container'><span class='badge board-cell-badge' data-bind='visible: showCount, text: items().length'></span><div class='board-cell-content' data-bind='foreach: items, css: { \"board-cell-collapsed\": collapsed }'><div data-bind='card: $data'></div></div><div class='board-cell-footer-gradient' data-bind='visible: $parent.collapsed'></div></div></td><!-- /ko --></tr></tbody></table></div>";e.init=l;var h=function(e){function t(t){e.call(this),this.selectedBoard=ko.observable(),this.items(t),this.selectedBoard.subscribe(function(e){e.load()})}return r(t,e),t}(i.List),p=function(e){function t(t,n){var r=this;e.call(this),this.onCollapseClick=function(){r.collapsed(!r.collapsed())},this.id=t,this.collapsed=ko.observable(!n.expandRows)}return r(t,e),t}(i.List),d=function(e){function t(t,n,r){e.call(this),this.id=t,this.showCount=ko.observable(!!r.showCellCount),this.collapsed=ko.computed(function(){return n.collapsed()})}return r(t,e),t}(i.List),v=function(e){function i(t){var n=this;e.call(this),this.selectedGroupBy=ko.observable(o),this.autoCreateRows=ko.computed(function(){return!n.selectedGroupBy().cardValues||n.selectedGroupBy().cardValues.length===0}),this.settings=t,t.groupByList&&t.groupByList.length>0&&this.selectedGroupBy(t.groupByList[0]),this._setupSubscriptions()}return r(i,e),Object.defineProperty(i.prototype,"id",{get:function(){return this.settings.id},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"name",{get:function(){return this.settings.name||this.id},enumerable:!0,configurable:!0}),i.prototype.load=function(){var e=this;this._createStartupRows();if(!this.cards){var n=t.extend({boardId:this.settings.id},this.settings.query),r=this._buildQueryString(n);this.settings.getCardsAsync(this.settings,r).done(function(t){e.cards=ko.observableArray(t),e._putCardsOnBoard()})}else this._putCardsOnBoard()},i.prototype._buildQueryString=function(e){var t=[];return e&&Object.keys(e).forEach(function(n){t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]))}),t.join("&")},i.prototype._setupSubscriptions=function(){var e=this;this.selectedGroupBy.subscribe(function(t){e.items.splice(0,e.items().length),e._putCardsOnBoard()})},i.prototype._createStartupRows=function(){var e=this;this.items.splice(0,this.items().length),this.autoCreateRows()||this.selectedGroupBy().cardValues.forEach(function(t){e._createRow(t)})},i.prototype._putCardsOnBoard=function(){var e=this;this._createStartupRows(),this.cards().forEach(function(t){var r=t[e.selectedGroupBy().cardProperty],i=e.find(r),s;!i&&r!==undefined&&e.autoCreateRows()&&(i=e._createRow(r)),s=i&&i.find(t.status),s&&s.items.push(new n.ViewModel(t,e.selectedGroupBy,e.settings))}),this._sortCards()},i.prototype._sortCards=function(){this.autoCreateRows()&&this.items.sort(function(e,t){return e.id>t.id?1:e.id<t.id?-1:0}),this.selectedGroupBy().cardProperty!=="priority"&&this.items().forEach(function(e){e.items().forEach(function(e){e.items.sort(function(e,t){return e.data.priority-t.data.priority})})})},i.prototype._createRow=function(e){var t=new p(e,this.settings);return this.settings.columns.forEach(function(n,r){var i=r===0?e:n.name,s=new d(i,t,n);t.items.push(s)}),this.items.push(t),t},i}(i.List);jQuery.fn.cardboard=function(e){var n=this;return this.each(function(r,i){l(t(n),e)})}}(s||(s={})),s}),t("Scripts/Cardboard/Cardboard.Client/Board")});