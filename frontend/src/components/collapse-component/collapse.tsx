import { ReactNode } from 'react';

import { CollapseElement } from './collapse-element/collapse-element';

interface SingleComponentInterface {
  lable: string;
  component: ReactNode;
}

interface CollapseProps {
  components: SingleComponentInterface[];
}

const Collaps: React.FC<CollapseProps> = ({ components }) => {
  return (
    <div>
      {components.map((el, id) => {
        return (
          <CollapseElement key={id} label={el.lable}>
            {el.component}
          </CollapseElement>
        );
      })}
    </div>
  );
};
export { Collaps };
