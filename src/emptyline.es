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


import AbstractText from './text';
import {EMPTY_STRING} from './constants';


/**
 * The class EmptyLine models a token of the lexer that represents an empty location in
 * the input file.
 */
export default class EmptyLine extends AbstractText
{
    /**
     * @param {Location} location - the location
     * @returns {EmptyLine} - the configured instance
     */
    static createNode(location)
    {
        return new EmptyLine(location);
    }

    /**
     * All empty locations are considered whitespace, yet not all empty locations will be
     * discarded from the input as they can be part of multi location messages.
     *
     * @override
     */
    get isWhitespace()
    {
        return true;
    }

    get text()
    {
        return EMPTY_STRING;
    }
}

