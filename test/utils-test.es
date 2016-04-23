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


import {findOption, buildAuthorship} from '../src/utils';
import {
    Lang, Namespace, OPTION_NS, OPTION_LANG
} from '../src/directives/option';

import {TEST_LOCATION} from './fixtures';


describe('findOption()',
function ()
{
    const opt1 = new Namespace(TEST_LOCATION, {value:'ns'});
    const opt2 = new Lang(TEST_LOCATION, {value:'de'});

    it('must return defaultValue=null on missing option',
    function ()
    {
        should.not.exist(findOption(OPTION_NS, [opt2], null));
    });

    it('must return defaultValue on missing option',
    function ()
    {
        findOption(OPTION_NS, [], opt1).should.deep.equal(opt1);
    });

    it('must return correct value',
    function ()
    {
        findOption(OPTION_LANG, [opt1, opt2], null).should.deep.equal(opt2);
    });
});


describe('buildAuthorship()',
function ()
{
    it('must return undefined on missing parameters',
    function ()
    {
        should.not.exist(buildAuthorship());
    })
});

