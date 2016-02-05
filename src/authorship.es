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


import {DIRECTIVE_AUTHORSHIP} from './constants';

import AbstractDirective from './directive';
import ParseError from './exceptions';


/**
 * The class Authorship models a token of the lexer that represents a single location
 * of authorship information in the input file.
 */
export default class Authorship extends AbstractDirective
{
    /**
     * @override
     * @param {Location} location - the location
     * @param {string} name - the parsed name or null
     * @param {string} alias - the parsed alias or null
     * @param {string} email - the parsed email address or null
     * @param {string} url - the parsed homepage url or null
     * @returns {Authorship} - the configured instance
     */
    static createNode(location, name, alias, email, url)
    {
        const actualName = normalizeValue(name);
        const actualAlias = normalizeValue(alias);
        const actualEmail = normalizeValue(email);
        const actualUrl = normalizeValue(url);

        if (!actualName && !actualAlias && !actualEmail)
        {
            throw new ParseError('invalid author', {location});
        }

        return new Authorship(
            location, actualName, actualAlias, actualEmail, actualUrl
        );
    }

    /**
     * @param {Location} location - the location
     * @param {string} name - the name or null
     * @param {string} alias - the alias or null
     * @param {string} email - the email address or null
     * @param {string} url - the homepage url or null
     * @returns {void}
     */
    constructor(location, name, alias, email, url)
    {
        super(location, DIRECTIVE_AUTHORSHIP);

        this._name = name;
        this._alias = alias;
        this._email = email;
        this._url = url;
    }

    /**
     * Gets the name.
     *
     * @returns {string} - the name or null
     */
    get name()
    {
        return this._name;
    }

    /**
     * Gets the alias.
     *
     * @returns {string} - the alias or null
     */
    get alias()
    {
        return this._alias;
    }

    /**
     * Gets the email address.
     *
     * @returns {string} - the email address or null
     */
    get email()
    {
        return this._email;
    }

    /**
     * Gets the homepage url.
     *
     * @returns {string} - the homepage url or null
     */
    get url()
    {
        return this._url;
    }

    /**
     * @override
     */
    augmentToString()
    {
        const parts = [];
        if (this.name)
        {
            parts.push('name=\"' + this.name + '\"');
        }
        if (this.alias)
        {
            parts.push('alias=\"' + this.alias + '\"');
        }
        if (this.email)
        {
            parts.push('email=\"' + this.email + '\"');
        }
        if (this.url)
        {
            parts.push('url=\"' + this.url + '\"');
        }
        return parts.join(',');
    }
}


function normalizeValue(value)
{
    return value && value.length == 0 || !value ? null : value;
}

