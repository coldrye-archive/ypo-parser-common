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


import AbstractSymbol from './symbol';
import Translation from './translation';
import Context from '../directives/context';
import Plural from '../directives/plural';
import AbstractText from '../text/text';
import CompoundText from '../text/compoundtext';


/**
 * The class Variation models a single variation of a given translation.
 * Variations can optionally be plural.
 *
 * A variation's text lines are represented by either empty lines or
 * non empty text, or combinations thereof.
 */
export default class Variation extends AbstractSymbol
{
    /**
     * @param {Location} location - the location
     * @param {object} options - the options
     * @param {Translation} options.translation - the optional translation
     * @param {AbstractText} options.text - the optional text
     * @param {Context} options.context - the optional context
     * @param {Plural} options.plural - the optional plural
     * @param {Array<Comment>} options.comments - the comments or null
     */
    constructor(location, {translation, text, context, plural, comments} = {})
    {
        super(location, {comments});

        this.context = context;
        this.text = text;
        this.plural = plural;

        /*istanbul ignore else*/
        if (translation)
        {
            this.translation = translation;
        }
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitVariation'])
        {
            visitor.visitVariation(this);
        }
    }

    /**
     * Gets the associated translation.
     *
     * @type {Translation}
     */
    get translation()
    {
        return this._translation;
    }

    /**
     * Sets the associated translation.
     *
     * @param {Translation} translation - the translation
     * @throws {TypeError} - in case translation is not an instance of Translation
     * @type {Translation}
     */
    set translation(translation)
    {
        if (!(translation instanceof Translation))
        {
            throw new TypeError(
                'translation must be an instance of Translation'
            );
        }

        this._translation = translation;
    }

    /**
     * Gets the optional context.
     *
     * @type {Context}
     */
    get context()
    {
        return this._context;
    }

    /**
     * Sets the optional context. context may be null or undefined.
     *
     * @param {Context} context - the context
     * @throws {TypeError} - in case context is not an instance of Context
     * @type {Context}
     */
    set context(context)
    {
        if (context && !(context instanceof Context))
        {
            throw new TypeError('context must be an instance of Context');
        }

        this._context = context;
    }

    /**
     * Gets the text.
     *
     * @type {CompoundText}
     */
    get text()
    {
        return this._text;
    }

    /**
     * Sets the text. text may be null or undefined.
     *
     * @param {AbstractText} text - the text
     * @throws {TypeError} - in case text is not an instance of AbstractText
     * @type {CompoundText}
     */
    set text(text)
    {
        if (text && !(text instanceof AbstractText))
        {
            throw new TypeError('text must be an instance of AbstractText');
        }

        this._text = undefined;
        /*istanbul ignore else*/
        if (text)
        {
            if (text instanceof CompoundText)
            {
                this._text = text;
            }
            else
            {
                this._text = new CompoundText(text.location, {tokens:[text]});
            }
        }
    }

    /**
     * Gets the plural.
     *
     * @type {Plural}
     */
    get plural()
    {
        return this._plural;
    }

    /**
     * Sets the plural. plural may be null or undefined.
     *
     * @param {Plural} plural - the plural
     * @throws {TypeError} - in case plural is not an instance of Plural
     * @type {Plural}
     */
    set plural(plural)
    {
        if (plural && !(plural instanceof Plural))
        {
            throw new TypeError('plural must be an instance of Plural');
        }

        this._plural = plural;
    }
}

