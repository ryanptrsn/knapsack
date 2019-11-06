/**
 *  Copyright (C) 2018 Basalt
    This file is part of Knapsack.
    Knapsack is free software; you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by the Free
    Software Foundation; either version 2 of the License, or (at your option)
    any later version.

    Knapsack is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
    FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
    more details.

    You should have received a copy of the GNU General Public License along
    with Knapsack; if not, see <https://www.gnu.org/licenses>.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { PatternStatusIcon } from '@knapsack/design-system';
import { BASE_PATHS } from '../../lib/constants';
import {
  KnapsackPattern,
  KnapsackPatternStatus,
  KnapsackPatternType,
} from '../../schemas/patterns';
import './pattern-grid.scss';

type Props = {
  patternStatuses: KnapsackPatternStatus[];
  patternTypes: KnapsackPatternType[];
  patterns: {
    /**
     * patternId
     */
    id: KnapsackPattern['id'];
    title: string;
    /**
     * @see {KnapsackPatternType}
     */
    typeId: KnapsackPatternType['id'];
    /**
     * @see {KnapsackPatternStatus}
     */
    statusId?: KnapsackPatternStatus['id'];
    description?: string;
  }[];
};

export const PatternGrid: React.FC<Props> = ({
  patterns,
  patternStatuses,
  patternTypes,
}: Props) => {
  const items = patterns.map(({ id, title, typeId, statusId, description }) => {
    const path = `${BASE_PATHS.PATTERN}/${id}`;
    const status = patternStatuses.find(p => p.id === statusId);
    const type = patternTypes.find(p => p.id === typeId);
    return (
      <li className="pattern-grid__list-item" key={id}>
        <Link to={path}>
          <header className="pattern-grid__list-item__header">
            <h3>{title}</h3>
          </header>
          <h6>
            Type: {type.title}
            {status && (
              <span>
                {' '}
                - Status: {status.title}
                <PatternStatusIcon color={status.color} title={status.title} />
              </span>
            )}
          </h6>
          <div className="pattern-grid__list-item__description">
            {description}
          </div>
        </Link>
      </li>
    );
  });
  return <ul className="pattern-grid__list">{items}</ul>;
};
