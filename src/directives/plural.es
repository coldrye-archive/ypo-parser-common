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
export const DIRECTIVE_PLURAL = '#+';


/**
 * @protected
 */
export const DEFAULT_CARDINALITY = 'inf';


/**
 * @protected
 */
export const CARDINALITY_ATOM = '(?:[0-9]+|inf)';


/**
 * @protected
 */
//FIXME -inf..+inf, N..+inf, -N..+M, -inf..N, inf, +N, -N
export const CARDINALITY =
    /* +-ATOM */
    `([+-]?${CARDINALITY_ATOM})`
    /* -ATOM..+-ATOM */
    + `|([-]?${CARDINALITY_ATOM}[.][.][+-]?${CARDINALITY_ATOM})`
    /* +ATOM..+ATOM */
    + `|([+]?${CARDINALITY_ATOM}[.][.][+]?${CARDINALITY_ATOM})`


/**
 * @private
 */
export const REGEXP_CARDINALITY = new RegExp('^' + CARDINALITY + '$');


/**
 * The class Plural models a token that represents a plural directive
 * for a given variation.
 *
 * See https://github.com/i18next/i18next/issues/541
 * for a proposal to make plural and interval a single concept
 */
export default class Plural extends AbstractDirective
{
    /**
     * @param {Location} location - the location
     * @param {Object} options - the options
     * @param {String} options.value - the cardinality or null
     */
    constructor(location, {value} = {})
    {
        super(
            location, DIRECTIVE_PLURAL, {value:value||DEFAULT_CARDINALITY}
        );
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitPlural'])
        {
            visitor.visitPlural(this);
        }
    }

    /**
     * @override
     */
    validateValue(value)
    {
        super.validateValue(value);

        if (!REGEXP_CARDINALITY.test(value))
        {
            throw new TypeError(`invalid cardinality, got "${value}"`);
        }
    }
}

