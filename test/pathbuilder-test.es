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

import PathBuilder from '../src/pathbuilder';


describe('PathBuider',
function ()
{
    describe('constructor',
    function ()
    {
        it('must fail on missing basepath',
        function ()
        {
            assert.throws(
            function ()
            {
                new PathBuilder(null, 'ext');
            }, TypeError);
        });

        it('must fail on empty string basepath',
        function ()
        {
            assert.throws(
            function ()
            {
                new PathBuilder('', 'ext');
            }, TypeError);
        });

        it('must fail on missing extension',
        function ()
        {
            assert.throws(
            function ()
            {
                new PathBuilder('/tmp');
            }, TypeError);
        });

        it('must fail on empty string extension',
        function ()
        {
            assert.throws(
            function ()
            {
                new PathBuilder('/tmp', '');
            }, TypeError);
        });
    });

    const cut = new PathBuilder('/tmp', 'ext');

    it('#basepath must return correct value',
    function ()
    {
        assert.equal(cut.basepath, '/tmp');
    });

    it('#extension must return correct value',
    function ()
    {
        assert.equal(cut.extension, 'ext');
    });

    it('#buildPath() must fail on missing lcid',
    function ()
    {
        assert.throws(
        function ()
        {
            cut.buildPath();
        }, TypeError);
    });

    it('#buildPath() must fail on empty string lcid',
    function ()
    {
        assert.throws(
        function ()
        {
            cut.buildPath('');
        }, TypeError);
    });

    it('#buildPath() must not fail on missing namespace',
    function ()
    {
        assert.equal(cut.buildPath('en'), '/tmp/en/translation.ext');
    });

    it('#buildPath() must return correct value',
    function ()
    {
        assert.equal(cut.buildPath('en', 'ns'), '/tmp/en/ns.ext');
    });

    it('#buildPath() must fail on empty string namespace',
    function ()
    {
        assert.throws(
        function ()
        {
            cut.buildPath('en', '');
        }, TypeError);
    });
});

