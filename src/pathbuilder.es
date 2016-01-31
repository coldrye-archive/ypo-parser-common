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

import {DEFAULT_NS} from './constants';


/**
 * The class PathBuilder models a builder for both output and input paths.
 *
 * @public
 */
export default class PathBuilder
{
    /**
     * @public
     * @param {string} basepath - the resolved base path
     * @param {string} extension - the file extension without the leading dot
     * @returns {void}
     */
    constructor(basepath, extension)
    {
        /* istanbul ignore else */
        if (typeof basepath != 'string' || !basepath.length)
        {
            throw new TypeError('MSG_BASEPATH_MUST_BE_NON_EMPTY_STRING');
        }

        /* istanbul ignore else */
        if (typeof extension != 'string' || !extension.length)
        {
            throw new TypeError('MSG_EXTENSION_MUST_BE_NON_EMPTY_STRING');
        }

        this._basepath = basepath;
        this._extension = extension;
    }

    /**
     * Gets the base path.
     *
     * @public
     * @returns {string} - the base path
     */
    get basepath()
    {
        return this._basepath;
    }

    /**
     * Gets the file extension.
     *
     * @public
     * @returns {string} - the file extension without the leading dot
     */
    get extension()
    {
        return this._extension;
    }

    /**
     * Builds a path made up of the base path, the specified lcid, namespace,
     * and the file extension.
     *
     * @public
     * @param {string} lcid - the locale id
     * @param {string} namespace=DEFAULT_NS - the optional namespace
     * @returns {string} - the path
     */
    buildPath(lcid, namespace=DEFAULT_NS)
    {
        /* istanbul ignore else */
        if (typeof lcid != 'string' || !lcid.length)
        {
            throw new TypeError('MSG_LCID_MUST_BE_NON_EMPTY_STRING');
        }

        /* istanbul ignore else */
        if (typeof namespace != 'string' || !namespace.length)
        {
            throw new TypeError('MSG_NAMSPACE_MUST_BE_NON_EMPTY_STRING');
        }

        return path.join(this.basepath, lcid, namespace + '.' + this.extension);
    }
}

