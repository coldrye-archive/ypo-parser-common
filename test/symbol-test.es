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


import assert from 'esaver';

import AbstractSymbol from '../src/symbol';
import Comment from '../src/comment';
import {Namespace} from '../src/option';

import * as util from './util';
import {TEST_LOCATION} from './fixtures';


describe('AbstractSymbol',
function ()
{
    class SymbolImpl extends AbstractSymbol
    {}

    const cut = new SymbolImpl(TEST_LOCATION);
    util.basicSymbolTests(cut, TEST_LOCATION);

    const comment = new Comment(TEST_LOCATION, 'comment');
    const ns = new Namespace(TEST_LOCATION, 'ns');
    const cut2 = new SymbolImpl(TEST_LOCATION, [comment], [ns]);
    util.basicSymbolTests(cut, TEST_LOCATION, {comment, ns});
});

