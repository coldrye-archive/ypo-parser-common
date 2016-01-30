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


import AbstractNode from './node';


/**
 * The abstract class AbstractToken models the root of a hierarchy of derived classes
 * representing tokens produced by the lexer.
 *
 * @abstract
 */
export default class AbstractToken extends AbstractNode
{
    /**
     * Factory for creating instances of this.
     *
     * @abstract
     * @param {Location} location - the location
     * @returns {AbstractToken} - the configured instance
     */
    /* eslint no-unused-vars:0 */
    static createNode(location)
    {
        throw new Error('derived classes must implement this.');
    }

    /**
     * Gets whether this is considered whitespace.
     *
     * @returns {boolean} - true whether this is whitespace
     */
    get isWhitespace()
    {
        return false;
    }
}

