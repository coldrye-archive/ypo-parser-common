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

import Line from '../src/line';

import * as util from './util';
import * as fixtures from './fixtures';


describe('Line',
function ()
{
    const cut = new Line(fixtures.TEST_LOCATION, fixtures.TEXT, false);

    util.basicTokenTests(cut, fixtures.TEST_LOCATION);

    it('#text must return correct value',
    function ()
    {
        assert.equal(fixtures.TEXT, cut.text);
    });

    it('#isEscapedDirective must return false',
    function ()
    {
        assert.ok(!cut.isEscapedDirective);
    });

    describe('.createNode()',
    function ()
    {
        const cut2 = Line.createNode(fixtures.TEST_LOCATION, fixtures.TEXT);

        it('must return properly configured instance',
        function ()
        {
            assert.deepEqual(cut2, cut);
        });

        const cut3 = Line.createNode(
            fixtures.TEST_LOCATION, fixtures.ESCAPED_DIRECTIVE
        );

        it('#isEscapedDirective must return true',
        function ()
        {
            assert.ok(cut3.isEscapedDirective);
        });

        it('#text must no longer contain escape character',
        function ()
        {
            assert.equal(cut3.text, fixtures.DIRECTIVE);
        });

        const cut4 = Line.createNode(
            fixtures.TEST_LOCATION, fixtures.WHITESPACE_PRESERVED
        );

        it('#text whitespace must be preserved',
        function ()
        {
            assert.equal(cut4.text, fixtures.WHITESPACE_PRESERVED);
        });

        const cut5 = Line.createNode(
            fixtures.TEST_LOCATION, fixtures.LINE_CONTINUATION
        );

        it('#isContinuation must return true',
        function ()
        {
            assert.ok(cut5.isContinuation);
        });

        it('#text must no longer contain line continuation escape',
        function ()
        {
            assert.equal(cut5.text, fixtures.TEXT);
        });
    });
});

