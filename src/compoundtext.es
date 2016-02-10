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


import AbstractToken from './node';


/**
 * The class CompoundText models a token that combines multiple subsequent
 * text nodes.
 *
 * As such this may either represent a sequence of continuation lines, or
 * a sequence of multiple separate lines or a combination of both.
 */
export default class CompoundText extends AbstractToken
{
    /**
     * @override
     * @param {Location} location - the location
     * @param {Array<AbstractNode>} nodes - the child nodes
     * @returns {CompoundText} - the configured token
     */
    static createNode(location, nodes = [])
    {
        const result = new CompoundText(location);

        for (const node of nodes)
        {
            result.addNode(node);
        }

        return result;
    }

    /**
     * @param {Location} location - the location
     * @returns {void}
     */
    constructor(location)
    {
        super(location);

        this._nodes = [];
    }

    /**
     * Gets whether this is represents a continuation of lines instead of
     * just multiple separate lines.
     *
     * @returns {boolean} - true whether this represents a continuation of lines
     */
    get isContinuation()
    {
        let result = false;

        /* istanbul ignore else */
        if (this.nodes)
        {
            result = this.nodes[0].isContinuation;
        }

        return result;
    }

    /**
     * Gets the nodes.
     *
     * @returns {Array<AbstractNode>} - the nodes
     */
    get nodes()
    {
        return this._nodes;
    }

    /**
     * Adds the specified node.
     *
     * @param {AbstractNode} node - the node
     * @returns {void}
     */
    addNode(node)
    {
        this._nodes.push(node);
    }

    /**
     * @override
     * @returns {string} - the augmented string
     */
    augmentToString()
    {
        const parts = [];
        for (const node of this.nodes)
        {
            parts.push(node.toString());
        }
        return 'lines=' + parts.join(',');
    }
}

