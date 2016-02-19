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

import AbstractToken from '../src/token';

import * as util from './util';
import {TEST_LOCATION} from './fixtures';


describe('AbstractToken',
function ()
{
    class TokenImpl extends AbstractToken
    {}

    const cut = new TokenImpl(TEST_LOCATION);

    util.basicTokenTests(cut, TEST_LOCATION);

    it('#isWhitespace must return false',
    function ()
    {
        assert.equal(false, cut.isWhitespace);
    });

    it('.createNode() must throw error',
    function ()
    {
        assert.throws(
        function ()
        {
            TokenImpl.createNode(TEST_LOCATION);
        }, Error);
    });
});

