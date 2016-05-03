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


import Location from './location';
import AbstractVisitor from './visitor';
import {isString} from './utils';


/**
 * The abstract class AbstractToken models the root of a hierarchy of derived
 * classes representing tokens of the parse process.
 */
@abstract
export default class AbstractToken
{
    /**
     * @param {Location} location - the location
     * @param {Object} options - the options
     * @param {String} options.value - the value
     * @throws {TypeError} - in case of an invalid location
     * @throws {TypeError} - in case of a validation failure
     */
    constructor(location, {value} = {})
    {
        if (location && !(location instanceof Location))
        {
            throw new TypeError('location must be an instance of Location');
        }

        this._location = location || Location.DUMMY_LOCATION;

        // some derived classes do not have a value
        if (value !== null && typeof value != 'undefined')
        {
            this.value = value;
        }
    }

    /**
     * Gets the location associated with this token.
     *
     * @type {Location}
     */
    get location()
    {
        return this._location;
    }

    /**
     * Instructs the specified visitor to visit this.
     *
     * @param {AbstractVisitor} visitor - the visitor
     * @throws {TypeError} - in case of an invalid visitor
     * @returns {void}
     */
    accept(visitor)
    {
        if (!(visitor instanceof AbstractVisitor))
        {
            throw new TypeError(
                'visitor must be an instance of AbstractVisitor'
            );
        }

        /*istanbul ignore else*/
        if (visitor['visitToken'])
        {
            visitor.visitToken(this);
        }
    }

    /**
     * Gets whether this is considered whitespace. Defaults to ``false``.
     *
     * @type {boolean}
     */
    get isWhitespace()
    {
        return false;
    }

    /**
     * Gets the value.
     *
     * @type {String}
     */
    get value()
    {
        return this._value;
    }

    /**
     * Sets the value.
     *
     * @param {String} value - the value
     * @throws {TypeError} - in case of validation failure
     * @type {String}
     */
    set value(value)
    {
        this.validateValue(value);

        this._value = value;
    }

    /**
     * Renders a textual representation of this.
     *
     * @returns {String} - the string representation
     */
    toString()
    {
        const parts = [];
        parts.push(`location=${this.location}`);
        const augmentation = this.augmentToString();
        /*istanbul ignore else*/
        if (augmentation && augmentation.length)
        {
            parts.push(augmentation);
        }

        return this.constructor.name + ' [' + parts.join(',') + ']';
    }

    /**
     * @protected
     * @abstract
     * @returns {String} - additional information to be included on toString()
     */
    augmentToString()
    {
        return `value="${this.value}"`;
    }

    /**
     * Validates the specified value.
     *
     * @protected
     * @param {String} value - the value
     * @throws {TypeError} - in case of validation failure
     * @returns {void}
     */
    validateValue(value)
    {
        // allow user to unset the value
        if (value !== null && typeof value != 'undefined' && !isString(value))
        {
            throw new TypeError('value must be a string');
        }
    }
}

