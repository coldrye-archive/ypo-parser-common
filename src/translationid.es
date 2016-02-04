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


import {DIRECTIVE_TRANSLATION_ID} from './constants';

import AbstractDirective from './directive';


/**
 * The class TranslationId models a token of the lexer that represents a message id
 * location in the input file.
 */
export default class TranslationId extends AbstractDirective
{
    /**
     * @override
     * @param {Location} location - the location
     * @param {string} id - the id
     * @returns {TranslationId} - the configured instance
     */
    static createNode(location, id)
    {
        return new TranslationId(location, id);
    }

    /**
     * @param {Location} location - the location
     * @param {string} id - the id
     * @returns {void}
     */
    constructor(location, id)
    {
        super(location, DIRECTIVE_TRANSLATION_ID);

        this._id = id;
    }

    /**
     * Gets the id.
     *
     * @returns {string} - the id
     */
    get id()
    {
        return this._id;
    }
}

