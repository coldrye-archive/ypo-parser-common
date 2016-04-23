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


import AbstractDirective from '../../src/directives/directive';
import AbstractVisitor from '../../src/visitor';

import basicDirectiveTests from './utils';
import {TEST_LOCATION, TEST_DIRECTIVE} from '../fixtures';


describe('AbstractDirective',
function ()
{
    class DirectiveImpl extends AbstractDirective
    {}

    const cut = new DirectiveImpl(TEST_LOCATION, TEST_DIRECTIVE);

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitDirective(token)
        {}
    }

    basicDirectiveTests(
        cut, TEST_LOCATION, TEST_DIRECTIVE, {visitor:VisitorImpl}
    );

    it('must fail on invalid directive',
    function ()
    {
        function tc1()
        {
            new DirectiveImpl(TEST_LOCATION);
        }
        tc1.should.throw(TypeError, 'directive must be a non empty string');
    });
});

