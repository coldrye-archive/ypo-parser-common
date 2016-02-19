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


import AbstractText from './text';
import {REGEXP_ESCAPED_DIRECTIVE} from './constants';


/**
 * The class Line models a token that represents a single line of text from the
 * input file.
 */
export default class Line extends AbstractText
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

        let isContinuation = actualText[actualText.length - 1] == '\\';
        if (isContinuation)
        {
            actualText = text.substring(0, actualText.length - 1);
        }

        return new Line(
            location, actualText, isEscapedDirective, isContinuation
        );
    }

    /**
     * @param {Location} location - the location
     * @param {string} text - the text
     * @param {boolean} isEscapedDirective=false - true whether text represents an
     *                                       escaped directive
     * @param {boolean} isContinuation=false - true whether we have a line continuation
     * @returns {void}
     */
    constructor(
        location, text, isEscapedDirective=false, isContinuation=false
    )
    {
        super(location);

        this._isEscapedDirective = isEscapedDirective;
        this._isContinuation = isContinuation;
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
     * Gets whether this needs to be merged with the following text token.
     *
     * @returns {boolean} - true whether this needs to be merged with the following token
     */
    get isContinuation()
    {
        return this._isContinuation;
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

    /**
     * @override
     * @returns {string} - the augmented string
     */
    augmentToString()
    {
        const parts = [];
        parts.push('isEscapedDirective=\"' + this.isEscapedDirective + '\"');
        parts.push('isContinuation=\"' + this.isContinuation + '\"');
        parts.push('text=\"' + this.text + '\"');
        return parts.join(',');
    }
}

