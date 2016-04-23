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


import EmptyLine from '../../src/text/emptyline';
import AbstractVisitor from '../../src/visitor';

import basicTextTests from './utils';
import * as fixtures from '../fixtures';


describe('EmptyLine',
function ()
{
    const cut = new EmptyLine(fixtures.TEST_LOCATION);

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitText(token)
        {}

        visitEmptyLine(token)
        {}
    }

    basicTextTests(
        cut, fixtures.TEST_LOCATION,
        {value:'', visitor:VisitorImpl, isWhitespace:true}
    );

    it('#value = * must fail',
    function ()
    {
        function tc()
        {
            cut.value = '*';
        }
        tc.should.throw(Error, 'unsupported');
    });
});

