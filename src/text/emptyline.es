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


/**
 * The class EmptyLine models a token of the lexer that represents an empty line in
 * the input file.
 *
 * All empty lines are considered whitespace, yet not all empty lines will be
 * discarded from the input as they can be part of multi line messages.
 *
 */
export default class EmptyLine extends AbstractText
{
    /**
     * @param {Location} location - the location
     */
    constructor(location)
    {
        super(location);
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitEmptyLine'])
        {
            visitor.visitEmptyLine(this);
        }
    }

    /**
     * @override
     */
    get value()
    {
        return '';
    }

    /**
     * @override
     */
    /*eslint no-unused-vars:0*/
    set value(value)
    {
        throw new Error('unsupported operation');
    }

    /**
     * @override
     */
    get isWhitespace()
    {
        return true;
    }
}

