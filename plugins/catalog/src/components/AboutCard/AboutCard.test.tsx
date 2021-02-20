/*
 * Copyright 2020 Spotify AB
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

import { EntityProvider } from '@backstage/plugin-catalog-react';
import { SOURCE_LOCATION_ANNOTATION } from '@backstage/catalog-model';
import { render } from '@testing-library/react';
import React from 'react';
import { AboutCard } from './AboutCard';

describe('<AboutCard /> GitHub', () => {
  it('renders info and "view source" link', () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'software',
        annotations: {
          'backstage.io/managed-by-location':
            'github:https://github.com/backstage/backstage/blob/master/software.yaml',
        },
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
    };
    const { getByText } = render(
      <EntityProvider entity={entity}>
        <AboutCard />
      </EntityProvider>,
    );
    expect(getByText('service')).toBeInTheDocument();
    expect(getByText('View Source').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/backstage/backstage/blob/master/software.yaml',
    );
    expect(getByText('View Source').closest('a')).toHaveAttribute(
      'edithref',
      'https://github.com/backstage/backstage/edit/master/software.yaml',
    );
  });
});

describe('<AboutCard /> GitLab', () => {
  it('renders info and "view source" link', () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'software',
        annotations: {
          'backstage.io/managed-by-location':
            'gitlab:https://gitlab.com/backstage/backstage/-/blob/master/software.yaml',
        },
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
    };
    const { getByText } = render(
      <EntityProvider entity={entity}>
        <AboutCard />
      </EntityProvider>,
    );
    expect(getByText('service')).toBeInTheDocument();
    expect(getByText('View Source').closest('a')).toHaveAttribute(
      'href',
      'https://gitlab.com/backstage/backstage/-/blob/master/software.yaml',
    );
    expect(getByText('View Source').closest('a')).toHaveAttribute(
      'edithref',
      'https://gitlab.com/backstage/backstage/-/edit/master/software.yaml',
    );
  });
});

describe('<AboutCard /> BitBucket', () => {
  it('renders info and "view source" link', () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'software',
        annotations: {
          'backstage.io/managed-by-location':
            'bitbucket:https://bitbucket.org/backstage/backstage/src/master/software.yaml',
        },
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
    };
    const { getByText } = render(
      <EntityProvider entity={entity}>
        <AboutCard />
      </EntityProvider>,
    );
    expect(getByText('service')).toBeInTheDocument();
    expect(getByText('View Source').closest('a')).toHaveAttribute(
      'href',
      'https://bitbucket.org/backstage/backstage/src/master/software.yaml',
    );
    expect(getByText('View Source').closest('a')).toHaveAttribute(
      'edithref',
      'https://bitbucket.org/backstage/backstage/src/master/software.yaml?mode=edit&spa=0&at=master',
    );
  });
});

describe('<AboutCard /> custom links', () => {
  it('renders info and "view source" link', () => {
    const entity = {
      apiVersion: 'v1',
      kind: 'Component',
      metadata: {
        name: 'software',
        annotations: {
          'backstage.io/managed-by-location':
            'bitbucket:https://bitbucket.org/backstage/backstage/src/master/software.yaml',
          'backstage.io/edit-url': 'https://another.place',
          [SOURCE_LOCATION_ANNOTATION]:
            'url:https://another.place/backstage.git',
        },
      },
      spec: {
        owner: 'guest',
        type: 'service',
        lifecycle: 'production',
      },
    };
    const { getByText } = render(
      <EntityProvider entity={entity}>
        <AboutCard />
      </EntityProvider>,
    );
    expect(getByText('service')).toBeInTheDocument();
    expect(getByText('View Source').closest('a')).toHaveAttribute(
      'href',
      'https://another.place/backstage.git',
    );
    expect(getByText('View Source').closest('a')).toHaveAttribute(
      'edithref',
      'https://another.place',
    );
  });
});
