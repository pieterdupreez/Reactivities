//interface Props {
//    duck: Duck;

import { Duck } from "./demo";

//}
function DuckItem(duck: Duck) {
  return (
      <div key={duck.name}>
          <span>{duck.name}</span>
          <button onClick={() => duck.makeSound(duck.name + ' quacks bla')}>Make sound</button>

      </div >
  );
}

export default DuckItem;