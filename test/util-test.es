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

import {findOption} from '../src/util';
import {Namespace, Plural} from '../src/option';
import {OPTION_NS, OPTION_PLURAL} from '../src/constants';

import * as util from './util';
import {TEST_LOCATION} from './fixtures';


describe('findOption()',
function ()
{
    const opt1 = new Namespace(TEST_LOCATION, 'ns');
    const opt2 = new Plural(TEST_LOCATION);

    it('must return null on missing option',
    function ()
    {
        assert.equal(findOption(OPTION_NS, [opt2]), null);
    });

    it('must return defaultValue on missing option',
    function ()
    {
        assert.deepEqual(findOption(OPTION_NS, [opt2], opt1), opt1);
    });

    it('must return correct value',
    function ()
    {
        assert.deepEqual(
            findOption(OPTION_PLURAL, [opt2], opt1), opt2
        );
    });
});

