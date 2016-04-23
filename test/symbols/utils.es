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


import basicTokenTests from '../utils';


export default function basicSymbolTests(
    token, location, {comments, visitor} = {}
)
{
    basicTokenTests(token, location, {visitor});

    it('#comments must return correct value',
    function ()
    {
        if (comments)
        {
            token.comments.should.deep.equal(comments);
        }
        else
        {
            token.comments.should.deep.equal([]);
        }
    });

    it('#value = * must fail',
    function ()
    {
        function tc()
        {
            token.value = 'val';
        }
        tc.should.throw(Error, 'unsupported operation');
    });

    it('#comments = new Object() must fail',
    function ()
    {
        function tc()
        {
            token.comments = new Object();
        }
        tc.should.throw(TypeError, 'comments must be an Array');
    });

    it('#addComment() must fail on invalid comment',
    function ()
    {
        function tc()
        {
            token.addComment();
        }
        tc.should.throw(TypeError, 'comment must be an instance');
    });
}

