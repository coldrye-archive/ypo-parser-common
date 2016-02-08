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


import
{
    DIRECTIVE_OPTION, OPTION_LANG, OPTION_NS, OPTION_PLURAL,
    REGEXP_CARDINALITY, REGEXP_LANGID, REGEXP_NSNAME
} from './constants';

import AbstractDirective from './directive';
import ParseError from './exceptions';


/**
 * TODO:document
 */
export class AbstractOption extends AbstractDirective
{
    /**
     * @override
     * @param {Location} location - the location
     * @param {string} key - the key
     * @param {string} value - the value or null
     * @returns {AbstractOption} - the configured instance
     */
    static createNode(location, key, value)
    {
        const klass = MAPPING[key];

        if (!klass)
        {
            throw new ParseError(
                'unsupported option "' + key + '"', {location: location}
            );
        }

        return klass.createNode(location, key, value);
    }

    /**
     * @param {Location} location - the location
     * @param {string} key - the key
     * @param {string} value - the value or null
     * @returns {void}
     */
    constructor(location, key, value)
    {
        super(location, DIRECTIVE_OPTION);

        this._key = key;
        this._value = value;
    }

    /**
     * Gets the key.
     *
     * @returns {string} - the key
     */
    get key()
    {
        return this._key;
    }

    /**
     * Gets the value.
     *
     * @returns {string} - the value or null
     */
    get value()
    {
        return this._value;
    }

    /**
     * @override
     */
    augmentToString()
    {
        const parts = [];
        parts.push('key=\"' + this.key + '\"');
        if (this.value)
        {
            parts.push('value=\"' + this.value + '\"');
        }
        return parts.join(',');
    }
}


/**
 * TODO:document
 */
export class AbstractVariationOption extends AbstractOption
{}


/**
 * TODO:document
 */
export class AbstractUnitOption extends AbstractOption
{}


/**
 * TODO:document
 */
export class Lang extends AbstractUnitOption
{
    /**
     * @override
     */
    constructor(location, value)
    {
        super(location, OPTION_LANG, value);
    }

    /**
     * @override
     */
    static createNode(location, key, value)
    {
        if (
            typeof value != 'string' ||
            REGEXP_LANGID.exec(value) === null
        )
        {
            throw new ParseError(
                'invalid langid ' + value, {location: location}
            );
        }

        return new Lang(location, value);
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
    constructor(location, value)
    {
        super(location, OPTION_NS, value);
    }

    /**
     * @override
     */
    static createNode(location, key, value)
    {
        if (
            typeof value != 'string'
            || REGEXP_NSNAME.exec(value) === null
        )
        {
            throw new ParseError(
                'invalid namespace ' + value, {location: location}
            );
        }

        return new Namespace(location, value);
    }
}


/**
 * TODO:document
 */
export class Plural extends AbstractVariationOption
{
    /**
     * @override
     */
    constructor(location, value)
    {
        super(location, OPTION_PLURAL, value);
    }

    /**
     * @override
     */
    static createNode(location, key, value)
    {
        if (typeof value != 'undefined'
            && REGEXP_CARDINALITY.exec(value) === null)
        {
            throw new ParseError(
                'invalid plural cardinality ' + value,
                {location: location}
            );
        }

        return new Plural(location, value);
    }
}


const MAPPING = {};
MAPPING[OPTION_LANG] = Lang;
MAPPING[OPTION_NS] = Namespace;
MAPPING[OPTION_PLURAL] = Plural;

