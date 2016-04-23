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


import AbstractText from '../../src/text/text';
import AbstractVisitor from '../../src/visitor';

import basicTextTests from './utils';
import * as fixtures from '../fixtures';


describe('AbstractText',
function ()
{
    class TextImpl extends AbstractText
    {}

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitText(token)
        {}
    }

    const cut = new TextImpl(
        fixtures.TEST_LOCATION, {value:fixtures.TEXT}
    );

    basicTextTests(
        cut, fixtures.TEST_LOCATION, {value:fixtures.TEXT, visitor:VisitorImpl}
    );

    it('#value = undefined must not fail',
    function ()
    {
        function tc()
        {
            cut.value = undefined;
        }
        tc.should.not.throw(TypeError);
    });

    it('#value = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.value = new Object();
        }
        tc.should.throw(TypeError);
    });
});

