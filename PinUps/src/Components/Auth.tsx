import { auth, Provider } from "../Config"
import { signInWithPopup } from 'firebase/auth'
import Cookies from "universal-cookie"
import '../assets/styles/SignIn.css'

const cookies = new Cookies()
export const Auth = (props: any) => {
    const { setIsAuth } = props
    const SignIn = async () => {
        try {
            const result = await signInWithPopup(auth, Provider)
            cookies.set('auth_token', result.user.refreshToken)
            setIsAuth(true)
        } catch (err) {
            console.log(err)
        }
    }

    return( 
        <div className="AuthCover">
            <div className="Auth">
                <p>Sign In with Google</p>
                <button type="button" className="btn" 
                onClick={SignIn}>Sign In</button>
            </div>
        </div>
    )
}