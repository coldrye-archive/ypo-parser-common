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
 * The default namespace assigned to a translation unit if none was specified.
 *
 * By default, all translation units will have ``translation`` assigned as their
 * default namespace unless overridden by user defaults.
 *
 * @public
 */
export const DEFAULT_NS = 'translation';


/**
 * @private
 */
export const DIRECTIVE_AUTHORSHIP = '#~';


/**
 * @private
 */
export const DIRECTIVE_COMMENT = '#';


/**
 * @private
 */
export const DIRECTIVE_CONTEXT = '#@';


/**
 * @private
 */
export const DIRECTIVE_TRANSLATION_ID = '#!';


/**
 * @private
 */
export const DIRECTIVE_OPTION = '#=';


/**
 * @private
 */
export const EMPTY_STRING = '';


/**
 * @private
 */
export const OPTION_LANG = 'lang';


/**
 * @private
 */
export const OPTION_NS = 'ns';


/**
 * @private
 */
export const OPTION_PLURAL = 'plural';


/**
 * @private
 */
export const REGEXP_CARDINALITY = /^([0-9]+)?$/;


/**
 * @private
 */
export const REGEXP_ESCAPED_DIRECTIVE = /^\\#/;


/**
 * @private
 */
export const REGEXP_LANGID = /^[a-z]{2,3}(?:[-][A-Z]{2,3})?$/;


/**
 * @private
 */
export const REGEXP_QNAME = /^[a-zA-Z0-9$]+$/;


/**
 * @private
 */
export const NSQNAME = '[a-zA-Z0-9$-_]+';


/**
 * @private
 */
export const REGEXP_NSNAME = new RegExp(
    '^'
    + NSQNAME
    + '(?:[.]' + NSQNAME + ')*'
    + '$'
);

