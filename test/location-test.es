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


import Location from '../src/location';

import {TEST_LINE, TEST_FILE} from './fixtures';


describe('Location',
function ()
{
    describe('new Location()',
    function ()
    {
        it('must fail on missing file',
        function ()
        {
            function tc()
            {
                new Location();
            }
            tc.should.throw(TypeError, 'file must be a non empty string');
        });

        it('must fail on empty file',
        function ()
        {
            function tc()
            {
                new Location('');
            }
            tc.should.throw(TypeError, 'file must be a non empty string');
        });

        it('must fail on missing line',
        function ()
        {
            function tc()
            {
                new Location(TEST_FILE);
            }
            tc.should.throw(TypeError, 'line must be a positive integer');
        });

        it('must fail on negative line that is less than -1',
        function ()
        {
            function tc()
            {
                new Location(TEST_FILE, -2);
            }
            tc.should.throw(TypeError, 'line must be a positive integer');
        });

        it('must fail on non integral line',
        function ()
        {
            function tc()
            {
                new Location(TEST_FILE, 0.5);
            }
            tc.should.throw(TypeError, 'line must be a positive integer');
        });
    });

    const cut = new Location(TEST_FILE, TEST_LINE);

    it('#file must have expected value',
    function ()
    {
        cut.file.should.equal(TEST_FILE);
    });

    it('#line must have expected value',
    function ()
    {
        cut.line.should.equal(TEST_LINE);
    });

    it('#toString() must return expected value',
    function ()
    {
        cut.toString().should.equal(`${TEST_FILE}:${TEST_LINE}`);
    });
});

