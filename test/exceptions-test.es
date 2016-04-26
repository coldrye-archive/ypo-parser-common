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


import AbstractToken from '../src/token';
import ParseError from '../src/exceptions';

import {TEST_LOCATION, TEST_LOCATION1} from './fixtures';


describe('ParseError',
function ()
{
    it('new ParseError() must fail on both location and token missing',
    function ()
    {
        function tc()
        {
            new ParseError('message');
        }
        tc.should.throw(TypeError, 'either token or location');
    });

    describe('when initialized with a cause',
    function ()
    {
        const cause = new Error('cause');
        const cut = new ParseError(
            'message', {location:TEST_LOCATION, cause}
        );

        it('#cause must have expected value',
        function ()
        {
            cut.cause.should.deep.equal(cause);
        });
    });

    describe('when initialized with a location only',
    function ()
    {
        const cut = new ParseError(
            'message', {location:TEST_LOCATION}
        );

        it('#location must have expected value',
        function ()
        {
            cut.location.should.deep.equal(TEST_LOCATION);
        });

        it('#token must be null',
        function ()
        {
            should.not.exist(cut.token);
        });

        it('#message must have expected value',
        function ()
        {
            cut.message.should.equal(
                `message [location=${TEST_LOCATION.toString()}]`
            );
        });

        it('#toString() must return expected value',
        function ()
        {
            cut.toString().should.equal(`[ParseError: ${cut.message}]`);
        });
    });

    class TokenImpl extends AbstractToken
    {}
    const token = new TokenImpl(TEST_LOCATION);

    describe('when initialized with a token only',
    function ()
    {
        const cut = new ParseError('message', {token:token});

        it('#location must be derived from token',
        function ()
        {
            cut.location.should.deep.equal(TEST_LOCATION);
        });

        it('#token must have expected value',
        function ()
        {
            cut.token.should.deep.equal(token);
        });

        it('#message must have expected value',
        function ()
        {
            cut.message.should.equal(
                `message [location=${TEST_LOCATION.toString()}`
                + `, token=${token.toString()}]`
            );
        });

        it('#toString() must return expected value',
        function ()
        {
            cut.toString().should.equal(`[ParseError: ${cut.message}]`);
        });
    });

    describe('when initialized with both a location and a token',
    function ()
    {
        const cut = new ParseError(
            'message', {location:TEST_LOCATION1,token:token}
        );

        it('#location must be derived from location',
        function ()
        {
            cut.location.should.deep.equal(TEST_LOCATION1);
        });

        it('#message must have expected value',
        function ()
        {
            cut.message.should.equal(
                `message [location=${TEST_LOCATION1.toString()}`
                + `, token=${token.toString()}]`
            );
        });

        it('#toString() must return expected value',
        function ()
        {
            cut.toString().should.equal(`[ParseError: ${cut.message}]`);
        });
    });

    describe('when initialized with a location and a non empty line',
    function ()
    {
        const cut = new ParseError(
            'message', {location:TEST_LOCATION, line:'the line'}
        );

        it('#line == "the line"',
        function ()
        {
            cut.line.should.equal('the line');
        });

        it('#toString() must include line data',
        function ()
        {
            cut.toString().should.contain('the line');
        });
    });

    describe('when initialized with a location and an empty line',
    function ()
    {
        const cut = new ParseError(
            'message', {location:TEST_LOCATION, line:''}
        );

        it('#toString() must include line data',
        function ()
        {
            cut.toString().should.contain('line=\'\'');
        });
    });
});

