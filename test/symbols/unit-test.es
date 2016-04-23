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


import Unit from '../../src/symbols/unit';
import {Namespace, Lang} from '../../src/directives/option';
import AbstractVisitor from '../../src/visitor';

import basicSymbolTests from './utils';
import {TEST_LOCATION} from '../fixtures';


describe('Unit',
function ()
{
    const ns = new Namespace(TEST_LOCATION, {value:'ns'});
    const cut = new Unit(TEST_LOCATION, {options:[ns]});

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitSymbol(token)
        {}

        visitUnit(token)
        {}
    }

    basicSymbolTests(cut, TEST_LOCATION, {visitor:VisitorImpl});

    it('#authorships must return correct value',
    function ()
    {
        cut.authorships.should.deep.equal([]);
    });

    it('#translations must return correct value',
    function ()
    {
        cut.translations.should.deep.equal([]);
    });

    it('#translations when set must return correct value',
    function ()
    {
        const orig = cut.translations;
        const repl = [];
        cut.translations = repl;
        cut.translations.should.deep.equal(repl);
        cut.translations = orig;
    });

    it('#lang === undefined',
    function ()
    {
        should.not.exist(cut.lang);
    });

    it('#namespace == ' + ns,
    function ()
    {
        cut.namespace.should.deep.equal(ns);
    });

    it('#authorships = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.authorships = new Object();
        }
        tc.should.throw(TypeError, 'authorships must be an Array');
    });

    it('#addAuthorship() must fail on invalid authorship',
    function ()
    {
        function tc()
        {
            cut.addAuthorship();
        }
        tc.should.throw(TypeError, 'authorship must be an instance');
    });

    it('#translations = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.translations = new Object();
        }
        tc.should.throw(TypeError, 'translations must be an Array');
    });

    it('#addTranslation() must fail on invalid translation',
    function ()
    {
        function tc()
        {
            cut.addTranslation();
        }
        tc.should.throw(TypeError, 'translation must be an instance');
    });

    it('#namespace = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.namespace = new Object();
        }
        tc.should.throw(TypeError, 'namespace must be an instance');
    });

    it('#namespace = Namespace.DEFAULT_NAMEPSPACE must replace existing value',
    function ()
    {
        cut.namespace = Namespace.DEFAULT_NAMESPACE;
        cut.namespace.should.deep.equal(Namespace.DEFAULT_NAMESPACE);
        cut.namespace = ns;
    });

    it(
    '#namespace = undefined must replace existing value '
    + 'by Namespace.DEFAULT_NAMEPSPACE',
    function ()
    {
        cut.namespace = undefined;
        cut.namespace.should.deep.equal(Namespace.DEFAULT_NAMESPACE);
        cut.namespace = ns;
    });

    it('#lang = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.lang = new Object();
        }
        tc.should.throw(TypeError, 'lang must be an instance');
    });

    it('#setOrReplaceOption() must fail on invalid option',
    function ()
    {
        function tc()
        {
            cut.setOrReplaceOption();
        }
        tc.should.throw(TypeError, 'option must be an instance');
    });

    it('#setOrReplaceOption() must replace existing option',
    function ()
    {
        function tc()
        {
            cut.setOrReplaceOption();
        }
        tc.should.throw(TypeError, 'option must be an instance');
    });

    it('#options = new Object() must fail',
    function ()
    {
        function tc()
        {
            cut.options = new Object();
        }
        tc.should.throw(TypeError, 'options must be an Array');
    });

    it('#options must return correct value',
    function ()
    {
        cut.options.should.deep.equal([ns]);
    });

    it('#options when set must return correct value',
    function ()
    {
        const orig = cut.options;
        const repl = [];
        cut.options = repl;
        cut.options.should.deep.equal(repl);
        cut.options = orig;
    });
});

