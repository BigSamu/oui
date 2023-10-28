/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type FlexItemGrowSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | true
  | false
  | null;
export type FlexItemShrinkSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | true
  | false
  | null;
export type FlexItemBasisValue = string | true | false | null;

export interface OuiFlexItemProps {
  grow?: FlexItemGrowSize;
  shrink?: FlexItemShrinkSize;
  basis?: FlexItemBasisValue;
  component?: keyof JSX.IntrinsicElements;
}

export const GROW_SIZES: FlexItemGrowSize[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const SHRINK_SIZES: FlexItemShrinkSize[] = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];
export const BASIS_VALUES: FlexItemBasisValue[] = [
  'auto',
  'max-content',
  'min-content',
  'fit-content',
];

export const OuiFlexItem: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    OuiFlexItemProps
> = ({
  children,
  className,
  grow = true, // default true -> keep grow 1 coming from flex_grid
  shrink = 1, // default 1 for shrink
  basis = 'auto', // default 'auto' basis
  component: Component = 'div',
  ...rest
}) => {
  validateGrowValue(grow);
  validateShrinkValue(shrink);
  validateBasisValue(basis);

  const classes = classNames(
    'ouiFlexItem',
    {
      'ouiFlexItem--flexGrowZero': !grow,
      'ouiFlexItem--flexShrinkZero': !shrink,
      [`ouiFlexItem--flexGrow${grow}`]:
        typeof grow === 'number' ? GROW_SIZES.indexOf(grow) >= 0 : undefined,
      [`ouiFlexItem--flexShrink${shrink}`]:
        typeof shrink === 'number'
          ? SHRINK_SIZES.indexOf(shrink) >= 0
          : undefined,
      [`ouiFlexItem--flexBasis${basis}`]:
        typeof shrink === 'string'
          ? BASIS_VALUES.indexOf(shrink) >= 0
          : undefined,
    },
    className
  );

  return (
    // @ts-ignore difficult to verify `rest` applies to `Component`
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

function validateGrowValue(value: OuiFlexItemProps['grow']) {
  const validValues = [null, undefined, true, false, ...GROW_SIZES];

  if (validValues.indexOf(value) === -1) {
    throw new Error(
      `Prop \`grow\` passed to \`OuiFlexItem\` must be a boolean or an integer between 1 and 10, received \`${value}\``
    );
  }
}

function validateShrinkValue(value: OuiFlexItemProps['shrink']) {
  // New function
  const validValues = [null, undefined, true, false, ...SHRINK_SIZES];

  if (validValues.indexOf(value) === -1) {
    throw new Error(
      `Prop \`shrink\` passed to \`OuiFlexItem\` must be a boolean or an integer between 1 and 10, received \`${value}\``
    );
  }
}

function validateBasisValue(value: OuiFlexItemProps['basis']) {
  // Define the valid values for 'flex-basis'. These can be 'auto' or specific percentages.
  const validValues = [null, undefined, true, false, ...BASIS_VALUES];

  // Check if the passed value is one of the valid values.
  if (!validValues.includes(value)) {
    throw new Error(
      `Prop \`basis\` passed to \`OuiFlexItem\` must be one of ['auto', '0%', '25%', '50%', '75%', '100%'], received \`${value}\``
    );
  }
}
