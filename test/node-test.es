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

import * as util from './util';
import {TEST_LOCATION} from './fixtures';


describe('AbstractNode',
function ()
{
    class NodeImpl extends AbstractNode
    {}

    const cut = new NodeImpl(TEST_LOCATION);

    util.basicNodeTests(cut, TEST_LOCATION);
});

