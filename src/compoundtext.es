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


/**
 * The class CompoundText models a token that combines multiple subsequent
 * text tokens.
 *
 * As such this may either represent a sequence of continuation lines, or
 * a sequence of multiple separate lines or a combination of both.
 */
export default class CompoundText extends AbstractText
{
    /**
     * @override
     * @param {Location} location - the location
     * @param {Array<AbstractToken>} tokens - the child tokens
     * @returns {CompoundText} - the configured token
     */
    static createNode(location, tokens = [])
    {
        const result = new CompoundText(location);

        for (const token of tokens)
        {
            result.addToken(token);
        }

        return result;
    }

    /**
     * @param {Location} location - the location
     * @returns {void}
     */
    constructor(location)
    {
        super(location);

        this._tokens = [];
    }

    /**
     * Gets whether this is represents a continuation of lines instead of
     * just multiple separate lines.
     *
     * @returns {boolean} - true whether this represents a continuation of lines
     */
    get isContinuation()
    {
        let result = false;

        /* istanbul ignore else */
        if (this.tokens)
        {
            result = this.tokens[0].isContinuation;
        }

        return result;
    }

    /**
     * Gets the tokens.
     *
     * @returns {Array<AbstractToken>} - the tokens
     */
    get tokens()
    {
        return this._tokens;
    }

    /**
     * Adds the specified token.
     *
     * @param {AbstractToken} token - the node
     * @returns {void}
     */
    addToken(token)
    {
        this._tokens.push(token);
    }

    /**
     * @override
     * @returns {string} - the augmented string
     */
    augmentToString()
    {
        const parts = [];
        for (const token of this.tokens)
        {
            parts.push(token.toString());
        }
        return 'lines=' + parts.join(',');
    }
}

