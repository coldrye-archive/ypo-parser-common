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
export const DIRECTIVE_CONTEXT = '#@';


/**
 * @protected
 */
export const QNAME = '[a-zA-Z0-9$]+';


/**
 * @private
 */
export const REGEXP_QNAME = new RegExp('^' + QNAME + '$');


/**
 * The class Context models a token of the lexer that represents a variation
 * context directive in the input file.
 */
export default class Context extends AbstractDirective
{
    /**
     * @param {Location} location - the location
     * @param {Object} options - the options
     * @param {String} options.value - the value
     */
    constructor(location, {value} = {})
    {
        super(location, DIRECTIVE_CONTEXT, {value});
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitContext'])
        {
            visitor.visitContext(this);
        }
    }

    /**
     * @override
     */
    validateValue(value)
    {
        super.validateValue(value);

        if (value && !REGEXP_QNAME.test(value))
        {
            throw new Error('value must be a QNAME');
        }
    }
}

