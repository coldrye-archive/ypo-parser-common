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


import {isNonEmptyString} from './utils';


/**
 * The class Location models an object that provides information on which line
 * a given artifact of the parse process is located in a specified input file.
 */
export default class Location
{
    /**
     * @param {String} file - the file name
     * @param {Number} line - the line number, a positive integer > 0
     * @throws {TypeError} - in case either file or line are invalid
     */
    constructor(file, line)
    {
        if (!isNonEmptyString(file))
        {
            throw new TypeError('file must be a non empty string');
        }

        // compensate for dummy location: permit -1
        if (line != -1
            && (typeof line != 'number' || line <= 0
            || Math.floor(line) != line)
        )
        {
            throw new TypeError(
                `line must be a positive integer > 0, got ${line}`
            );
        }

        this._file = file;
        this._line = line;
    }

    /**
     * Gets the file name.
     *
     * @type {String}
     */
    get file()
    {
        return this._file;
    }

    /**
     * Gets the line number.
     *
     * @type {Number}
     */
    get line()
    {
        return this._line;
    }

    /**
     * Renders a representation of this in the format __file:line__.
     *
     * @returns {String} - the string representation of this
     */
    toString()
    {
        return `${this.file}:${this.line}`;
    }

}


Location.DUMMY_LOCATION = new Location('unknown', -1);

