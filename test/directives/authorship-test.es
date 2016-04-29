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
    default as Authorship, DIRECTIVE_AUTHORSHIP
} from '../../src/directives/authorship';
import AbstractVisitor from '../../src/visitor';

import basicDirectiveTests from './utils';
import * as fixtures from '../fixtures';


describe('Authorship',
function ()
{
    const cut = new Authorship(
        fixtures.TEST_LOCATION,
        {
            name:fixtures.TEST_NAME, alias:fixtures.TEST_ALIAS,
            email:fixtures.TEST_EMAIL, url:fixtures.TEST_URL
        }
    );

    /*eslint no-unused-vars:0*/
    class VisitorImpl extends AbstractVisitor
    {
        visitToken(token)
        {}

        visitDirective(token)
        {}

        visitAuthorship(token)
        {}
    }

    basicDirectiveTests(
        cut, fixtures.TEST_LOCATION, DIRECTIVE_AUTHORSHIP,
        {value:'Au Thor "thor" <thor@example.org> (http://example.org)',
         visitor:VisitorImpl}
    );

    it('#name must have the correct value',
    function ()
    {
        cut.name.should.equal(fixtures.TEST_NAME);
    });

    it('#alias must have the correct value',
    function ()
    {
        cut.alias.should.equal(fixtures.TEST_ALIAS);
    });

    it('#email must have the correct value',
    function ()
    {
        cut.email.should.equal(fixtures.TEST_EMAIL);
    });

    it('#url must have the correct value',
    function ()
    {
        cut.url.should.equal(fixtures.TEST_URL);
    });

    it('must not fail on missing value',
    function ()
    {
        new Authorship(fixtures.TEST_LOCATION);
    });

    it('must be classified as whitespace',
    function ()
    {
        cut.isWhitespace.should.be.ok;
    });
});

