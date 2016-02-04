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

import {
    DIRECTIVE_OPTION, OPTION_LANG, OPTION_NS, OPTION_PLURAL
} from '../src/constants';
import * as option from '../src/option';
import ParseError from '../src/exceptions';

import * as util from './util';
import * as fixtures from './fixtures';


describe('AbstractOption',
function ()
{
    const testcases = [
        {key:OPTION_LANG, value:'en',
         class:[option.Lang, option.AbstractUnitOption]},
        {key:OPTION_LANG, value:'en-US',
         class:[option.Lang, option.AbstractUnitOption]},
        {key:OPTION_NS, value:'ns',
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:OPTION_NS, value:'camelCaSe',
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:OPTION_NS, value:'12345',
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:OPTION_NS, value:'M1i2x3e4d5',
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:OPTION_PLURAL, value:undefined,
         class:[option.Plural, option.AbstractVariationOption]},
        {key:OPTION_PLURAL, value:'5',
         class:[option.Plural, option.AbstractVariationOption]}
    ];

    describe('.createNode()',
    function ()
    {
        for (const tc of testcases)
        {
            const cut = option.AbstractOption.createNode(
                fixtures.TEST_LOCATION, tc.key, tc.value
            );

            util.basicDirectiveTests(
                cut, fixtures.TEST_LOCATION, DIRECTIVE_OPTION
            );

            describe('must return a properly configured instance',
            function ()
            {
                for (const klass of tc.class)
                {
                    it('is instanceof ' + klass.name,
                    function ()
                    {
                        assert.ok(cut instanceof klass);
                    });
                }

                it('#key must return the correct value',
                function ()
                {
                    assert.equal(cut.key, tc.key);
                });

                it('#value must return the correct value',
                function ()
                {
                    assert.equal(cut.value, tc.value);
                });
            });
        }

        const negtestcases = [
            {key:OPTION_LANG},
            {key:OPTION_LANG, value:'unsupported'},
            {key:OPTION_NS},
            {key:OPTION_NS, value:'-malformed'},
            {key:OPTION_PLURAL, value:'unsupported'},
            {key:OPTION_PLURAL, value:'0.5'},
            {key:'unsupported'}
        ];

        for (const tc of negtestcases)
        {
            it('must fail on malformed or unsupported value for key='
               + tc.key + ' and value=' + tc.value,
            function ()
            {
                assert.throws(
                function ()
                {
                    const cut = option.AbstractOption.createNode(
                        fixtures.TEST_LOCATION, tc.key, tc.value
                    );
                }, ParseError);
            });
        }
    });
});

