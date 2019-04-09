import {render, shallow} from "enzyme";
import * as renderer from 'react-test-renderer';
import * as React from "react";
import {Namespace, withNamespace} from "./namespaces";
import {useNamespace} from "./useNamespace";

describe('namespaces', function () {
    it('one level namespace', function () {
        renderer.create(<Namespace name={'level1'}>
            <div>
                <Namespace>
                    {(level) => {
                        expect(level).toEqual(['level1'])
                        return null
                    }}
                </Namespace>
            </div>
        </Namespace>)
    });
    it('two level namespace', function () {
        renderer.create(<Namespace name={'level1'}>
            <div>
                <Namespace name={'level2'}>
                    <div>
                        <Namespace>
                            {(level) => {
                                expect(level).toEqual(['level1', 'level2'])
                                return null
                            }}
                        </Namespace>
                    </div>
                </Namespace>
            </div>
        </Namespace>)
    });
    it('absolute path', function () {
        renderer.create(<Namespace name={'level1'}>
            <div>
                <Namespace name={'/level2'}>
                    <div>
                        <Namespace>
                            {(level) => {
                                expect(level).toEqual(['level2'])
                                return null
                            }}
                        </Namespace>
                    </div>
                </Namespace>
            </div>
        </Namespace>)
    });
    it('top level absolute path', function () {
        renderer.create(<Namespace name={'/level1'}>
            <div>
                <Namespace name={'level2'}>
                    <div>
                        <Namespace>
                            {(level) => {
                                expect(level).toEqual(['level1', 'level2'])
                                return null
                            }}
                        </Namespace>
                    </div>
                </Namespace>
            </div>
        </Namespace>)
    });
    it('top level absolute path alone', function () {
        renderer.create(<Namespace name={'/level1'}>
            <Namespace>
                {(level) => {
                    expect(level).toEqual(['level1'])
                    return null
                }}
            </Namespace>
        </Namespace>)
    });
    it('relative path', function () {
        renderer.create(<Namespace name={'level1'}>
            <Namespace name={'level2'}>
                <Namespace name={'../level3'}>
                    <Namespace>
                        {(level) => {
                            expect(level).toEqual(['level1', 'level3'])
                            return null
                        }}
                    </Namespace>
                </Namespace>
                <Namespace name={'../../level3'}>
                    <Namespace>
                        {(level) => {
                            expect(level).toEqual(['level3'])
                            return null
                        }}
                    </Namespace>
                </Namespace>
            </Namespace>
        </Namespace>)
    });
    it('one level namespace using hooks', function () {
        const ComponentUsingNsHook = () => {
            const level = useNamespace()
            expect(level).toEqual(['level1'])
            return null
        }
        renderer.create(
            <Namespace name={'level1'}>
                <div>
                    <ComponentUsingNsHook/>
                </div>
            </Namespace>
        )
    });
    it('one level namespace using HOC', function () {
        const ComponentToWrap = (props) => {
            const level = props.namespace
            expect(level).toEqual(['level1'])
            expect(props.name).toEqual('name1')
            return null
        }
        const WrappedComponent = withNamespace(ComponentToWrap)
        renderer.create(
            <Namespace name={'level1'}>
                <div>
                    <WrappedComponent name={'name1'}/>
                </div>
            </Namespace>
        )
    });
});
