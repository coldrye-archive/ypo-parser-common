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


import Variation from '../../src/symbols/variation';
import Comment from '../../src/tokens/comment';
import Context from '../../src/directives/context';
import CompoundText from '../../src/text/compoundtext';
import Translation from '../../src/symbols/translation';
import TranslationId from '../../src/directives/translationid';
import Line from '../../src/text/line';
import Plural from '../../src/directives/plural';
import ParseError from '../../src/exceptions';
import AbstractVisitor from '../../src/visitor';

import basicSymbolTests from './utils';
import {TEST_LOCATION} from '../fixtures';


describe('Variation',
function ()
{
    const id = new TranslationId(TEST_LOCATION, {value:'id'});
    const translation = new Translation(TEST_LOCATION, {id:id});
    const compound = new CompoundText(TEST_LOCATION);

    describe('constructor()',
    function ()
    {
        it('must not fail on missing translation',
        function ()
        {
            function tc()
            {
                new Variation(TEST_LOCATION);
            }
            tc.should.not.throw(TypeError);
        });

        it('must not fail on missing context',
        function ()
        {
            function tc()
            {
                new Variation(TEST_LOCATION, {translation});
            }
            tc.should.not.throw();
        });
    });

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitSymbol(token)
        {}

        visitVariation(token)
        {}
    }

    const comment = new Comment(TEST_LOCATION, {value:'comment'});
    const context = new Context(TEST_LOCATION, {value:'context'});
    const text = new Line(TEST_LOCATION, {value:'text'});

    const cut = new Variation(
        TEST_LOCATION,
        {translation, context, text, comments:[comment]}
    );

    basicSymbolTests(
        cut, TEST_LOCATION, {visitor:VisitorImpl, comments:[comment]}
    );

    it('#translation must return correct value',
    function ()
    {
        cut.translation.should.deep.equal(translation);
    });

    it('#context must return correct value',
    function ()
    {
        cut.context.should.equal(context);
    });

    it('#text must return correct value',
    function ()
    {
        cut.text.tokens.should.deep.equal([text]);
    });

    it('#plural == undefined',
    function ()
    {
        should.not.exist(cut.plural);
    });

    it('#translation = undefined must fail',
    function ()
    {
        function tc()
        {
            cut.translation = undefined;
        }
        tc.should.throw(TypeError, 'translation must be an instance');
    });

    it('#context = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.context = new Object();
        }
        tc.should.throw(TypeError, 'context must be an instance');
    });

    it('#text = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.text = new Object();
        }
        tc.should.throw(TypeError, 'text must be an instance');
    });

    it('#plural = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.plural = new Object();
        }
        tc.should.throw(TypeError, 'plural must be an instance');
    });
});

