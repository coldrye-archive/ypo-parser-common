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


export function tokenStringValue(type, location)
{
    return (typeof type == 'object'
            ? type.constructor.name
            : type.name ) + ' [location=' + location;
}


export function basicTokenTests(token, location)
{
    it('#location must return the correct location',
    function ()
    {
        assert.deepEqual(token.location, location);
    });

    it('#accept must call visitor#visit()',
    function ()
    {
        assert.expect(1);
        class VisitorImpl
        {
            visit(visited)
            {
                assert.deepEqual(visited, token);
            }
        }
        token.accept(new VisitorImpl());
    });

    it('#toString must return the correct information',
    function ()
    {
        assert.ok(token.toString().indexOf(
            tokenStringValue(token, location)) == 0
        );
    });
}


export function basicDirectiveTests(token, location, directive)
{
    basicTokenTests(token, location);

    it('#directive must not be undefined',
    function ()
    {
        assert.ok(token.directive !== undefined);
    });

    it('#directive must return the correct value',
    function ()
    {
        assert.equal(token.directive, directive);
    });
}


export function basicSymbolTests(token, location, {comments, options} = {})
{
    basicTokenTests(token, location);

    it('#comments must return correct value',
    function ()
    {
        assert.deepEqual(token.comments, comments);
    });

    it('#options must return correct value',
    function ()
    {
        assert.deepEqual(token.options, options);
    });

    it('#options when set must return correct value',
    function ()
    {
        const orig = token.options;
        const repl = [];
        token.options = repl;
        assert.strictEqual(token.options, repl);
        token.options = orig;
    });
}

