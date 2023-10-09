import { Spin } from "antd";
import { createContext, useState } from "react"
import "./style.scss"
import { WrappeSpin } from "./styled";

const DEFAULT_STATE = {
    isLoading: false,
}

export const LoadingContext = createContext(DEFAULT_STATE);

export const LoadingProvider = (props) => {
    const [state,setState] = useState(DEFAULT_STATE);

    document.querySelector("body").style.overflow=state.isLoading ?"hidden" :"unset";

    return <LoadingContext.Provider value={[state,setState]}>
        {state.isLoading && (<WrappeSpin background="red">
            <Spin size="large"/>
        </WrappeSpin>)}
        {props.children}
        </LoadingContext.Provider>
}