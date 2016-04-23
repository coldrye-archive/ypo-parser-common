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


import Translation from '../../src/symbols/translation';
import Comment from '../../src/directives/comment';
import TranslationId from '../../src/directives/translationid';
import Variation from '../../src/symbols/variation';
import Line from '../../src/text/line';
import Plural from '../../src/directives/plural';
import ParseError from '../../src/exceptions';
import AbstractVisitor from '../../src/visitor';

import basicSymbolTests from './utils';
import {TEST_LOCATION} from '../fixtures';


describe('Translation',
function ()
{
    const cut = new Translation(TEST_LOCATION);

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitSymbol(token)
        {}

        visitTranslation(token)
        {}
    }

    basicSymbolTests(cut, TEST_LOCATION, {visitor:VisitorImpl});

    const id = new TranslationId(TEST_LOCATION, {value:'id'});
    const comment = new Comment(TEST_LOCATION, {value:'comment'});

    const cut2 = new Translation(TEST_LOCATION, {id, comments:[comment]});
    const option = new Plural(TEST_LOCATION);
    const text = new Line(TEST_LOCATION, {value:'text'});
    const v1 = new Variation(TEST_LOCATION, cut, text, {options:[option]});
    const v2 = new Variation(TEST_LOCATION, cut2, text, {options:[option]});

    it('#id = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut2.id = new Object();
        }
        tc.should.throw(TypeError, 'id must be an instance');
    });

    it('#variations = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut2.variations = new Object();
        }
        tc.should.throw(TypeError, 'variations must be an Array');
    });

    it('#addVariation() must fail on invalid variation',
    function ()
    {
        function tc()
        {
            cut2.addVariation();
        }
        tc.should.throw(TypeError, 'variation must be an instance');
    });

    it('#addVariation() must not fail',
    function ()
    {
        function tc()
        {
            cut2.addVariation(v2);
        }
        tc.should.not.throw();
    });

    it('#id must return correct value',
    function ()
    {
        cut2.id.should.deep.equal(id);
    });

    it('#variations must return correct value',
    function ()
    {
        cut2.variations.should.deep.equal([v2]);
    });

    it('#variations when set must return correct value',
    function ()
    {
        const orig = cut2.variations;
        const repl = [];
        cut2.variations = repl;
        cut2.variations.should.deep.equal(repl);
        cut2.variations = orig;
    });
});

