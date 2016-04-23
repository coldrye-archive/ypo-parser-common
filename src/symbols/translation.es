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
import TranslationId from '../directives/translationid';
import Variation from './variation';


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
     * @param {object} options - the options
     * @param {TranslationId} id - the optional id
     * @param {Array<Variation>} options.variations - the optional variations
     * @param {Array<Comment>} options.comments - the optional comments
     */
    constructor(location, {id, variations, comments} = {})
    {
        super(location, {comments});

        this.id = id;
        this.variations = variations;
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitTranslation'])
        {
            visitor.visitTranslation(this);
        }
    }

    /**
     * Gets the translation id.
     *
     * @type {TranslationId}
     */
    get id()
    {
        return this._id;
    }

    /**
     * Sets the translation id. id may be null or undefined.
     *
     * @param {TranslationId} id - the id
     * @throws {TypeError} - in case id is not an instance of TranslationId
     * @type {TranslationId}
     */
    set id(id)
    {
        if (id && !(id instanceof TranslationId))
        {
            throw new TypeError('id must be an instance of TranslationId');
        }

        this._id = id;
    }

    /**
     * Gets the variations.
     *
     * @type {Array<Variation>}
     */
    get variations()
    {
        return this._variations;
    }

    /**
     * Sets the variations.
     *
     * @param {Array<Variation>} variations - the variations or null
     * @throws {TypeError} - in case variations is not an Array or any one of the variations is not an instance of Variation
     * @type {Array<Variation>}
     */
    set variations(variations)
    {
        if (variations && !Array.isArray(variations))
        {
            throw new TypeError('variations must be an Array');
        }

        this._variations = [];
        /*istanbul ignore else*/
        if (variations)
        {
            for (let index=0; index<variations.length; index++)
            {
                this.addVariation(variations[index]);
            }
        }
    }

    /**
     * Adds the specified variation to this.
     *
     * @param {Variation} variation - the variation
     * @throws {TypeError} - in case variation is not an instance of Variation
     * @returns {void}
     */
    addVariation(variation)
    {
        if (!(variation instanceof Variation))
        {
            throw new TypeError('variation must be an instance of Variation');
        }

        variation.translation = this;
        this.variations.push(variation);
    }
}

