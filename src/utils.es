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


/**
 * TODO:document
 *
 * @param {String} key - the key
 * @param {Array<AbstractOption>} options - the options
 * @param {AbstractOption} [defaultValue] - the default value
 * @returns {*} - the option or the default value
 */
export function findOption(key, options, defaultValue)
{
    let result = null;

    if (Array.isArray(options) && options.length)
    {
        for (let index=0; index<options.length; index++)
        {
            if (options[index].key == key)
            {
                result = options[index];
                break;
            }
        }
    }

    return result || defaultValue;
}


/**
 * FIXME:obsolete?
function normalizeString(value)
{
    return value && value.length == 0 || !value ? null : value;
}
 */


export function buildAuthorship({name, alias, email, url} = {})
{
    let result;
    const parts = [];

    /*istanbul ignore else*/
    if (name)
    {
        parts.push(name);
    }

    /*istanbul ignore else*/
    if (alias)
    {
        parts.push('"' + alias + '"');
    }

    /*istanbul ignore else*/
    if (email)
    {
        parts.push('<' + email + '>');
    }

    /*istanbul ignore else*/
    if (url)
    {
        parts.push('(' + url + ')');
    }

    if (parts.length)
    {
        result = parts.join(' ');
    }

    return result;
}


export function isNonEmptyString(value)
{
    return isString(value) && value.length > 0;
}


export function isString(value)
{
    return typeof value == 'string' || value instanceof String;
}

