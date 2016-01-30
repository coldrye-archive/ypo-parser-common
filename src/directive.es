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


import AbstractToken from './token';


/**
 * The abstract class AbstractDirective models the root of a hierarchy of
 * derived classes that represent directive tokens produced by the lexer
 * during tokenization of the input file.
 *
 * @extends {AbstractToken}
 */
export default class AbstractDirective extends AbstractToken
{
    /**
     * @param {Location} location - the location
     * @param {string} directive - the directive
     * @returns {void}
     */
    constructor(location, directive)
    {
        super(location);

        this._directive = directive;
    }

    /**
     * Gets the directive.
     *
     * @returns {string} - the directive
     */
    get directive()
    {
        return this._directive;
    }
}

