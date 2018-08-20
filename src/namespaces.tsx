import * as React from "react";

export type NamespaceContext = string[];

const {Provider: NamespaceProvider, Consumer: NamespaceConsumer} = React.createContext<NamespaceContext>([]);

export const Namespace = (props: {name?: string, children: any}) => {
    if((props as any).name == null){
        const cprops = (props as {children: any})
        return <NamespaceConsumer>
            {(namespace) => {
                // console.log('namespace', namespace);
                if(typeof cprops.children == "function") return cprops.children(namespace)
                return cprops.children
            }}
        </NamespaceConsumer>
    }
    return <NamespaceConsumer>
        {currentNamespace => {
            const rprops = (props as {name: string, children: any})
            return <NamespaceProvider value={currentNamespace.concat(rprops.name)}>
                {props.children}
            </NamespaceProvider>
        }}
    </NamespaceConsumer>
}
export const PrintNamespace = (props: {}) => {
    return <Namespace>
        {(namespace) => {
            return <ol>
                {namespace.join('.')}
            </ol>
        }}
    </Namespace>
}
