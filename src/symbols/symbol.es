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


import {abstract} from 'pingo';

import AbstractToken from '../token';
import Comment from '../tokens/comment';


/**
 * The class AbstractSymbol models the root of a hierarchy of derived classes
 * representing symbols of the parse process.
 */
@abstract
export default class AbstractSymbol extends AbstractToken
{
    constructor(location, {comments} = {})
    {
        super(location);

        this.comments = comments;
    }

    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitSymbol'])
        {
            visitor.visitSymbol(this);
        }
    }

    get value()
    {
        return undefined;
    }

    /*eslint no-unused-vars:0*/
    set value(value)
    {
        throw new Error('unsupported operation');
    }

    get comments()
    {
        return this._comments;
    }

    set comments(comments)
    {
        if (comments && !Array.isArray(comments))
        {
            throw new TypeError('comments must be an Array');
        }

        this._comments = [];
        /*istanbul ignore else*/
        if (comments)
        {
            for (let index=0; index<comments.length; index++)
            {
                this.addComment(comments[index]);
            }
        }
    }

    addComment(comment)
    {
        if (!(comment instanceof Comment))
        {
            throw new TypeError('comment must be an instance of Comment');
        }

        this._comments.push(comment);
    }
}

