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


import sinon from 'sinon';


export function tokenStringValue(type, location)
{
    return (typeof type == 'object'
            ? type.constructor.name
            : type.name ) + ' [location=' + location;
}


export default function basicTokenTests(token, location, {value, visitor, isWhitespace} = {})
{
    it('#location must return the correct location',
    function ()
    {
        token.location.should.deep.equal(location);
    });

    it('#accept must fail on invalid visitor',
    function ()
    {
        function tc()
        {
            token.accept();
        }
        tc.should.throw(TypeError, 'visitor must be an instance');
    });

    if (visitor)
    {
        const visitMethods =
            Object.getOwnPropertyNames(visitor.prototype)
            .filter(item => item.indexOf('visit') == 0);

        it(`accept must call visitor#${visitMethods.join(',')}`,
        function ()
        {
            const instance = new visitor();
            const mock = sinon.mock(instance);
            for (const key of visitMethods)
            {
                mock.expects(key).once().withExactArgs(token);
            }
            token.accept(instance);
            mock.verify();
        });
    }

    it('#toString must return the correct information',
    function ()
    {
        token.toString().should.contain(tokenStringValue(token, location));
    });

    it('#value == ' + value,
    function ()
    {
        if (value || value == '')
        {
            token.value.should.equal(value);
        }
        else
        {
            should.not.exist(token.value);
        }
    });

    const actualIsWhitespace = !!isWhitespace;

    it('#isWhitespace == ' + actualIsWhitespace,
    function ()
    {
        token.isWhitespace.should.equal(actualIsWhitespace);
    });
}

