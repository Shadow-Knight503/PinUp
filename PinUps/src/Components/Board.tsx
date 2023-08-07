import { useState, useEffect, useRef } from "react"
import { addDoc, collection, serverTimestamp,
    query, onSnapshot, orderBy, limit } from 'firebase/firestore'
import { auth, Db } from "../Config"
import '../assets/styles/Board.css'

export const Board = () => {
    const [NewPin, setNewPin] = useState("")
    const [Pins, setPins] = useState([{
        UserName: "", Meassage: "", ID: ""}])
    const Vew: any = useRef(null)
    
    const PinsRef = collection(Db, "PinBoard")

    function delay(inp: number) {
        return new Promise(res => setTimeout(res, inp))
    }
    
    useEffect(() => {
        const qryPins = query(PinsRef, orderBy('PostTime'), limit(25))
        onSnapshot(qryPins, async (snapshot) => {
            let Pins: any = []

            snapshot.forEach((doc) => {
                Pins.push({...doc.data(), ID: doc.id})
            })

            setPins(Pins)
            await delay(1000)
            Vew.current.scrollIntoView({behavior: 'smooth'})    
        })
    }, [])

    const Sbt = async (e: any) => {
        e.preventDefault()
        if (NewPin === "") return

        await addDoc(PinsRef, {
            Meassage: NewPin,
            PostTime: serverTimestamp(),
            UserName: auth.currentUser?.displayName,
        })

        setNewPin("")
        Vew.current.scrollIntoView({behavior: 'smooth'})
    }

    return ( 
        <div className="Board">
            <div className="BoardCover">
                <div className="BoardBody">
                    {Pins.map((Pin) => (
                        <div key={Pin.ID}>
                            <span>{Pin.UserName}</span>
                            <p>{Pin.Meassage}</p>
                        </div>
                    ))}
                    <span ref={Vew}/>
                </div>
                <form className="PinFrm" onSubmit={Sbt}>
                    <div className="input-group mb-3">
                        <input type="text" className="PinInp form-control" 
                            placeholder="Enter Here" aria-label="Pin:" 
                            aria-describedby="button-addon2"
                            onChange={(e) => {
                                setNewPin(e.target.value)
                            }} value={NewPin}/>
                        <button className="SbtBtn btn btn-outline-secondary" 
                            type="submit" id="button-addon2">
                                <i className="bi-send-fill" />
                                <div />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}