/* eslint-disable react/prop-types */
import "./Main.scss";

const Main = ({children}) => {
  return (
    <main className="main">
      {children}
    </main>
  )
}

export default Main;