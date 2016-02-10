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

import Variation from '../src/variation';
import Comment from '../src/comment';
import Translation from '../src/translation';
import TranslationId from '../src/translationid';
import Text from '../src/text';
import {Plural} from '../src/option';
import ParseError from '../src/exceptions';

import * as util from './util';
import {TEST_LOCATION} from './fixtures';


describe('Variation',
function ()
{
    const id = new TranslationId(TEST_LOCATION, 'id');
    const translation = new Translation(TEST_LOCATION, id);

    describe('constructor()',
    function ()
    {
        it('must fail on missing translation',
        function ()
        {
            assert.throws(
            function ()
            {
                new Variation(TEST_LOCATION);
            }, TypeError);
        });
    });

    const cut = new Variation(TEST_LOCATION, translation);

    util.basicSymbolTests(
        cut, TEST_LOCATION, util.nodeStringValue(Variation, TEST_LOCATION)
    );

    const comment = new Comment(TEST_LOCATION, 'comment');
    const opt1 = new Plural(TEST_LOCATION);
    const text = new Text(TEST_LOCATION, 'text');

    const cut2 = new Variation(
        TEST_LOCATION, translation, [comment], [opt1], [text]
    );

    it('#translation must return correct value',
    function ()
    {
        assert.deepEqual(cut2.translation, translation);
    });

    it('#comments must return correct value',
    function ()
    {
        assert.deepEqual(cut2.comments, [comment]);
    });

    it('#lines must return correct value',
    function ()
    {
        assert.deepEqual(cut2.lines, [text]);
    });

    it('#plural must return correct value',
    function ()
    {
        assert.deepEqual(cut2.plural, opt1);
    });
});

