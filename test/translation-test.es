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

import Translation from '../src/translation';
import Comment from '../src/comment';
import TranslationId from '../src/translationid';
import Variation from '../src/variation';
import Text from '../src/text';
import {Plural} from '../src/option';
import ParseError from '../src/exceptions';

import * as util from './util';
import {TEST_LOCATION} from './fixtures';


describe('Translation',
function ()
{
    const cut = new Translation(TEST_LOCATION);

    util.basicNodeTests(
        cut, TEST_LOCATION, util.nodeStringValue(Translation, TEST_LOCATION)
    );

    const id = new TranslationId(TEST_LOCATION, 'id');
    const comment = new Comment(TEST_LOCATION, 'comment');

    const cut2 = new Translation(TEST_LOCATION, id, [comment]);
    const option = new Plural(TEST_LOCATION);
    const text = new Text(TEST_LOCATION, 'text');
    const v1 = new Variation(TEST_LOCATION, cut, [option], [text]);
    const v2 = new Variation(TEST_LOCATION, cut2, [option], [text]);

    it('#addVariation() must fail on translation mismatch',
    function ()
    {
        assert.throws(
        function ()
        {
            cut2.addVariation(v1);
        }, ParseError);
    });

    it('#addVariation() must not fail',
    function ()
    {
        assert.doesNotThrow(
        function ()
        {
            cut2.addVariation(v2);
        });
    });

    it('#id must return correct value',
    function ()
    {
        assert.deepEqual(cut2.id, id);
    });

    it('#variations must return correct value',
    function ()
    {
        assert.deepEqual(cut2.variations, [v2]);
    });

    it('#variations when set must return correct value',
    function ()
    {
        const orig = cut2.variations;
        const repl = [];
        cut2.variations = repl;
        assert.strictEqual(cut2.variations, repl);
        cut2.variations = orig;
    });
});

