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


import PathBuilder from '../src/pathbuilder';


describe('PathBuider',
function ()
{
    describe('new PathBuilder()',
    function ()
    {
        it('must fail on missing basepath',
        function ()
        {
            function tc()
            {
                new PathBuilder(null, 'ext');
            }
            tc.should.throw(TypeError, 'basepath must be a string');
        });

        it('must not fail on empty basepath',
        function ()
        {
            function tc()
            {
                new PathBuilder('', 'ext');
            }
            tc.should.not.throw(
                TypeError, 'basepath must be a non empty string'
            );
        });

        it('must fail on missing extension',
        function ()
        {
            function tc()
            {
                new PathBuilder('/tmp');
            }
            tc.should.throw(TypeError, 'extension must be a non empty string');
        });

        it('must fail on empty extension',
        function ()
        {
            function tc()
            {
                new PathBuilder('/tmp', '');
            }
            tc.should.throw(TypeError, 'extension must be a non empty string');
        });

        it('must add leading to extension when missing',
        function ()
        {
            new PathBuilder('/tmp', 'ext').extension.should.equal('.ext');
        });

        it('must not add leading to extension when provided',
        function ()
        {
            new PathBuilder('/tmp', '.ext').extension.should.equal('.ext');
        });
    });

    const cut = new PathBuilder('/tmp', 'ext');

    it('#basepath must have expected value',
    function ()
    {
        cut.basepath.should.equal('/tmp');
    });

    describe('#buildPath()',
    function ()
    {
        it('must fail on missing lcid',
        function ()
        {
            function tc()
            {
                cut.buildPath();
            }
            tc.should.throw(TypeError, 'lcid must be a non empty string');
        });

        it('must fail on empty string lcid',
        function ()
        {
            function tc()
            {
                cut.buildPath('');
            }
            tc.should.throw(TypeError, 'lcid must be a non empty string');
        });

        it('must fail on empty string namespace',
        function ()
        {
            function tc()
            {
                cut.buildPath('en', '');
            }
            tc.should.throw(TypeError, 'namespace must be a non empty string');
        });

        it('must fail on invalid non empty lcid',
        function ()
        {
            function tc()
            {
                cut.buildPath('invalid');
            }
            tc.should.throw(TypeError, 'invalid lcid "invalid"');
        });

        it('must fail on invalid non empty custom namespace',
        function ()
        {
            function tc()
            {
                cut.buildPath('en', '.invalid');
            }
            tc.should.throw(TypeError, 'invalid namespace ".invalid"');
        });

        it('must use default namespace when missing',
        function ()
        {
            cut.buildPath('en').should.equal('/tmp/en/translation.ext');
        });

        it('must return expected value for custom namespace',
        function ()
        {
            cut.buildPath('en', 'ns').should.equal('/tmp/en/ns.ext');
        });
    });
});

