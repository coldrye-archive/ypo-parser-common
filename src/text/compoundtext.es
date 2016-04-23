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
     * @param {Location} location - the location
     * @param {Object} options - the options
     * @param {Array<AbstractText>} options.tokens - the child text tokens
     */
    constructor(location, {tokens} = {})
    {
        super(location);

        this.tokens = tokens;
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitCompoundText'])
        {
            visitor.visitCompoundText(this);
        }
    }

    /**
     * @override
     */
    get value()
    {
        return undefined;
    }

    /**
     * @override
     */
    /*eslint no-unused-vars:0*/
    set value(value)
    {
        throw new Error('unsupported operation');
    }

    /**
     * Gets the tokens.
     *
     * @type {Array<AbstractText>}
     */
    get tokens()
    {
        return this._tokens;
    }

    /**
     * Sets the child text tokens.
     *
     * @param {Array<AbstractText>} tokens - the child text tokens
     * @throws {TypeError} - in case tokens is not an array or any one of the tokens is not an instance of AbstractText
     * @type {Array<AbstractText>}
     */
    set tokens(tokens)
    {
        this._tokens = [];
        if (tokens)
        {
            if (!Array.isArray(tokens))
            {
                throw new TypeError('tokens must be an Array');
            }

            for (let index=0; index<tokens.length; index++)
            {
                this.addToken(tokens[index]);
            }
        }
    }

    /**
     * Adds the specified token.
     *
     * @param {AbstractText} token - the text token
     * @throws {TypeError} - in case token is not an instance of AbstractText
     * @returns {void}
     */
    addToken(token)
    {
        if (!(token instanceof AbstractText))
        {
            throw new TypeError('token must be an instance of AbstractText');
        }

        this._tokens.push(token);
    }

    /**
     * @override
     * @returns {String} - the augmented string
     */
    augmentToString()
    {
        const parts = [];
        const tokens = this.tokens;
        for (let index=0; index<tokens.length; index++)
        {
            parts.push(tokens[index].toString());
        }
        return 'tokens=' + parts.join(',');
    }
}

