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

import AbstractDirective from './directive';
import Location from '../location';


/**
 * The default namespace assigned to a translation unit if none was specified.
 *
 * By default, all translation units will have ``translation`` assigned as their
 * default namespace unless overridden by user defaults.
 *
 * @public
 */
export const DEFAULT_NS = 'translation';


/**
 * @private
 */
export const DIRECTIVE_OPTION = '#=';


/**
 * @protected
 */
export const OPTION_LANG = 'lang';


/**
 * @protected
 */
export const OPTION_NS = 'ns';


/**
 * @protected
 */
export const LANGID = '[a-z]{2}(?:[-][A-Z]{2})?';


/**
 * @private
 */
export const REGEXP_LANGID = new RegExp(`^${LANGID}$`);


/**
 * @protected
 */
export const NSQNAME = '[a-zA-Z0-9$-_]+';


/**
 * @protected
 */
export const NSFQNAME = `[^.]${NSQNAME}(?:[.]${NSQNAME})*`;


/**
 * @private
 */
export const REGEXP_NSFQNAME = new RegExp(`^${NSFQNAME}$`);


/**
 * TODO:document
 */
@abstract
export class AbstractOption extends AbstractDirective
{
    /**
     * TODO:refactor to tokenizer
     *
     * @param {Location} location - the location
     * @param {Object} options - the options
     * @param {String} options.key - the key
     * @param {String} options.value - the value
     * @returns {AbstractOption} - the configured instance
     */
    static createNewInstance(location, {key, value} = {})
    {
        const klass = MAPPING[key];

        if (!klass)
        {
            throw new Error(`unsupported option "${key}"`);
        }

        return new klass(location, {value});
    }

    /**
     * @param {Location} location - the location
     * @param {String} key - the key
     * @param {Object} options - the options
     * @param {String} options.value - the value
     * @param {String} value - the value or null
     * @returns {void}
     */
    constructor(location, key, {value} = {})
    {
        super(location, DIRECTIVE_OPTION, {value});

        this._key = key;
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitOption'])
        {
            visitor.visitOption(this);
        }
    }

    /**
     * Gets the key.
     *
     * @type {String}
     */
    get key()
    {
        return this._key;
    }

    /**
     * @override
     */
    augmentToString()
    {
        return [
            `key="${this.key}"`,
            super.augmentToString()
        ].join(',');
    }
}


/**
 * TODO:document
 */
@abstract
export class AbstractUnitOption extends AbstractOption
{
    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitUnitOption'])
        {
            visitor.visitUnitOption(this);
        }
    }
}


/**
 * TODO:document
 */
export class Lang extends AbstractUnitOption
{
    /**
     * @override
     */
    constructor(location, {value} = {})
    {
        super(location, OPTION_LANG);

        this.value = value;
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitLang'])
        {
            visitor.visitLang(this);
        }
    }

    /**
     * @override
     */
    validateValue(value)
    {
        super.validateValue(value);

        if (!REGEXP_LANGID.test(value))
        {
            throw new Error(`invalid langid "${value}"`);
        }
    }
}


/**
 * TODO:document
 */
export class Namespace extends AbstractUnitOption
{
    /**
     * @override
     */
    constructor(location, {value} = {})
    {
        super(location, OPTION_NS);

        this.value = value||DEFAULT_NS;
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitNamespace'])
        {
            visitor.visitNamespace(this);
        }
    }

    /**
     * @override
     */
    validateValue(value)
    {
        super.validateValue(value);

        if (!value || !REGEXP_NSFQNAME.test(value))
        {
            throw new Error(`invalid namespace "${value}"`);
        }
    }
}


Namespace.DEFAULT_NAMESPACE = new Namespace(Location.DUMMY_LOCATION);


const MAPPING = {};
MAPPING[OPTION_LANG] = Lang;
MAPPING[OPTION_NS] = Namespace;

