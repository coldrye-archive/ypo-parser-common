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

import {DIRECTIVE_AUTHORSHIP} from '../src/constants';
import Authorship from '../src/authorship';
import ParseError from '../src/exceptions';

import * as util from './util';
import * as fixtures from './fixtures';


describe('Authorship',
function ()
{
    const cut = new Authorship(
        fixtures.TEST_LOCATION, fixtures.TEST_NAME, fixtures.TEST_ALIAS,
        fixtures.TEST_EMAIL, fixtures.TEST_URL
    );

    util.basicDirectiveTests(
        cut, fixtures.TEST_LOCATION, DIRECTIVE_AUTHORSHIP
    );

    it('#name must have the correct value',
    function ()
    {
        assert.equal(fixtures.TEST_NAME, cut.name);
    });

    it('#alias must have the correct value',
    function ()
    {
        assert.equal(fixtures.TEST_ALIAS, cut.alias);
    });

    it('#email must have the correct value',
    function ()
    {
        assert.equal(fixtures.TEST_EMAIL, cut.email);
    });

    it('#url must have the correct value',
    function ()
    {
        assert.equal(fixtures.TEST_URL, cut.url);
    });

    describe('.createNode()',
    function ()
    {
        const cut2 = Authorship.createNode(
            fixtures.TEST_LOCATION, fixtures.TEST_NAME, fixtures.TEST_ALIAS,
            fixtures.TEST_EMAIL, fixtures.TEST_URL
        );

        it('must return properly configured instance',
        function ()
        {
            assert.deepEqual(cut, cut2);
        });

        it('must fail on missing name, alias and email',
        function ()
        {
            assert.throws(
            function ()
            {
                Authorship.createNode(fixtures.TEST_LOCATION);
            }, ParseError, 'missing all author info');

            assert.throws(
            function ()
            {
                Authorship.createNode(
                    fixtures.TEST_LOCATION, null, null, null, fixtures.TEST_URL
                );
            }, ParseError, 'just the url');
        });
    });
});

