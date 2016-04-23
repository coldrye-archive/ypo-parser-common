// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2015-2016 Carsten Klein
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import AbstractText from './text';
import {isString} from '../utils';


/**
 * @private
 */
export const REGEXP_ESCAPED_DIRECTIVE = /^\\#/;


/**
 * The class Line models a token that represents a single line of text from the
 * input file.
 */
export default class Line extends AbstractText
{
    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitLine'])
        {
            visitor.visitLine(this);
        }
    }

    /**
     * Gets whether this is an escaped directive.
     *
     * @type {boolean}
     */
    get isEscapedDirective()
    {
        return this._isEscapedDirective;
    }

    /**
     * Gets whether this needs to be merged with the following text token.
     *
     * @type {boolean}
     */
    get isContinuation()
    {
        return this._isContinuation;
    }

    /**
     * @override
     */
    get value()
    {
        return super.value;
    }

    /**
     * @override
     */
    set value(value)
    {
        super.value = value;

        if (isString(value))
        {
            this._isEscapedDirective = REGEXP_ESCAPED_DIRECTIVE.test(value);
            let count = 0;
            for (let index=value.length-1; index>=0; index--)
            {
                /*istanbul ignore else*/
                if (value[index] != '\\')
                {
                    break;
                }
                count++;
            }
            this._isContinuation = count % 2 == 1;
        }
        else
        {
            this._isEscapedDirective = false;
            this._isContinuation = false;
        }
    }

    /**
     * @override
     */
    augmentToString()
    {
        const parts = [];
        parts.push('isEscapedDirective=\"' + this.isEscapedDirective + '\"');
        parts.push('isContinuation=\"' + this.isContinuation + '\"');
        parts.push(super.augmentToString())
        return parts.join(',');
    }
}

