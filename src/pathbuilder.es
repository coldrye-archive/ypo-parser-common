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


import path from 'path';

import {DEFAULT_NS, REGEXP_LANGID, REGEXP_NSFQNAME} from './directives/option';
import {isString, isNonEmptyString} from './utils';


/**
 * The class PathBuilder models a builder for both output and input paths.
 */
export default class PathBuilder
{
    /**
     * @param {String} basepath - the base path
     * @param {String} extension - the file extension
     */
    constructor(basepath, extension)
    {
        if (!isString(basepath))
        {
            throw new TypeError('basepath must be a string');
        }

        if (!isNonEmptyString(extension))
        {
            throw new TypeError('extension must be a non empty string');
        }

        /**
         * @type {String}
         */
        this._basepath = basepath;

        /**
         * @type {String}
         */
        this._extension = extension[0] == '.' ? extension : '.' + extension;
    }

    /**
     * Gets the base path.
     *
     * @type {String}
     */
    get basepath()
    {
        return this._basepath;
    }

    /**
     * Gets the file extension.
     *
     * @type {String}
     */
    get extension()
    {
        return this._extension;
    }

    /**
     * Builds a path made up of the base path, the specified lcid, namespace,
     * and the file extension.
     *
     * @param {String} lcid - the locale id
     * @param {String} namespace=DEFAULT_NS - the optional namespace
     * @returns {String} - the path
     */
    buildPath(lcid, namespace=DEFAULT_NS)
    {
        if (!isNonEmptyString(lcid))
        {
            throw new TypeError('lcid must be a non empty string');
        }
        else if (!REGEXP_LANGID.test(lcid))
        {
            throw new TypeError(`invalid lcid "${lcid}"`);
        }

        if (!isNonEmptyString(namespace))
        {
            throw new TypeError('namespace must be a non empty string');
        }
        else if (!REGEXP_NSFQNAME.test(namespace))
        {
            throw new TypeError(`invalid namespace "${namespace}"`);
        }

        return path.join(
            this.basepath, lcid, namespace + this.extension
        );
    }
}

