import { ReactNode } from 'react';

import { CollapseElement } from './collapse-element/collapse-element';

interface SingleComponentInterface {
  label: string;
  component: ReactNode;
}

interface CollapseProps {
  components: SingleComponentInterface[];
}

const Collapse: React.FC<CollapseProps> = ({ components }) => {
  return (
    <div>
      {components.map((el, id) => {
        return (
          <CollapseElement key={id} label={el.label}>
            {el.component}
          </CollapseElement>
        );
      })}
    </div>
  );
};
export { Collapse };
