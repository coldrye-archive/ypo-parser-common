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
 * The class ParseError models an exception thrown whenever the input token stream does not conform
 * to the i18neasy-po format specification.
 */
export default class ParseError extends EsError
{
    constructor(message, {location, token} = {})
    {
        super(message);

        if (!location && !token)
        {
            throw new TypeError('either token or location must be specified');
        }

        this._location = location ? location : token.location;
        this._token = token;
    }

    get message()
    {
        let result = [];

        result.push(super.message);

        const token = this.token;
        const location = this.location;
        let components = [];

        /* istanbul ignore else */
        if (location)
        {
            components.push('location=' + location.toString());
        }

        /* istanbul ignore else */
        if (token)
        {
            components.push('token=' + token.toString());
        }

        /* istanbul ignore else */
        if (components)
        {
            result.push('[' + components.join(',') + ']');
        }

        return result.join(' ');
    }

    get location()
    {
        return this._location;
    }

    get token()
    {
        return this._token;
    }

    toString()
    {
        return 'ParseError: ' + this.message;
    }
}

