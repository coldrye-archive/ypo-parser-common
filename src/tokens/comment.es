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


import AbstractToken from '../token';


/**
 * The class Comment models a token of the lexer that represents a single
 * comment line in the input file.
 */
export default class Comment extends AbstractToken
{
    /**
     * @param {Location} location - the location
     * @param {Object} options - the options
     * @param {String} options.value - the comment
     */
    constructor(location, {value} = {})
    {
        super(location, {value});
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitComment'])
        {
            visitor.visitComment(this);
        }
    }

    /**
     * @override
     */
    get isWhitespace()
    {
        return true;
    }
}

