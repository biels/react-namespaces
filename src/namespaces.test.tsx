import {render, shallow} from "enzyme";
import * as renderer from 'react-test-renderer';
import * as React from "react";
import {Namespace} from "./namespaces";

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
});
