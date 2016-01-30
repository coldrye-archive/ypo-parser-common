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


/**
 * The class AbstractLexer models the root of a hierarchy of derived classes
 * suitable for tokenizing an input line stream.
 */
export default class AbstractLexer
{
    /**
     * Generates a stream of tokens from lines read from the input line stream.
     *
     * @abstract
     * @param {string} file - the absolute and resolved file name
     * @param {Generator|Array<string>} lines - the input line (buffer) stream or array
     * @throws {ParseError}
     * @returns {AbstractToken} - the yielded token instances
     */
    /* eslint no-unused-vars:0 */
    * tokenize(file, lines)
    {
        throw new Error('derived classes must override this');
    }
}

