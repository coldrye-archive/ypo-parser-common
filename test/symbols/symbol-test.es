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


import AbstractSymbol from '../../src/symbols/symbol';
import Comment from '../../src/tokens/comment';
import {Namespace} from '../../src/directives/option';
import AbstractVisitor from '../../src/visitor';

import basicSymbolTests from './utils';
import {TEST_LOCATION} from '../fixtures';


describe('AbstractSymbol',
function ()
{
    class SymbolImpl extends AbstractSymbol
    {}

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitSymbol(token)
        {}
    }

    const comment = new Comment(TEST_LOCATION, {value:'comment'});
    const ns = new Namespace(TEST_LOCATION, {value:'ns'});
    const cut = new SymbolImpl(
        TEST_LOCATION, {comments:[comment], options:[ns]}
    );

    basicSymbolTests(
        cut, TEST_LOCATION,
        {comments:[comment], options:[ns], visitor:VisitorImpl}
    );
});

