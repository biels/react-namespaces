import {default as React, useContext} from "react";
import {NsContext} from "./namespaces";



export const useNamespace = () =>{
    const context = useContext(NsContext)
    return context
}
