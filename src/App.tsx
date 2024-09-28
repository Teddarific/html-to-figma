import './App.css'
// import { ExampleArtistsProfile } from './ExampleComponents/ExampleArtistsProfile'
// import { ExampleCalculator } from './ExampleComponents/ExampleCalculator'
// import { ExampleLoginScreen } from './ExampleComponents/ExampleLoginScreen'
// import { ExampleMoneyDashboard } from './ExampleComponents/ExampleMoneyDashboard'
// import { ExampleAuthenticationPage } from './ExampleComponents/ExampleAuthenticationPage'
// import { ExampleRadioButtons } from './ExampleComponents/ExampleRadioButtons'
import { ExampleTodoList } from './ExampleComponents/ExampleTodoList'
// import { ExampleTerminal } from './ExampleComponents/ExampleTerminal'
// import { ExampleBannerText } from './ExampleComponents/ExampleBannerText'
// import { TemporaryExample } from './ExampleComponents/TemporaryExample'
// import { ExampleGradient } from './ExampleComponents/ExampleGradient'
// import { ExampleGradientTwo } from './ExampleComponents/ExampleGradientTwo'
// import { ExampleSlackImport } from './ExampleComponents/ExampleSlackImport'
import { ExampleTextArea } from './ExampleComponents/ExampleTextArea'
import { htmlToFigma } from './htmlToFigma/htmlToFigma'
import { figmaToClipboard } from './figmaToClipboard/figmaToClipboard'

function App() {
  const handleOnClick = async () => {
    // const output = convertHtmlToFigma();

    const figmaRoot = document.getElementById('figma-root')

    if (!figmaRoot) {
      return
    }

    const output = htmlToFigma(figmaRoot)

    console.log(output)

    await figmaToClipboard(output)

    // navigator.clipboard.writeText(JSON.stringify(output) ?? '')

    console.log('copied')
  }

  return (
    <div>
      <div style={{ display: 'flex', border: '1px solid gray' }}>
        <div id="figma-root">
          {/* <ExampleMoneyDashboard /> */}
          {/* <ExampleLoginScreen /> */}
          {/* <ExampleArtistsProfile /> */}
          {/* <ExampleCalculator /> */}
          {/* <ExampleAuthenticationPage /> */}
          {/* <ExampleRadioButtons /> */}
          {/* <ExampleTodoList /> */}
          {/* <ExampleTerminal /> */}
          {/* <ExampleBannerText /> */}
          {/* <ExampleGradient /> */}
          {/* <ExampleBullets /> */}
          {/* <ExampleGradientTwo /> */}
          {/* <ExampleSlackImport /> */}
          {/* <TemporaryExample /> */}
          <ExampleTextArea />
        </div>
      </div>
      <button onClick={handleOnClick}>Make it happen</button>
    </div>
  )
}

export default App
