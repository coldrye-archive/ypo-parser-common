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


import * as option from '../../src/directives/option';
import AbstractVisitor from '../../src/visitor';

import basicDirectiveTests from './utils';
import * as fixtures from '../fixtures';


describe('AbstractOption',
function ()
{
    /*eslint no-unused-vars:0*/
    class NamespaceVisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitDirective(token)
        {}

        visitOption(token)
        {}

        visitUnitOption(token)
        {}

        visitNamespace(token)
        {}
    }

    /*eslint no-unused-vars:0*/
    class LangVisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitDirective(token)
        {}

        visitOption(token)
        {}

        visitUnitOption(token)
        {}

        visitLang(token)
        {}
    }

    const testcases = [
        {key:option.OPTION_LANG, value:'en',
         visitor:LangVisitorImpl,
         class:[option.Lang, option.AbstractUnitOption]},
        {key:option.OPTION_LANG, value:'en-US',
         visitor:LangVisitorImpl,
         class:[option.Lang, option.AbstractUnitOption]},
        {key:option.OPTION_NS, value:'ns',
         visitor:NamespaceVisitorImpl,
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:option.OPTION_NS, value:'camelCaSe',
         visitor:NamespaceVisitorImpl,
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:option.OPTION_NS, value:'12345',
         visitor:NamespaceVisitorImpl,
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:option.OPTION_NS, value:'1.2.3',
         visitor:NamespaceVisitorImpl,
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:option.OPTION_NS, value:'ns-name.1',
         visitor:NamespaceVisitorImpl,
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:option.OPTION_NS, value:'ns-name$na.me_1',
         visitor:NamespaceVisitorImpl,
         class:[option.Namespace, option.AbstractUnitOption]},
        {key:option.OPTION_NS, value:'M1i2x3e4d5',
         visitor:NamespaceVisitorImpl,
         class:[option.Namespace, option.AbstractUnitOption]}
    ];

    describe('.createNewInstance()',
    function ()
    {
        for (const tc of testcases)
        {
            const cut = option.AbstractOption.createNewInstance(
                fixtures.TEST_LOCATION, {key:tc.key, value:tc.value}
            );

            basicDirectiveTests(
                cut, fixtures.TEST_LOCATION, option.DIRECTIVE_OPTION,
                {value:tc.value, visitor:tc.visitor}
            );

            describe('must return a properly configured instance',
            function ()
            {
                for (const klass of tc.class)
                {
                    it('is instanceof ' + klass.name,
                    function ()
                    {
                        cut.should.be.instanceOf(klass);
                    });
                }

                it('#key must return the correct value',
                function ()
                {
                    cut.key.should.equal(tc.key);
                });
            });
        }

        const negtestcases = [
// currently disabled until we figure out on how to deal with an unitialized Lang option
//            {key:option.OPTION_LANG, msg:'invalid langid "undefined"'},
            {
                key:option.OPTION_LANG, value:'unsupported',
                msg:'invalid langid "unsupported"'
            },
            {
                key:option.OPTION_NS, value:'un supported',
                msg:'invalid namespace "un supported"'
            },
            {key:'unsupported', msg:'unsupported option "unsupported"'}
        ];

        for (const tcase of negtestcases)
        {
            it('must fail on malformed or unsupported value for key='
               + tcase.key + ' and value=' + tcase.value,
            function ()
            {
                function tc()
                {
                    option.AbstractOption.createNewInstance(
                        fixtures.TEST_LOCATION,
                        {key:tcase.key, value:tcase.value}
                    );
                }
                tc.should.throw(Error, tcase.msg);
            });
        }
    });
});

