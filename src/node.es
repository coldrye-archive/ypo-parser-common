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
 * The abstract class AbstractNode models the root of a hierarchy of derived
 * classes representing artifacts of the parse process.
 *
 * @abstract
 */
export default class AbstractNode
{
    /**
     * @param {Location} location - the location
     * @returns {void}
     */
    constructor(location)
    {
        this._location = location;
    }

    /**
     * Gets the location associated with this node.
     *
     * @returns {Location} - the location
     */
    get location()
    {
        return this._location;
    }

    /**
     * Instructs the specified visitor to visit this.
     *
     * @param {AbstractVisitor} visitor - the visitor
     * @returns {void}
     */
    accept(visitor)
    {
        visitor.visit(this);
    }

    /**
     * Renders a textual representation of this.
     *
     * @returns {string} - the string representation
     */
    toString()
    {
        const parts = [];
        parts.push('location=' + this.location);
        const augmentation = this.augmentToString();
        if (augmentation)
        {
            parts.push(augmentation);
        }

        return this.constructor.name + ' [' + parts.join(',') + ']';
    }

    /**
     * @private
     * @abstract
     * @returns {string} - additional information to be included on toString()
     */
    augmentToString()
    {
    }
}

