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


import {REGEXP_ESCAPED_DIRECTIVE} from './constants';

import AbstractNode from './node';


/**
 * The class Text models a token that represents a single location from the input
 * file.
 */
export default class Text extends AbstractNode
{
    /**
     * @override
     * @param {Location} location - the location
     * @param {string} text - the text
     * @returns {Text} - the configured token
     */
    static createNode(location, text)
    {
        let isEscapedDirective = REGEXP_ESCAPED_DIRECTIVE.exec(text) !== null;
        let actualText = text;
        if (isEscapedDirective)
        {
            actualText = text.substring(1);
        }

        return new Text(location, actualText, isEscapedDirective);
    }

    /**
     * @param {Location} location - the location
     * @param {string} text - the text
     * @param {boolean} isEscapedDirective - true whether text represents an
     *                                       escaped directive
     * @returns {void}
     */
    constructor(location, text, isEscapedDirective)
    {
        super(location);

        this._isEscapedDirective = isEscapedDirective;
        this._text = text;
    }

    /**
     * Gets whether this is an escaped directive.
     *
     * @returns {boolean} - true whether this is an escaped directive
     */
    get isEscapedDirective()
    {
        return this._isEscapedDirective;
    }

    /**
     * Gets the text.
     *
     * @returns {string} - the text
     */
    get text()
    {
        return this._text;
    }
}

