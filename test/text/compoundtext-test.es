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


import CompoundText from '../../src/text/compoundtext';
import Line from '../../src/text/line';
import AbstractVisitor from '../../src/visitor';

import basicTextTests from './utils';
import {TEST_LOCATION} from '../fixtures';


describe('CompoundText',
function ()
{
    const cut = new CompoundText(TEST_LOCATION);

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitText(token)
        {}

        visitCompoundText(token)
        {}
    }

    basicTextTests(cut, TEST_LOCATION, {visitor:VisitorImpl});

    const t1 = new Line(TEST_LOCATION, {value:'line1'});
    const t2 = new Line(TEST_LOCATION, {value:'\n'});

    it('#value = * must fail',
    function ()
    {
        function tc()
        {
            cut.value = '*';
        }
        tc.should.throw(Error, 'unsupported');
    });

    it('#addToken() must behave as expected',
    function ()
    {
        cut.addToken(t1);
        cut.tokens.should.deep.equal([t1]);
        cut.addToken(t2);
        cut.tokens.should.deep.equal([t1,t2]);
    });

    it('#addToken() must fail on invalid token',
    function ()
    {
        function tc()
        {
            cut.addToken(new Object());
        }
        tc.should.throw(TypeError, 'token must be an instance');
    });

    it('#tokens = [...] must behave as expected',
    function ()
    {
        cut.tokens = [t1, t2];
        cut.tokens.should.deep.equal([t1,t2]);
    });

    it('#tokens = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.tokens = new Object();
        }
        tc.should.throw(TypeError, 'tokens must be an Array');
    });

    const cut2 = new CompoundText(TEST_LOCATION);
    const t3 = new Line(TEST_LOCATION, {value:'line3'});
    cut2.addToken(t1);
    cut2.addToken(t2);
    cut2.addToken(t3);
    basicTextTests(cut2, TEST_LOCATION);
});

