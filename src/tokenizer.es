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


import {abstract} from 'pingo';


/**
 * The class AbstractTokenizer models the root of a hierarchy of derived
 * classes used for tokenizing a stream of lines from a given source into
 * tokens that can then be further processed by the ypo parser.
 *
 * It is the responsibility of the parser to validate the correct order of
 * the tokens produced by this.
 */
/*eslint no-inline-comments:0*/
/*istanbul ignore next*/
@abstract
export default class AbstractTokenizer
{
    /**
     * Generates a stream of tokens from lines read from the input file.
     *
     * @abstract
     * @throws {ParseError} - in case the input file does not conform to the YPO file format
     * @returns {TokenGenerator} - the token generator
     */
    /*eslint no-unused-vars:0*/
    @abstract
    /* * */ tokenize()
    {}
    // NOTE: we cannot make this a generator function *tokenize(...) as the
    // babylon parser will otherwise fail to parse the code, see
    // https://github.com/babel/babylon/pull/14, and
    // https://github.com/wycats/javascript-decorators/issues/66
}

