import * as React from 'react';

import { ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { SchemaFormBase } from '../base';

/**
 * widget 基础类
 */
export abstract class BaseWidget<P extends ICommonChildProps, S extends { value?: any }> extends SchemaFormBase<P, S> {
    private onChangedEvent;

    constructor(props, context) {
        super(props, context);
    }

    /**
     * 
     */
    componentDidMount() {
        const { uiSchema, arrayIndex, formEvent } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        this.setState({
            value: this.getFieldValue()
        });
        this.onChangedEvent = ((keys, value) => {
            this.setState({
                value: value
            });
        }).bind(this);

        formEvent.on(["changed"].concat(keys), this.onChangedEvent);
    }

    componentWillUnmount() {
        const { uiSchema, arrayIndex, formEvent } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        formEvent.off(["changed"].concat(keys).join('.'), this.onChangedEvent);
    }

    triggerEvent(name, ...args) {
        const { formEvent } = this.props;

        formEvent.emit(name, ...args);
    }

    setDefaultProps(): { [id: string]: any } {
        const { value = null } = this.state || {};

        return {
            value: value
        };
    }
}