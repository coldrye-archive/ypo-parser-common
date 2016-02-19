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

import Unit from '../src/unit';
import {OPTION_NS, DEFAULT_NS} from '../src/constants';
import {Namespace} from '../src/option';

import * as util from './util';
import {TEST_LOCATION} from './fixtures';


describe('Unit',
function ()
{
    const cut = new Unit(TEST_LOCATION);

    util.basicSymbolTests(
        cut, TEST_LOCATION, util.tokenStringValue(Unit, TEST_LOCATION)
    );

    it('#authorships must return correct value',
    function ()
    {
        assert.deepEqual(cut.authorships, null);
    });

    it('#translations must return correct value',
    function ()
    {
        assert.deepEqual(cut.translations, null);
    });

    it('#translations when set must return correct value',
    function ()
    {
        const orig = cut.translations;
        const repl = [];
        cut.translations = repl;
        assert.strictEqual(cut.translations, repl);
        cut.translations = orig;
    });

    it('#lang must return correct value',
    function ()
    {
        assert.deepEqual(cut.lang, null);
    });

    it('#ns must return default namespace option',
    function ()
    {
        assert.deepEqual(
            cut.ns, new Namespace(TEST_LOCATION, DEFAULT_NS)
        );
    });

    it('#warnings must return correct value',
    function ()
    {
        const warnings = ['warning'];

        cut.warnings = warnings;
        assert.deepEqual(cut.warnings, warnings);
    });
});

