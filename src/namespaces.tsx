import * as React from "react";

export type NamespaceContext = string[];

export const NsContext = React.createContext<NamespaceContext>([]);
const {Provider: NamespaceProvider, Consumer: NamespaceConsumer} = NsContext

export const Namespace = (props: { name?: string, children: any }) => {
    // Read
    if ((props as any).name == null) {
        const cprops = (props as { children: any })
        return <NamespaceConsumer>
            {(namespace) => {
                // console.log('namespace', namespace);
                if (typeof cprops.children == "function") return cprops.children(namespace)
                return cprops.children
            }}
        </NamespaceConsumer>
    }
    // Write
    return <NamespaceConsumer>
        {(currentNamespace: string[]) => {
            const rprops = (props as { name: string, children: any })
            let newName = rprops.name;
            const parts = newName.split('/')
            parts.forEach((part, i) => {
                if (part === '' && i === 0) {
                    currentNamespace = [];
                    return
                }
                if (part === '..') {
                    currentNamespace.pop();
                    return
                }
                currentNamespace = currentNamespace.concat(part);
            })
            return <NamespaceProvider value={currentNamespace}>
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
