import React, { useState, useCallback, useRef } from 'react';
import {
  isArrayOfObjectsProp,
  isFunctionProp,
  isOptionsProp,
  isBooleanProp,
  isNumberProp,
  isStringProp,
  PropertyTypes,
  PropTypeNames,
  PropTypeNamesList,
  StringProp,
  JsonSchemaObject,
  PropTypeDataBase,
} from '@knapsack/core/types';
import { Icon, KsButton } from '@knapsack/design-system';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { InlineEditText } from '../../../../components/inline-edit';
import { SpecItemTypes } from './shared';
import './spec-item.scss';

interface DragItem {
  index: number;
  id: string;
  type: keyof typeof SpecItemTypes;
}

type SpecItemProps = {
  index: number;
  id: string;
  title: string;
  type: keyof typeof SpecItemTypes;
  children: React.ReactNode;
  moveItem: (from: number, to: number) => void;
  deleteItem: (index: number) => void;
  handleNewTitle: (newTitle: string) => void;
  isInitiallyOpen?: boolean;
};

export const KsSpecItem: React.FC<SpecItemProps> = ({
  id,
  title,
  children,
  type,
  moveItem,
  deleteItem,
  index,
  handleNewTitle,
  isInitiallyOpen = false,
}: SpecItemProps) => {
  const [isOpen, setOpen] = useState(isInitiallyOpen);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: SpecItemTypes[type],
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: SpecItemTypes[type], id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`ks-spec-item ${isDragging ? 'ks-spec-item--dragging' : ''}`}
      style={{ marginBottom: 'var(--size-s)', opacity }}
    >
      <header
        className="ks-spec-item__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 'var(--size-s)',
          borderBottom: isOpen ? 'var(--util-border)' : '',
          backgroundColor: 'var(--c-shade)',
        }}
      >
        <div className="ks-spec-item__handle">
          <Icon symbol="drag-handle" />
        </div>
        <h4 className="ks-spec-item__title" style={{ marginTop: '0' }}>
          <InlineEditText
            showControls
            text={title}
            handleSave={handleNewTitle}
          />
        </h4>
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <KsButton
            icon="delete"
            kind="icon"
            flush
            size="s"
            handleTrigger={() => deleteItem(index)}
          />
          <div
            style={{
              transform: isOpen ? '' : 'rotate(90deg)',
              transition: 'transform .15s ease-in',
              marginLeft: 'var(--size-s)',
            }}
          >
            <KsButton
              icon="collapser"
              size="m"
              flush
              kind="icon"
              handleTrigger={() => setOpen(isO => !isO)}
            />
          </div>
        </div>
      </header>
      <div
        className="ks-spec-item__body ks-u-shade-bg"
        style={{
          display: isOpen ? 'block' : 'none',
          padding: 'var(--size-s)',
          backgroundColor: 'var(--c-shade)',
        }}
      >
        {children}
      </div>
    </div>
  );
};
