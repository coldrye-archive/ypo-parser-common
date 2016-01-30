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


import {DEFAULT_NS, OPTION_LANG, OPTION_NS} from './constants';

import {Namespace} from './option';

import AbstractSymbol from './symbol';
import {findOption} from './util';


/**
 * TODO:document
 */
export default class Unit extends AbstractSymbol
{
    /**
     * @param {Location} location - the location
     * @param {Array<Comment>} comments - the comments or null
     * @param {Array<AbstractUnitOption>} options - the unit options or null
     * @param {Array<Authorship>} authorships - the authorships or null
     * @param {Array<Translation>} translations - the translations or null
     * @returns {void}
     */
    constructor(
        location, comments, options, authorships, translations
    )
    {
        super(location, comments, options);

        this._authorships = authorships;
        this._translations = translations;
        this._warnings = null;
    }

    /**
     * Gets the authorships.
     *
     * @returns {Array<Authorship>} - the authorships or null
     */
    get authorships()
    {
        return this._authorships;
    }

    /**
     * Gets the lang option.
     *
     * @returns {Lang} - the lang
     */
    get lang()
    {
        return findOption(OPTION_LANG, this.options);
    }

    /**
     * Gets the (default) namespace option.
     *
     * @returns {Namespace} - the namespace
     */
    get ns()
    {
        return findOption(
            OPTION_NS, this.options,
            new Namespace(this.location, DEFAULT_NS)
        );
    }

    /**
     * Gets the available translations.
     *
     * @returns {Array<Translation>} - the translations or null
     */
    get translations()
    {
        return this._translations;
    }

    /**
     * Sets the translations.
     *
     * @param {Array<Translation>} translations - the translations or null
     * @returns {void}
     */
    set translations(translations)
    {
        this._translations = translations;
    }

    /**
     * Gets the warnings that have occurred during parse.
     *
     * @returns {Array<string>} - the warnings or null
     */
    get warnings()
    {
        return this._warnings;
    }

    /**
     * Sets the warnings.
     *
     * @param {Array<string>} warnings - the warnings or null
     * @returns {void}
     */
    set warnings(warnings)
    {
        this._warnings = warnings;
    }
}

