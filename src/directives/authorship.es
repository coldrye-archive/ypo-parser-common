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


import AbstractDirective from './directive';

import {buildAuthorship} from '../utils';


/**
 * @private
 */
export const DIRECTIVE_AUTHORSHIP = '#~';


/**
 * @protected
 */
export const AUTHORSHIP =
    // name
    '\\s*((?:[^\\s"\'<(>)]+(?:\\s[^\\s"\'<(>)]+)*)?)'
    // alias
    + '\\s*(?:["]((?:[^"]+)?)["])?'
    // email address
    + '\\s*(?:[<]((?:[^@]+@[^>]+)?)[>])?'
    // url/homepage
    + '\\s*(?:[(]((?:http[s]?://[^\\s]+)?)[)])?';


/**
 * @private
 */
export const REGEXP_AUTHORSHIP = new RegExp('^' + AUTHORSHIP + '$');


/**
 * The class Authorship models a token of the lexer that represents a single location
 * of authorship information in the input file.
 */
export default class Authorship extends AbstractDirective
{
    /**
     * @param {Location} location - the location
     * @param {Object} options - the options
     * @param {String} options.value - the value
     * @param {String} options.name - the name
     * @param {String} options.alias - the alias
     * @param {String} options.email - the email address
     * @param {String} options.url - the homepage url
     */
    constructor(location, {value, name, alias, email, url} = {})
    {
        super(location, DIRECTIVE_AUTHORSHIP);

        this._name = this._alias = this._email = this._url = undefined;
        this.value = value || buildAuthorship({name, alias, email, url});
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitAuthorship'])
        {
            visitor.visitAuthorship(this);
        }
    }

    /**
     * @override
     */
    get value()
    {
        let result = buildAuthorship({
            name:this.name, alias:this.alias,
            email:this.email, url:this.url
        });

        this.validateValue(result);

        return result;
    }

    /**
     * @override
     */
    set value(value)
    {
        this.validateValue(value);
        const matches = REGEXP_AUTHORSHIP.exec(value);
        this.name = matches[1];
        this.alias = matches[2];
        this.email = matches[3];
        this.url = matches[4];
    }

    /**
     * @override
     */
    validateValue(value)
    {
        super.validateValue(value);

        if (!REGEXP_AUTHORSHIP.test(value))
        {
            throw new TypeError('MSG_AUTHORSHIP_EXPECTED');
        }
    }

    /**
     * Gets the name.
     *
     * @type {String}
     */
    get name()
    {
        return this._name;
    }

    /**
     * Sets the name.
     *
     * @param {String} name - the name
     * @type {String}
     */
    set name(name)
    {
        this._name = name;
    }

    /**
     * Gets the alias.
     *
     * @type {String}
     */
    get alias()
    {
        return this._alias;
    }

    /**
     * Sets the alias.
     *
     * @param {String} alias - the alias
     * @type {String}
     */
    set alias(alias)
    {
        this._alias = alias;
    }

    /**
     * Gets the email address.
     *
     * @type {String}
     */
    get email()
    {
        return this._email;
    }

    /**
     * Sets the email address.
     *
     * @param {String} email - the email address
     * @type {String}
     */
    set email(email)
    {
        this._email = email;
    }

    /**
     * Gets the homepage url.
     *
     * @type {URL}
     */
    get url()
    {
        return this._url;
    }

    /**
     * Sets the homepage url.
     *
     * @param {String} url - the homepage url
     * @type {String}
     */
    set url(url)
    {
        this._url = url;
    }

    /**
     * @override
     */
    augmentToString()
    {
        const parts = [];
        const keys = ['name', 'alias', 'email', 'url'];

        for (let index=0; index<keys.length; index++)
        {
            const key = keys[index];
            /*istanbul ignore else*/
            if (this[key])
            {
                parts.push(`${key}="${this[key]}"`);
            }
        }

        return parts.join(',');
    }
}

