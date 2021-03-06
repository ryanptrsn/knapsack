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
import { join } from 'path';
import { FileDb2 } from './dbs/file-db';
import { KnapsackNavsConfig } from '../schemas/nav';
import schema from '../json-schemas/schemaKnapsackNavsConfig';

export class Navs extends FileDb2<KnapsackNavsConfig> {
  constructor({ dataDir }: { dataDir: string }) {
    const defaults: KnapsackNavsConfig = {
      primary: [],
      secondary: [],
    };

    super({
      filePath: join(dataDir, 'knapsack.navs.json'),
      defaults,
      type: 'json',
      validationSchema: schema,
    });
  }
}
