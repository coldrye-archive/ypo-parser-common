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


import ParseError from './exceptions';

import AbstractSymbol from './symbol';


/**
 * The class Translation models a single translation that is identified by a
 * unique translation id.
 *
 * A single translation can have multiple variations.
 */
export default class Translation extends AbstractSymbol
{
    /**
     * @param {Location} location - the location
     * @param {TranslationId} id - the translation id
     * @param {Array<Comment>} comments - the comments or null
     * @returns {void}
     */
    constructor(location, id, comments)
    {
        super(location, comments);

        this._id = id;
        this._variations = [];
    }

    /**
     * Gets the translation id.
     *
     * @returns {TranslationId} - the translation id
     */
    get id()
    {
        return this._id;
    }

    /**
     * Gets the variations.
     *
     * @returns {Array<Variation>} - the variations or null
     */
    get variations()
    {
        return this._variations;
    }

    /**
     * Sets the variations.
     *
     * @param {Array<Variation>} variations - the variations or null
     * @returns {void}
     */
    set variations(variations)
    {
        this._variations = variations;
    }

    /**
     * Adds the specified variation to this.
     *
     * @param {Variation} variation - the variation
     * @returns {void}
     * @throws {ParseError} - in case that variation#translation does not match
     */
    addVariation(variation)
    {
        if (variation.translation !== this)
        {
            throw new ParseError(
                'translation mismatch',
                {location: this.location}
            );
        }

        this.variations.push(variation);
    }
}

