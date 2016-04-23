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
 * TODO:document
 * The abstract class AbstractVisitor models the root of a hierarchy
 * of derived classes.
 *
 * Visitors are used during both the parsing process and subsequent
 * transformation processes thereof.
 *
 *
 * Visitors can implement one or more of the following methods.
 *
 * ### visitToken(token)
 *
 * A visitor implementing this is able to visit all tokens of the parse tree.
 *
 * ### visitDirective(directive)
 *
 * A visitor implementing this is able to visit all directives of the parse tree.
 *
 * ### visitAuthorship(authorship)
 *
 * ### visitComment(comment)
 *
 * ### visitContext(context)
 *
 * ### visitOption(option)
 *
 * A visitor implementing this is able to visit all option directives of the parse tree.
 *
 * ### visitUnitOption(unit)
 *
 * ### visitLang(lang)
 *
 * ### visitNamespace(namespace)
 *
 * ### visitPlural(plural)
 *
 * ### visitTranslationId(translationId)
 *
 * ### visitSymbol(symbol)
 *
 * ### visitUnit(unit)
 *
 * ### visitTranslation(translation)
 *
 * ### visitVariation(variation)
 *
 * A visitor implementing this is able to visit all symbols of the parse tree.
 *
 * ### visitText(text)
 *
 * A visitor implementing this is able to visit all text tokens of the parse tree.
 *
 * ### visitCompoundText(compound)
 *
 * ### visitEmptyLine(emptyLine)
 *
 * ### visitLine(line)
 */
/*eslint no-inline-comments:0*/
/*istanbul ignore next*/
@abstract
export default class AbstractVisitor
{}

