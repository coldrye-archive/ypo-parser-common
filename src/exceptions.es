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


import EsError from 'esbases/error';


/**
 * The class ParseError models an exception thrown during parse.
 */
export default class ParseError extends EsError
{
    /**
     * Constructs a new instance of this.
     *
     * Please note that either location or token must be specified.
     *
     * @param {String} message - the message
     * @param {Object} options - the options
     * @param {Location} options.location - the location
     * @param {AbstractToken} options.token - the token
     * @param {Error} options.cause - the cause
     * @throws {TypeError} - in case both location and token are missing
     */
    constructor(message, {location, token, cause} = {})
    {
        super(message, cause);

        if (location == undefined && token == undefined)
        {
            throw new TypeError('either token or location must be specified');
        }

        this._location = location ? location : token.location;
        this._token = token;
    }

    /**
     * @override
     */
    get message()
    {
        let result = [];
        let components = [];

        result.push(super.message);

        /* istanbul ignore else */
        if (this.location)
        {
            components.push(`location=${this.location.toString()}`);
        }

        /* istanbul ignore else */
        if (this.token)
        {
            components.push('token=' + this.token.toString());
        }

        result.push(`[${components.join(', ')}]`);

        return result.join(' ');
    }

    /**
     * Gets the location or undefined.
     *
     * @type {Location}
     */
    get location()
    {
        return this._location;
    }

    /**
     * Gets the token or undefined.
     *
     * @type {AbstractToken}
     */
    get token()
    {
        return this._token;
    }
}

