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


import AbstractSymbol from './symbol';
import Translation from './translation';
import
{
    AbstractOption, OPTION_NS, OPTION_LANG, Lang, Namespace
} from '../directives/option';
import {findOption} from '../utils';
import Authorship from '../directives/authorship';


/**
 * TODO:document
 */
export default class Unit extends AbstractSymbol
{
    /**
     * @param {Location} location - the location
     * @param {Array<Comment>} comments - the comments or null
     * @param {Array<AbstractUnitOption>} options - the unit options or null
     * @param {Array<Authorship>} authorships - the authorships or null
     * @param {Array<Translation>} translations - the translations or null
     */
    constructor(location, {comments, options, authorships, translations} = {})
    {
        super(location, {comments});

        this.authorships = authorships;
        this.options = options;
        this.translations = translations;
    }

    /**
     * @override
     */
    accept(visitor)
    {
        super.accept(visitor);

        /*istanbul ignore else*/
        if (visitor['visitUnit'])
        {
            visitor.visitUnit(this);
        }
    }

    /**
     * Gets the authorships.
     *
     * @returns {Array<Authorship>} - the authorships or null
     */
    get authorships()
    {
        return this._authorships;
    }

    set authorships(authorships)
    {
        if (authorships && !Array.isArray(authorships))
        {
            throw new TypeError('authorships must be an Array');
        }

        this._authorships = [];
        /*istanbul ignore else*/
        if (authorships)
        {
            for (let index=0; index<authorships.length; index++)
            {
                this.addAuthorship(authorships[index]);
            }
        }
    }

    addAuthorship(authorship)
    {
        if (!(authorship instanceof Authorship))
        {
            throw new TypeError('authorship must be an instance of Authorship');
        }

        this._authorships.push(authorship);
    }

    /**
     * Gets the lang option.
     *
     * @returns {Lang} - the lang
     */
    get lang()
    {
        return this.getOption(OPTION_LANG);
    }

    set lang(lang)
    {
        if (!(lang instanceof Lang))
        {
            throw new TypeError('lang must be an instance of Lang');
        }

        this.setOrReplaceOption(lang);
    }

    /**
     * Gets the (default) namespace option.
     *
     * @returns {Namespace} - the namespace
     */
    get namespace()
    {
        return this.getOption(OPTION_NS, Namespace.DEFAULT_NAMESPACE);
    }

    set namespace(namespace)
    {
        if (namespace && !(namespace instanceof Namespace))
        {
            throw new TypeError('namespace must be an instance of Namespace');
        }

        this.setOrReplaceOption(namespace || Namespace.DEFAULT_NAMESPACE);
    }

    /**
     * Gets the available translations.
     *
     * @returns {Array<Translation>} - the translations or null
     */
    get translations()
    {
        return this._translations;
    }

    /**
     * Sets the translations.
     *
     * @param {Array<Translation>} translations - the translations or null
     * @returns {void}
     */
    set translations(translations)
    {
        if (translations && !Array.isArray(translations))
        {
            throw new TypeError('translations must be an Array');
        }

        this._translations = [];
        /*istanbul ignore else*/
        if (translations)
        {
            for (let index=0; index<translations.length; index++)
            {
                this.addTranslation(translations[index]);
            }
        }
    }

    addTranslation(translation)
    {
        if (!(translation instanceof Translation))
        {
            throw new TypeError(
                'translation must be an instance of Translation'
            );
        }

        this._translations.push(translation);
    }

    get options()
    {
        return this._options;
    }

    set options(options)
    {
        if (options && !Array.isArray(options))
        {
            throw new TypeError('options must be an Array');
        }

        this._options = [];
        /*istanbul ignore else*/
        if (options)
        {
            for (let index=0; index<options.length; index++)
            {
                this.setOrReplaceOption(options[index]);
            }
        }
    }

    setOrReplaceOption(option)
    {
        if (!(option instanceof AbstractOption))
        {
            throw new TypeError(
                'option must be an instance of AbstractOption'
            );
        }

        let found = -1;
        for (let index=0; index<this._options.length; index++)
        {
            /*istanbul ignore else*/
            if (this._options[index].key == option.key)
            {
                found = index;
                break;
            }
        }
        if (found != -1)
        {
            this._options[found] = option;
        }
        else
        {
            this._options.push(option);
        }
    }

    getOption(key, defaultValue)
    {
        return findOption(key, this._options, defaultValue);
    }
}

