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

import AbstractNode from '../src/node';
import ParseError from '../src/exceptions';

import {TEST_LOCATION, TEST_LOCATION1} from './fixtures';


describe('ParseError',
function ()
{
    describe('constructor',
    function ()
    {
        it('must fail on missing both location and token',
        function ()
        {
            assert.throws(
            function ()
            {
                const cut = new ParseError('message');
            }, TypeError);
        });
    });

    const cut = new ParseError('message', {location:TEST_LOCATION1});

    it('#location must return the correct value',
    function ()
    {
        assert.deepEqual(TEST_LOCATION1, cut.location);
    });

    it('#toString() must return the correct value',
    function ()
    {
        assert.equal(
            'ParseError: message [location=' + TEST_LOCATION1.toString() + ']',
            cut.toString()
        );
    });

    class NodeImpl extends AbstractNode
    {}

    const node = new NodeImpl(TEST_LOCATION);

    const cut2 = new ParseError('message', {token:node});

    it('#location must be derived from token on missing location',
    function ()
    {
        assert.deepEqual(TEST_LOCATION, cut2.location);
    });

    it('#token must return the correct value',
    function ()
    {
        assert.deepEqual(node, cut2.token);
    });

    it('#toString() must return the correct value',
    function ()
    {
        assert.equal(
            'ParseError: message [location=' + TEST_LOCATION.toString()
            + ',token=' + node.toString() + ']',
            cut2.toString()
        );
    });

    const cut3 = new ParseError(
        'message', {location:TEST_LOCATION1, token:node}
    );

    it('#location location takes precedence over token.location',
    function ()
    {
        assert.deepEqual(TEST_LOCATION1, cut3.location);
    });

    it('#token must return the correct value',
    function ()
    {
        assert.deepEqual(node, cut3.token);
    });

    it('#toString() must return the correct value',
    function ()
    {
        assert.equal(
            'ParseError: message [location=' + TEST_LOCATION1.toString()
            + ',token=' + node.toString() + ']',
            cut3.toString()
        );
    });
});

