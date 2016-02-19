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

import CompoundText from '../src/compoundtext';
import Line from '../src/line';

import * as util from './util';
import {TEST_LOCATION} from './fixtures';


describe('CompoundText',
function ()
{
    const cut = new CompoundText(TEST_LOCATION);
    const t1 = Line.createNode(TEST_LOCATION, 'line1');
    const t2 = Line.createNode(TEST_LOCATION, '\n');

    it('#addToken() must behave as expected',
    function ()
    {
        assert.expect(2);
        cut.addToken(t1);
        assert.deepEqual(cut.tokens, [t1]);
        cut.addToken(t2);
        assert.deepEqual(cut.tokens, [t1,t2]);
    });

    util.basicTokenTests(
        cut, TEST_LOCATION, util.tokenStringValue(CompoundText, TEST_LOCATION)
    );

    describe('.createNode()',
    function ()
    {
        const cut2 = CompoundText.createNode(TEST_LOCATION, [t1,t2]);

        it('must return properly configured instance',
        function ()
        {
            assert.deepEqual(cut2, cut);
        });

        it('must not fail on missing tokens',
        function ()
        {
            assert.doesNotThrow(
            function ()
            {
                CompoundText.createNode(TEST_LOCATION);
            });
        });
    });

    const cut2 = new CompoundText(TEST_LOCATION);
    const t3 = Line.createNode(TEST_LOCATION, 'line3');
    cut2.addToken(t1);
    cut2.addToken(t2);
    cut2.addToken(t3);

    describe('when combining multiple separate lines',
    function ()
    {
        it('#isContinuation must return false',
        function ()
        {
            assert.ok(!cut2.isContinuation);
        });
    });

    const cut3 = new CompoundText(TEST_LOCATION);
    const t4 = Line.createNode(TEST_LOCATION, 'line1 \\');
    cut3.addToken(t4);
    cut3.addToken(cut2);

    describe('when combining continuations with a compound of separate lines',
    function ()
    {
        it('#isContinuation must return true',
        function ()
        {
            assert.ok(cut3.isContinuation);
        });
    });

    const cut4 = new CompoundText(TEST_LOCATION);
    cut4.addToken(cut3);
    cut4.addToken(cut2);

    describe(
    'when combining a continuation compound with a separate line compound',
    function ()
    {
        it('#isContinuation must return true',
        function ()
        {
            assert.ok(cut4.isContinuation);
        });
    });

    const cut5 = new CompoundText(TEST_LOCATION);
    cut5.addToken(cut2);
    cut5.addToken(cut3);

    describe(
    'when combining a separate line compound with a continuation compound',
    function ()
    {
        it('#isContinuation must return false',
        function ()
        {
            assert.ok(!cut5.isContinuation);
        });
    });
});

