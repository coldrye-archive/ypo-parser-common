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


export function nodeStringValue(type, location)
{
    return (typeof type == 'object'
            ? type.constructor.name
            : type.name ) + ' [location=' + location;
/*
    return (typeof type == 'object'
            ? type.constructor.name
            : type.name ) + ' [location=' + location + ']';
*/
}


export function basicNodeTests(node, location)
{
    it('#location must return the correct location',
    function ()
    {
        assert.deepEqual(node.location, location);
    });

    it('#accept must call visitor#visit()',
    function ()
    {
        assert.expect(1);
        class VisitorImpl
        {
            visit(visited)
            {
                assert.deepEqual(visited, node);
            }
        }
        node.accept(new VisitorImpl());
    });

    it('#toString must return the correct information',
    function ()
    {
        // FIXME:must check actual results
        //assert.equal(node.toString(), nodeStringValue(node, location));
        assert.ok(node.toString().indexOf(nodeStringValue(node, location)) == 0);
    });
}


export function basicDirectiveTests(node, location, directive)
{
    basicNodeTests(node, location);

    it('#directive must not be undefined',
    function ()
    {
        assert.ok(node.directive !== undefined);
    });

    it('#directive must return the correct value',
    function ()
    {
        assert.equal(node.directive, directive);
    });
}


export function basicSymbolTests(node, location, {comments, options} = {})
{
    basicNodeTests(node, location);

    it('#comments must return correct value',
    function ()
    {
        assert.deepEqual(node.comments, comments);
    });

    it('#options must return correct value',
    function ()
    {
        assert.deepEqual(node.options, options);
    });

    it('#options when set must return correct value',
    function ()
    {
        const orig = node.options;
        const repl = [];
        node.options = repl;
        assert.strictEqual(node.options, repl);
        node.options = orig;
    });
}

