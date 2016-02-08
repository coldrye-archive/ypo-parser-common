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

        let isLineContinuation = actualText[actualText.length - 1] == '\\';
        if (isLineContinuation)
        {
            actualText = text.substring(0, actualText.length - 1);
        }

        return new Text(
            location, actualText, isEscapedDirective, isLineContinuation
        );
    }

    /**
     * @param {Location} location - the location
     * @param {string} text - the text
     * @param {boolean} isEscapedDirective=false - true whether text represents an
     *                                       escaped directive
     * @param {boolean} isLineContinuation=false - true whether we have a line continuation
     * @returns {void}
     */
    constructor(
        location, text, isEscapedDirective=false, isLineContinuation=false
    )
    {
        super(location);

        this._isEscapedDirective = isEscapedDirective;
        this._isLineContinuation = isLineContinuation;
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
    get isLineContinuation()
    {
        return this._isLineContinuation;
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
        parts.push('isLineContinuation=\"' + this.isLineContinuation + '\"');
        parts.push('text=\"' + this.text + '\"');
        return parts.join(',');
    }
}

