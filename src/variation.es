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


import {OPTION_PLURAL} from './constants';

import AbstractSymbol from './symbol';
import Translation from './translation';
import {findOption} from './util';


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
     * @param {Translation} translation - the translation
     * @param {Array<Comment>} comments - the comments or null
     * @param {Array<AbstractVariationOption>} options - the options or null
     * @param {Array<Text|EmptyLine>} lines - the lines or null
     * @returns {void}
     */
    constructor(location, translation, comments, options, lines)
    {
        super(location, comments, options);

        if (!translation || !(translation instanceof Translation))
        {
            throw new TypeError('MSG_MISSING_TRANSLATION');
        }

        this._translation = translation;
        this._lines = lines;
    }

    /**
     * Gets the associated translation.
     *
     * @returns {Translation} - the translation
     */
    get translation()
    {
        return this._translation;
    }

    /**
     * Gets the lines.
     *
     * @returns {Array<string>} - the lines or null
     */
    get lines()
    {
        return this._lines;
    }

    /**
     * Gets the plural option.
     *
     * @returns {Plural} - the plural option or null
     */
    get plural()
    {
        return findOption(OPTION_PLURAL, this.options);
    }
}

