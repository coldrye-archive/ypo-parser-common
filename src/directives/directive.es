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


import {abstract} from 'pingo';

import AbstractToken from '../token';
import {isNonEmptyString} from '../utils';


/**
 * The abstract class AbstractDirective models the root of a hierarchy of
 * derived classes that represent directives.
 *
 * @abstract
 */
@abstract
export default class AbstractDirective extends AbstractToken
{
    /**
     * @param {Location} location - the location
     * @param {String} directive - the directive
     * @param {Object} options - the options
     * @param {String} options.value - the value
     */
    constructor(location, directive, {value} = {})
    {
        super(location, {value});

        if (!isNonEmptyString(directive))
        {
            throw new TypeError('directive must be a non empty string');
        }

        this._directive = directive;
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitDirective'])
        {
            visitor.visitDirective(this);
        }
    }

    /**
     * Gets the directive.
     *
     * @type {String}
     */
    get directive()
    {
        return this._directive;
    }

    /**
     * @override
     */
    augmentToString()
    {
        return [
            `directive="${this.directive}"`,
            super.augmentToString()
        ].join(',');
    }
}

