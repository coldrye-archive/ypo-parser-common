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


import {DIRECTIVE_COMMENT} from './constants';

import AbstractDirective from './directive';


/**
 * The class Comment models a token of the lexer that represents a single location
 * of comment in the input file.
 */
export default class Comment extends AbstractDirective
{
    /**
     * @override
     * @param {Location} location - the location
     * @param {string} comment - the comment
     * @returns {Comment} - the configured instance
     */
    static createNode(location, comment)
    {
        return new Comment(location, comment);
    }

    /**
     * @param {Location} location - the location
     * @param {string} comment - the comment
     * @returns {void}
     */
    constructor(location, comment)
    {
        super(location, DIRECTIVE_COMMENT);

        this._comment = comment;
    }

    /**
     * Gets the comment.
     *
     * @returns {string} - the comment
     */
    get comment()
    {
        return this._comment;
    }

    /**
     * @override
     */
    augmentToString()
    {
        return 'comment=\"' + this.comment + '\"';
    }
}

