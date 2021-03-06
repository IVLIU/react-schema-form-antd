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
var jpp = require("json-pointer");
var antd_1 = require("antd");
var utils_1 = require("../../utils");
var base_1 = require("./base");
var ArrayField = (function (_super) {
    __extends(ArrayField, _super);
    function ArrayField(props, context) {
        return _super.call(this, props, context) || this;
    }
    ArrayField.prototype.handleChange = function (opt, idx, keys, items) {
        var _a = this.props, formEvent = _a.formEvent, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, validateResult = _a.validateResult;
        switch (opt) {
            case "add":
                break;
            case "delete":
                if (jpp(validateResult).has(jpp.compile(keys))) {
                    jpp(validateResult).has(jpp.compile(keys.concat([idx.toString()]))) && jpp(validateResult).remove(jpp.compile(keys.concat([idx.toString()])));
                    for (var i = idx; i <= items.length; i++) {
                        this.swapObjectItems(jpp(validateResult).get(jpp.compile(keys)), i + 1, i);
                    }
                }
                break;
            case "down":
                jpp(validateResult).has(jpp.compile(keys)) && this.swapObjectItems(jpp(validateResult).get(jpp.compile(keys)), idx, ++idx);
                break;
            case "up":
                jpp(validateResult).has(jpp.compile(keys)) && this.swapObjectItems(jpp(validateResult).get(jpp.compile(keys)), idx, --idx);
                break;
        }
        formEvent.emit(["change"].concat(keys), keys, items, uiSchema);
    };
    ArrayField.prototype.handleAdd = function (e) {
        var _a = this.props, formEvent = _a.formEvent, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, schemaFormOptions = _a.schemaFormOptions;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var items = this.getFieldValue() || [];
        var _b = jpp(uiSchema).has("/schema/items") ? jpp(uiSchema).get("/schema/items") : {}, _c = _b.type, type = _c === void 0 ? "" : _c, _d = _b.$ref, $ref = _d === void 0 ? "" : _d;
        if (!type && $ref) {
            type = (schemaFormOptions.global.schemas[$ref] || {}).type;
        }
        items = items.concat([type === "object" ? {} : null]);
        this.handleChange("add", 0, keys, items);
        e.preventDefault();
    };
    ArrayField.prototype.handleDelete = function (idx, e) {
        var _a = this.props, formEvent = _a.formEvent, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var items = this.getFieldValue() || [];
        items.splice(idx, 1);
        this.handleChange("delete", idx, keys, items);
        e.preventDefault();
    };
    ArrayField.prototype.handleUp = function (idx) {
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, formEvent = _a.formEvent, extra = __rest(_a, ["uiSchema", "arrayIndex", "formEvent"]);
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var data = this.getFieldValue();
        this.up(data, idx);
        this.handleChange("up", idx, keys, data);
        this.forceUpdate();
    };
    ArrayField.prototype.handleDown = function (idx) {
        var _a = this.props, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex, formEvent = _a.formEvent, extra = __rest(_a, ["uiSchema", "arrayIndex", "formEvent"]);
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var data = this.getFieldValue();
        this.down(data, idx);
        this.handleChange("down", idx, keys, data);
        this.forceUpdate();
    };
    ArrayField.prototype.renderItems = function () {
        var _this = this;
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, validateResult = _a.validateResult, arrayIndex = _a.arrayIndex, formEvent = _a.formEvent, extra = __rest(_a, ["schema", "uiSchema", "validateResult", "arrayIndex", "formEvent"]);
        var options = uiSchema["ui:options"] || {};
        var _b = options.array || {}, _c = _b.add, add = _c === void 0 ? true : _c, _d = _b.remove, remove = _d === void 0 ? true : _d, _e = _b.move, move = _e === void 0 ? true : _e;
        var items = this.getFieldValue() || [], children = [];
        items.forEach(function (item, idx) {
            var idxs = arrayIndex ? arrayIndex.concat([idx]) : [idx];
            var arrayItems = (React.createElement(antd_1.Button.Group, null,
                remove && React.createElement(antd_1.Button, { size: "small", onClick: _this.handleDelete.bind(_this, idx), icon: "minus" }),
                move && React.createElement(antd_1.Button, { size: "small", disabled: !_this.canUp(items, idx), onClick: _this.handleUp.bind(_this, idx), icon: "arrow-up" }),
                move && React.createElement(antd_1.Button, { size: "small", disabled: !_this.canDown(items, idx), onClick: _this.handleDown.bind(_this, idx), icon: "arrow-down" })));
            children.push(utils_1.utils.getTemplateRender(__assign({ validateResult: validateResult, formEvent: formEvent, schema: schema, uiSchemaCombine: uiSchema.items, arrayIndex: idxs, arrayItems: arrayItems }, extra)));
        });
        return children;
    };
    ArrayField.prototype.init = function () {
        var _this = this;
        var _a = this.props, uiSchema = _a.uiSchema, formEvent = _a.formEvent, arrayIndex = _a.arrayIndex, schemaFormOptions = _a.schemaFormOptions, schemaForm = _a.schemaForm;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        var onChange = uiSchema.onChange;
        var timeid;
        this.changeCurrentArray = (function (childKeys, data) {
            if (timeid) {
                clearTimeout(timeid);
            }
            timeid = setTimeout(function () {
                var parentKeys = childKeys.concat([]);
                var currentValue = _this.getFieldValue();
                onChange && onChange(keys, currentValue, schemaForm);
            }, 1000);
        }).bind(this);
        this.onChanged = (function (childKeys, data) {
            _this.forceUpdate();
            onChange && onChange(keys, data, schemaForm);
        }).bind(this);
        formEvent.on(["change"].concat(keys), this.onChanged);
        formEvent.on(["changed"].concat(keys).concat(["*"]), this.changeCurrentArray);
        formEvent.on(["changed"].concat(keys).concat(["*", "*"]), this.changeCurrentArray);
        _super.prototype.init.call(this);
    };
    ArrayField.prototype.dispose = function () {
        var _a = this.props, formEvent = _a.formEvent, uiSchema = _a.uiSchema, arrayIndex = _a.arrayIndex;
        var keys = utils_1.utils.mergeKeys({ uiSchema: uiSchema, arrayIndex: arrayIndex });
        formEvent.off(["change"].concat(keys).join("."), this.onChanged);
        formEvent.off(["changed"].concat(keys).concat(["*"]).join("."), this.changeCurrentArray);
        formEvent.off(["changed"].concat(keys).concat(["*", "*"]).join("."), this.changeCurrentArray);
        _super.prototype.dispose.call(this);
    };
    ArrayField.prototype.render = function () {
        var _a = this.props, schema = _a.schema, uiSchema = _a.uiSchema, schemaFormOptions = _a.schemaFormOptions, extra = __rest(_a, ["schema", "uiSchema", "schemaFormOptions"]);
        var options = uiSchema["ui:options"] || {};
        var _b = (options.array || {}).add, add = _b === void 0 ? true : _b;
        return (React.createElement(antd_1.Card, { title: React.createElement(antd_1.Row, { type: "flex", justify: "space-between" },
                React.createElement(antd_1.Col, null, uiSchema.title),
                React.createElement(antd_1.Col, null, add && React.createElement(antd_1.Button, { onClick: this.handleAdd.bind(this), shape: "circle", icon: "plus" }))) }, this.renderItems()));
    };
    return ArrayField;
}(base_1.BaseField));
exports.ArrayField = ArrayField;
//# sourceMappingURL=array.js.map