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


import AbstractDirective from './directive';


/**
 * @private
 */
export const DIRECTIVE_TRANSLATION_ID = '#!';


/**
 * @protected
 */
export const TRANSLATION_ID = '[a-zA-Z0-9$]+(?:[.][a-zA-Z0-9$]+)*';


/**
 * @private
 */
export const REGEXP_TRANSLATION_ID = new RegExp('^' + TRANSLATION_ID + '$');


/**
 * The class TranslationId models a token of the lexer that represents a
 * translation id directive in the input file.
 */
export default class TranslationId extends AbstractDirective
{
    /**
     * @param {Location} location - the location
     * @param {Object} options - the options
     * @param {String} options.value - the value
     */
    constructor(location, {value} = {})
    {
        super(location, DIRECTIVE_TRANSLATION_ID, {value});
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitTranslationId'])
        {
            visitor.visitTranslationId(this);
        }
    }

    /**
     * @override
     */
    validateValue(value)
    {
        super.validateValue(value);

        if (!REGEXP_TRANSLATION_ID.test(value))
        {
            throw new TypeError('MSG_ID_EXPECTED');
        }
    }
}

