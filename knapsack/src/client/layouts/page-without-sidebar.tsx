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
import Header from '../components/header';
import Footer from '../components/footer';
import { PageHeader } from '../components/page-header';
import ErrorCatcher from '../utils/error-catcher';
import './page-without-sidebar.scss';

type Props = {
  title?: string;
  section?: string;
  children: React.ReactNode;
};

const PageWithoutSidebar: React.FC<Props> = ({
  children,
  title,
  section,
}: Props) => (
  <div className="page-without-sidebar">
    <Header />
    <ErrorCatcher>
      <main className="page-without-sidebar__page">
        <PageHeader title={title} section={section} />
        {children}
      </main>
    </ErrorCatcher>
    <Footer />
  </div>
);

export default PageWithoutSidebar;