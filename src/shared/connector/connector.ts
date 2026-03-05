import { Block } from '../block';
import Store from '../store/Store';
import { StoreState } from '../store/Store.types';
import { isNeedUpdate, StoreEvents } from '../store/Store.utils';

export function connect(mapStateToProps: (state: StoreState) => Record<string, unknown>) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(...args: ConstructorParameters<typeof Component>) {
        let currentState: StoreState = mapStateToProps(Store.getState());
        super(...args);
        Store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(Store.getState());
          if (isNeedUpdate(currentState, newState)) {
            this.setProps({ ...this.props, ...mapStateToProps(Store.getState()) });
          }
          currentState = newState;
        });
      }
    };
  };
}
