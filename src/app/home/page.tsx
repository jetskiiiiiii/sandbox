import { account } from './actions'

export default function HomePage() {
    return(
        <form>
            <label htmlFor="homepage">This is the home page.</label>
            <button formAction={account}>Account Settings</button>
        </form>
    )
}