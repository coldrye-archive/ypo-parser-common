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


import Line from '../../src/text/line';
import AbstractVisitor from '../../src/visitor';

import {basicLineTests} from './utils';
import * as fixtures from '../fixtures';


describe('Line',
function ()
{
    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitText(token)
        {}

        visitLine(token)
        {}
    }

    const testcases = [
        {value:fixtures.TEXT, visitor:VisitorImpl},
        {value:fixtures.LINE_CONTINUATION, isContinuation:true},
        {value:fixtures.LINE_CONTINUATION2, isContinuation:true},
        {value:fixtures.LINE_CONTINUATION3, isContinuation:true},
        {value:fixtures.NO_LINE_CONTINUATION},
        {value:fixtures.NO_LINE_CONTINUATION2},
        {value:fixtures.ESCAPED_DIRECTIVE, isEscapedDirective:true},
        {
            value:fixtures.COMBINED_CONTINUATION_ESCAPED_DIRECTIVE,
            isEscapedDirective:true, isContinuation:true
        }
    ];

    for (const tc of testcases)
    {
        describe(`for value = "${tc.value}"`,
        function ()
        {
            basicLineTests(
                new Line(fixtures.TEST_LOCATION, {value:tc.value}),
                fixtures.TEST_LOCATION, {...tc}
            );
        });
    }

    it('must not fail on missing value',
    function ()
    {
        function tc()
        {
            new Line(fixtures.TEST_LOCATION);
        }
        tc.should.not.throw();
    });

    it('#value = undefined must not fail',
    function ()
    {
        const cut = new Line(
            fixtures.TEST_LOCATION, {value:fixtures.TEXT}
        );
        cut.value = undefined;
    });
});

