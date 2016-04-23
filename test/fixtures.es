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


export const TEST_FILE = 'test';
export const TEST_LINE = 1;
export const TEST_LINE1 = 2;
export const TEST_LOCATION = new Location(TEST_FILE, TEST_LINE);
export const TEST_LOCATION1 = new Location(TEST_FILE, TEST_LINE1);

export const TEXT = 'text w numb3rs';
export const LINE_CONTINUATION = TEXT + '\\';
export const LINE_CONTINUATION2 = TEXT + '\\\\\\';
export const LINE_CONTINUATION3 = '\\';
export const NO_LINE_CONTINUATION = TEXT + '\\\\';
export const NO_LINE_CONTINUATION2 = TEXT + '\\\\\\\\';

export const TEST_DIRECTIVE = 'test';
export const ESCAPED_DIRECTIVE = '\\# ' + TEST_DIRECTIVE;

export const COMBINED_CONTINUATION_ESCAPED_DIRECTIVE =
    '\\# ' + TEST_DIRECTIVE + '\\';


// disputable fixtures

export const EMPTY = '';


export const DIRECTIVE = '# ' + TEST_DIRECTIVE;


export const DIRECTIVE_NO_WS = '#' + TEST_DIRECTIVE;


export const NOT_A_DIRECTIVE = ' # no directive just text';


export const WHITESPACE_PRESERVED = '   whitespace  must be preserved   ';


export const TEST_ID = 'tid';


export const TEST_ID_COMPLEX = '__tRan5.L_4T10n__';


export const TEST_CONTEXT = 'context';


export const TEST_ID_INVALID = '-1nv4l1D';


export const TID = '#! ' + TEST_ID;


export const TID_INVALID = '#! ' + TEST_ID_INVALID;


export const TID_INVALID_CTX = TID + '@' + TEST_ID_INVALID;


export const TID_NO_WS = '#!' + TEST_ID;


export const TID_CTX = TID + '@' + TEST_CONTEXT;


export const TID_COMPLEX = '#! ' + TEST_ID_COMPLEX;


export const TID_COMPLEX_CTX = TID_COMPLEX + '@' + TEST_CONTEXT;


export const EMPTY_COMMENT = '#';


export const COMMENT = '# ' + TEXT;


export const COMMENT_NO_WS = '#' + TEXT;


export const AUTHOR_ARBITRARY = '#~ ' + WHITESPACE_PRESERVED;


export const TEST_URL = 'http://example.org';


export const TEST_URLS_SSL = 'https://example.org';


export const TEST_NAME = 'Au Thor';


export const TEST_ALIAS = 'thor';


export const TEST_EMAIL = 'thor@example.org';

