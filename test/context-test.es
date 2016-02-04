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

import {DIRECTIVE_CONTEXT} from '../src/constants';
import Context from '../src/context';

import * as util from './util';
import * as fixtures from './fixtures';


describe('Context',
function ()
{
    const cut = new Context(
        fixtures.TEST_LOCATION, fixtures.TEST_CONTEXT
    );

    util.basicDirectiveTests(
        cut, fixtures.TEST_LOCATION, DIRECTIVE_CONTEXT
    );

    it('#id must return correct value',
    function ()
    {
        assert.equal(fixtures.TEST_CONTEXT, cut.id);
    });

    describe('.createNode()',
    function ()
    {
        const cut2 = Context.createNode(
            fixtures.TEST_LOCATION, fixtures.TEST_CONTEXT
        );

        it('must return properly configured instance',
        function ()
        {
            assert.deepEqual(cut, cut2);
        });
    });
});

