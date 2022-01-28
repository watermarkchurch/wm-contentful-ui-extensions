import { FunctionComponent, h } from 'preact'
import { Link } from 'preact-router/match'

const Home: FunctionComponent = () => {
  return <div className="container">
    <div className="row">
      <div className="col">
        <Link className="btn btn-primary" disabled={true} href="/mp">
          Multi-Player
        </Link>
        <Link className="btn btn-outline-primary" href="/sp">
          Single Player
        </Link>
      </div>

    </div>
  </div>
}
export default Home
