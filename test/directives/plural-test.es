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


import {
    default as Plural, DIRECTIVE_PLURAL, DEFAULT_CARDINALITY
} from '../../src/directives/plural';
import AbstractVisitor from '../../src/visitor';

import basicDirectiveTests from './utils';
import * as fixtures from '../fixtures';


describe('Plural',
function ()
{
    const cut = new Plural(fixtures.TEST_LOCATION);

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitDirective(token)
        {}

        visitPlural(token)
        {}
    }

    basicDirectiveTests(
        cut, fixtures.TEST_LOCATION, DIRECTIVE_PLURAL,
        {value:DEFAULT_CARDINALITY, visitor:VisitorImpl}
    );

    it('#value = "" must fail',
    function ()
    {
        function tc()
        {
            cut.value = '';
        }
        tc.should.throw(TypeError, 'invalid cardinality');
    });

    describe('cardinality',
    function ()
    {
        const testcases = [
            {value: '-inf'},
            {value: 'inf'},
            {value: '+inf'},
            {value: '-1'},
            {value: '1'},
            {value: '+1'},
            {value: '-0'},
            {value: '0'},
            {value: '+0'},
            {value: '-01'},
            {value: '01'},
            {value: '+01'},
            {value: '-inf..0'},
            {value: '-inf..-5'},
            {value: '-inf..inf'},
            {value: '-inf..+inf'},
            {value: '-1..0'},
            {value: '-1..+0'},
            {value: '-1..+1'},
            {value: '-1..inf'},
            {value: '-10..-5'},
            {value: '10..15'},
            {value: '10..inf'}
        ];

        for (const tc of testcases)
        {
            it(`#value = "${tc.value}" must not fail`,
            function ()
            {
                cut.value = tc.value;
                cut.value.should.equal(tc.value);
            });
        }
    });
});

