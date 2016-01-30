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
 * The class Location models an object that holds information on where a
 * specific artifact of the parse process was encountered in a given file.
 */
export default class Location
{
    /**
     * @param {string} file - the file name
     * @param {Number} line - the line number
     * @returns {void}
     */
    constructor(file, line)
    {
        this._file = file;
        this._line = line;
    }

    /**
     * Gets the file name.
     *
     * @returns {string} - the file name
     */
    get file()
    {
        return this._file;
    }

    /**
     * Gets the line number.
     *
     * @returns {Number} - the line number
     */
    get line()
    {
        return this._line;
    }

    /**
     * Renders a representation of this in the format ``file:line``.
     *
     * @returns {string} - the string representation of this
     */
    toString()
    {
        return this.file + ':' + this.line;
    }
}

