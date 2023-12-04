import MultiSelectDropdown from "./components/MultiSelectDropdown.tsx";
import basketIcon from '../src/assets/images/basket.svg'
import accelerateIcon from '../src/assets/images/accelerate.svg'
import flaskIcon from '../src/assets/images/flask.svg'

function App() {
    const initialOptions = [
        { label: 'Sport', value: 'sport',icon:basketIcon},
        { label: 'Art', value: 'art',icon:accelerateIcon },
        { label: 'Game 1', value: 'game 1',icon: flaskIcon },
        { label: 'Game 2', value: 'game 2',icon: flaskIcon },
        { label: 'Game 3', value: 'game 3',icon: flaskIcon },
        { label: 'Game 4', value: 'game 4',icon: flaskIcon },
    ];;
  return (
    <>
      <div>
          <MultiSelectDropdown initialOptions={initialOptions} placeholder="Type ..." />

      </div>
    </>
  )
}

export default App
