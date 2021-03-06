"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var base_1 = require("./base");
var utils_1 = require("../../utils");
var SwitchWidget = (function (_super) {
    __extends(SwitchWidget, _super);
    function SwitchWidget(props, context) {
        return _super.call(this, props, context) || this;
    }
    SwitchWidget.prototype.render = function () {
        var _this = this;
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, children = _a.children, arrayIndex = _a.arrayIndex, globalOptions = _a.globalOptions, schemaForm = _a.schemaForm, onChange = _a.onChange, formEvent = _a.formEvent, defaultValue = _a.defaultValue, form = _a.form, extra = __rest(_a, ["schema", "uiSchema", "children", "arrayIndex", "globalOptions", "schemaForm", "onChange", "formEvent", "defaultValue", "form"]);
        var options = uiSchema["ui:options"] || {}, _b = (options.widget || {}).switcho, switcho = _b === void 0 ? {} : _b;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        return (React.createElement(antd_1.Switch, __assign({ onChange: function (checked) { return _this.triggerEvent(["change"].concat(keys), keys, checked, uiSchema); }, disabled: uiSchema.readonly, defaultChecked: !!defaultValue }, this.setDefaultProps(), switcho)));
    };
    return SwitchWidget;
}(base_1.BaseWidget));
exports.SwitchWidget = SwitchWidget;
//# sourceMappingURL=switch.js.map