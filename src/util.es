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
 * @param {string} key - the key
 * @param {object} options - the options
 * @param {*} defaultValue - the default value
 * @returns {*} - the option value or the default value
 */
export function findOption(key, options, defaultValue = undefined)
{
    let result = null;

    /* istanbul ignore else */
    if (options)
    {
        for (const option of options)
        {
            if (option.key == key)
            {
                result = option;
                break;
            }
        }
    }

    return result || defaultValue;
}

