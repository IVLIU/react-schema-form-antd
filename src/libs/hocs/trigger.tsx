import * as React from 'react';
import keyBy = require('lodash.keyby');

import { SchemaFormBase } from '../base';
import { utils } from '../../utils';
import { HocBase } from './base';
import * as jpp from 'json-pointer';

/**
 * 包装Template的组件HOC
 * prop   : 触发的方法属性
 * trigger: 发出的方法
 * always : 是否一直触发
 * @param Component 需要包装的组件
 * @param options   参数
 */
export const TriggerHoc = (Component: any): React.ComponentClass<any> => {
    return class Hoc extends HocBase<any, any> {
        private timeId: number;

        constructor(props, content) {
            super(props, content);
        }

        handleTrigger(value) {
            const { uiSchema, arrayIndex, formEvent, formData, schemaForm } = this.props;
            const keys = utils.mergeKeys({ uiSchema, arrayIndex });
            const { text = undefined } = this.state || {};
            let { prop = "", trigger = null, always = false } = uiSchema["ui:trigger"];
            let { path = "", idField = "", labelField = "", groupField = "" } = uiSchema["ui:data"] || {};

            if (always || (value != text && trigger)) {
                this.timeId && clearTimeout(this.timeId);
                this.timeId = setTimeout(() => {
                    formEvent.emit(["triggerEvent"].concat(keys), {
                        loading: true,
                        clearValue: true,
                        value: undefined,
                        text: value
                    });
                    trigger(value, schemaForm).then((dataSource: Array<any>) => {
                        // if (path) {
                        //     jpp.set(formData, path, keyBy(dataSource, idField));
                        // }
                        utils.setUiData(uiSchema, formData, keyBy(dataSource, idField));
                        formEvent.emit(["triggerEvent"].concat(keys), {
                            dataSource: utils.getOptions(dataSource, idField, labelField, groupField),
                            loading: false
                        });
                    });
                }, 300);

                return true;
            }

            return false;
        }

        render() {
            const { uiSchema, arrayIndex } = this.props;
            let { prop = "", trigger = null } = uiSchema["ui:trigger"] || {}, props = {};

            if (prop && trigger) {
                props[prop] = this.handleTrigger.bind(this);
            }

            return <Component  {...this.props} triggerProps={props}></Component>;
        }
    }
}